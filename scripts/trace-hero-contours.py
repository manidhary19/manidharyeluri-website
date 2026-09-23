"""Trace the hero contour JPG into polylines for the scroll-drawn canvas.

Usage: python3 scripts/trace-hero-contours.py
Writes public/assets/data/hero-contours.bin (see HeroContours.jsx for the format).
"""
import struct
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/assets/images/GaJUFPEVKhnToN8GVkwDOL8Q0o.jpg"
OUT = ROOT / "public/assets/data/hero-contours.bin"
THRESHOLD = 90
MIN_POINTS = 4
SIMPLIFY_TOLERANCE = 0.9


def zhang_suen(img):
    img = img.astype(np.uint8)
    while True:
        changed = False
        for step in (0, 1):
            p = np.pad(img, 1)
            P2 = p[:-2, 1:-1]; P3 = p[:-2, 2:]; P4 = p[1:-1, 2:]; P5 = p[2:, 2:]
            P6 = p[2:, 1:-1]; P7 = p[2:, :-2]; P8 = p[1:-1, :-2]; P9 = p[:-2, :-2]
            ring = [P2, P3, P4, P5, P6, P7, P8, P9]
            B = sum(int(0) + r.astype(np.int16) for r in ring)
            A = sum(((ring[i] == 0) & (ring[(i + 1) % 8] == 1)).astype(np.int16) for i in range(8))
            if step == 0:
                m1 = (P2 * P4 * P6) == 0
                m2 = (P4 * P6 * P8) == 0
            else:
                m1 = (P2 * P4 * P8) == 0
                m2 = (P2 * P6 * P8) == 0
            remove = (img == 1) & (B >= 2) & (B <= 6) & (A == 1) & m1 & m2
            if remove.any():
                img[remove] = 0
                changed = True
        if not changed:
            return img.astype(bool)


NEIGHBORS = [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]


def trace(skel):
    h, w = skel.shape
    on = set(zip(*np.nonzero(skel)))
    on = {(int(y), int(x)) for y, x in on}

    def nbrs(p):
        y, x = p
        return [(y + dy, x + dx) for dy, dx in NEIGHBORS if (y + dy, x + dx) in on]

    def crossings(p):
        y, x = p
        ring = [(y - 1, x), (y - 1, x + 1), (y, x + 1), (y + 1, x + 1),
                (y + 1, x), (y + 1, x - 1), (y, x - 1), (y - 1, x - 1)]
        bits = [q in on for q in ring]
        return sum(1 for i in range(8) if not bits[i] and bits[(i + 1) % 8])

    # Crossing number: 1 = endpoint, 2 = mid-line, 3+ = junction. Plain neighbour
    # counts misclassify staircase pixels on diagonals as junctions.
    degree = {p: crossings(p) for p in on}
    visited = set()
    lines = []

    def walk(start, nxt):
        line = [start, nxt]
        visited.add(nxt)
        prev, cur = start, nxt
        while degree[cur] == 2:
            cand = [n for n in nbrs(cur) if n != prev and n not in visited]
            if not cand:
                break
            prev, cur = cur, cand[0]
            visited.add(cur)
            line.append(cur)
        if degree[cur] != 2:
            visited.add(cur)
        return line

    seeds = sorted(p for p in on if degree[p] != 2)
    edges = set()
    for p in seeds:
        visited.add(p)
        for n in nbrs(p):
            if degree[n] != 2:
                edge = (min(p, n), max(p, n))
                if edge not in edges:
                    edges.add(edge)
                    lines.append([p, n])
            elif n not in visited:
                lines.append(walk(p, n))
    for p in sorted(on):
        if p in visited:
            continue
        visited.add(p)
        n = [q for q in nbrs(p) if q not in visited]
        if not n:
            continue
        line = walk(p, n[0])
        if len(line) > 2 and p in nbrs(line[-1]):
            line.append(p)
        lines.append(line)
    return [[(x, y) for y, x in line] for line in lines]


def simplify(points, tol):
    pts = np.asarray(points, dtype=np.float64)
    if len(pts) < 3:
        return pts
    keep = np.zeros(len(pts), dtype=bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b - a < 2:
            continue
        seg = pts[b] - pts[a]
        seg_len = np.hypot(*seg)
        if seg_len == 0:
            d = np.hypot(*(pts[a + 1:b] - pts[a]).T)
        else:
            rel = pts[a + 1:b] - pts[a]
            d = np.abs(seg[0] * rel[:, 1] - seg[1] * rel[:, 0]) / seg_len
        i = int(np.argmax(d))
        if d[i] > tol:
            keep[a + 1 + i] = True
            stack.append((a, a + 1 + i))
            stack.append((a + 1 + i, b))
    return pts[keep]


def main():
    img = np.asarray(Image.open(SRC).convert("L"))
    h, w = img.shape
    mask = img > THRESHOLD
    print(f"image {w}x{h}, {mask.sum()} line pixels")
    skel = zhang_suen(mask)
    print(f"skeleton {skel.sum()} pixels")
    lines = [l for l in trace(skel) if len(l) >= MIN_POINTS]
    simplified = [simplify(l, SIMPLIFY_TOLERANCE) for l in lines]
    total = sum(len(l) for l in simplified)
    print(f"{len(simplified)} polylines, {total} points after simplification")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("wb") as f:
        f.write(struct.pack("<4sHHI", b"CTR1", w, h, len(simplified)))
        f.write(np.array([len(l) for l in simplified], dtype="<u2").tobytes())
        coords = np.concatenate(simplified).round().astype("<u2")
        f.write(coords.tobytes())
    print(f"wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")

    if len(sys.argv) > 1:
        from PIL import ImageDraw
        preview = Image.new("L", (w, h), 0)
        draw = ImageDraw.Draw(preview)
        for l in simplified:
            draw.line([tuple(p) for p in l], fill=255, width=1)
        preview.save(sys.argv[1])
        lengths = sorted((len(l) for l in lines), reverse=True)
        print("longest raw lines (px):", lengths[:10], "median:", lengths[len(lengths) // 2])


if __name__ == "__main__":
    main()

