# Reference parity verification

Reference: https://manidharyeluri.framer.website
Local: http://localhost:8080

## Implemented

- Six project detail routes and four technology detail routes, with shared templates and local image assets.
- Five-panel homepage intro, staggered headings, route fades, smooth scrolling, scroll progress, image parallax, and scroll reveals.
- Difference-blended custom pointer with hover/press states; fine-pointer gating and reduced-motion alternatives.
- About-page crossfades, scroll-in scaling, and pointer/keyboard image comparison.
- Responsive typography, cards, gallery ordering, and the reference's distinct mobile About content.
- Local fonts and images; no Framer runtime or Made in Framer badge.

## Checks

- `npm run build`: passes.
- `npm run check`: validates 15 routes and 115 referenced local assets against the running server, plus source checks for Framer branding/remote runtime assets.
- Browser smoke test: all 15 routes at 1280 × 720 and 390 × 844; correct page headings, no horizontal overflow, no broken already-loaded image elements.
- Reference/local screenshot comparisons included desktop homepage and project hero, mobile project and technology detail pages, and tablet About (1024 × 768).
- Navigation and browser Back verified; comparison slider Home/End verified at 0/100.
- No errors/warnings captured in the local browser console during route checks.

## Limitations

The implementation recreates observed behavior, not Framer internals. Intro timing, easing, cursor lag, reveal thresholds, and parallax curves are approximations; frame-by-frame equivalence is not established. Screenshots were inspected in the browser, not saved as a pixel-diff baseline. Every route received rendering checks, but every scroll position and interaction on every route/breakpoint was not exhaustively compared. Reduced motion is implemented in CSS/JS but was not tested with an OS preference toggle. External contact/social links were preserved and were not submitted or exhaustively availability-tested.

Use `npm run dev -- --port 8080` to start the local site if needed. `npm run check` assumes that server is running; set `SITE_URL` to test another preview origin.
