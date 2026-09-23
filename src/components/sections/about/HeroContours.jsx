import { useLayoutEffect, useRef } from "react";

const DATA_URL = `${import.meta.env.BASE_URL}assets/data/hero-contours.bin`;
const STROKE = "#e2e2e2";
const LINE_WIDTH = 2.2;

// Binary layout (little-endian): "CTR1", u16 width, u16 height, u32 count,
// then count × u16 point counts, then all points as u16 x,y pairs.
function parse(buffer) {
  const view = new DataView(buffer);
  const width = view.getUint16(4, true);
  const height = view.getUint16(6, true);
  const count = view.getUint32(8, true);
  const counts = new Uint16Array(buffer, 12, count);
  const coords = new Uint16Array(buffer, 12 + count * 2);
  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.hypot(cx, cy);
  const lines = [];
  let offset = 0;
  for (let i = 0; i < count; i++) {
    const n = counts[i];
    const points = coords.subarray(offset, offset + n * 2);
    const cumulative = new Float32Array(n);
    let sx = 0;
    let sy = 0;
    for (let j = 0; j < n; j++) {
      sx += points[j * 2];
      sy += points[j * 2 + 1];
      if (j > 0) {
        const dx = points[j * 2] - points[j * 2 - 2];
        const dy = points[j * 2 + 1] - points[j * 2 - 1];
        cumulative[j] = cumulative[j - 1] + Math.hypot(dx, dy);
      }
    }
    const dist = Math.hypot(sx / n - cx, sy / n - cy) / maxDist;
    const jitter = ((i * 2654435761) >>> 0) / 4294967296;
    const start = 0.72 * (0.6 * dist + 0.4 * jitter);
    lines.push({ points, cumulative, length: cumulative[n - 1], start, end: start + 0.28, drawn: 0, seg: 0 });
    offset += n * 2;
  }
  return { width, height, lines };
}

export default function HeroContours({ src, alt }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    const hero = canvas.closest(".about-hero");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    img.style.opacity = 0;
    const ctx = canvas.getContext("2d");
    const controller = new AbortController();
    let data = null;
    let raf = 0;
    let progress = -1;
    let transform = null;
    let drawDistance = 1;

    const fit = () => {
      if (!data) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      // Measure the actual sticky runway, not innerHeight: mobile browser
      // chrome changes innerHeight during a fling without changing our layout.
      drawDistance = Math.max(1, hero.offsetHeight - canvas.parentElement.offsetHeight);
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      if (transform && canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      const scale = Math.max(rect.width / data.width, rect.height / data.height);
      const ox = (rect.width - data.width * scale) / 2;
      const oy = (rect.height - data.height * scale) / 2;
      transform = { a: scale * dpr, ox: ox * dpr, oy: oy * dpr };
      progress = -1;
    };

    const reset = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const line of data.lines) { line.drawn = 0; line.seg = 0; }
    };

    const draw = () => {
      raf = 0;
      if (!data || !transform) return;
      const travelled = hero ? -hero.getBoundingClientRect().top : scrollY;
      const next = Math.max(0, Math.min(1, travelled / drawDistance));
      if (next === progress) return;
      if (next < progress || progress < 0) reset();
      progress = next;
      img.style.opacity = Math.max(0, Math.min(1, (next - 0.82) / 0.18));
      ctx.setTransform(transform.a, 0, 0, transform.a, transform.ox, transform.oy);
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = STROKE;
      ctx.beginPath();
      for (const line of data.lines) {
        const t = Math.max(0, Math.min(1, (next - line.start) / (line.end - line.start)));
        const target = t * line.length;
        if (target <= line.drawn) continue;
        const { points, cumulative } = line;
        let seg = line.seg;
        const startPoint = pointAt(points, cumulative, seg, line.drawn);
        ctx.moveTo(startPoint[0], startPoint[1]);
        while (seg + 1 < cumulative.length && cumulative[seg + 1] <= target) {
          seg++;
          ctx.lineTo(points[seg * 2], points[seg * 2 + 1]);
        }
        if (target < line.length) {
          const endPoint = pointAt(points, cumulative, seg, target);
          ctx.lineTo(endPoint[0], endPoint[1]);
        }
        line.drawn = target;
        line.seg = seg;
      }
      ctx.stroke();
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const resize = () => { fit(); schedule(); };

    fetch(DATA_URL, { signal: controller.signal })
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        data = parse(buffer);
        fit();
        draw();
      })
      .catch(() => { img.style.opacity = 1; });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      controller.abort();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas className="about-hero-contours" ref={canvasRef} aria-hidden="true" />
      <img className="about-hero-image" ref={imgRef} src={src} alt={alt} />
    </>
  );
}

function pointAt(points, cumulative, seg, distance) {
  const segLength = cumulative[seg + 1] - cumulative[seg];
  const t = segLength > 0 ? (distance - cumulative[seg]) / segLength : 0;
  const x0 = points[seg * 2];
  const y0 = points[seg * 2 + 1];
  return [x0 + (points[seg * 2 + 2] - x0) * t, y0 + (points[seg * 2 + 3] - y0) * t];
}
