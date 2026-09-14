#!/usr/bin/env python3
"""SPA static server: unknown paths fall back to index.html."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent / "dist"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        req = self.path.split("?", 1)[0]
        target = (ROOT / req.lstrip("/")).resolve()
        try:
            target.relative_to(ROOT)
        except ValueError:
            return super().do_GET()
        if target.is_file():
            return super().do_GET()
        if target.is_dir() and (target / "index.html").exists():
            return super().do_GET()
        self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
