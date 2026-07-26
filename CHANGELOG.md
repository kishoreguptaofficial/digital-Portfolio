# Changelog

## 2026-07-26 — Phase 0: Baseline & audit
- Reconstructed the live site into this repo (source files weren't available locally): `index.html`, `style.css`, `images/logo.svg`, `images/profile.jpg`, `Kishore_Gupta_Resume.pdf`.
- Initialized git; committed untouched baseline ("Phase 0: baseline of live site").
- Wrote `AUDIT.md` documenting current structure, palette, bugs, dead links, and SEO/a11y/perf gaps.
- **Next:** Confirm tech stack / hosting / source-control (Section 3) → begin Phase 1 design system.

## 2026-07-26 — Phase 1: Design system
- Confirmed stack: vanilla HTML/CSS/JS, GitHub Pages, GitHub repo.
- Added `css/tokens.css`: full token set (fluid type scale, 8pt spacing, radii, shadows, motion) with dark (default) + light themes, `prefers-reduced-motion` support.
- Direction: warm-ink dark (#0c0e12, not navy) + emerald "quality/pass" accent (#2ecc8f), violet secondary; Sora/Inter/JetBrains Mono type.
- Built `styleguide.html` showing color, type, spacing, buttons, chips/filters, cards, timeline node, and form fields, with a live theme toggle.
- **Next:** Owner approval of visual direction, then Phase 2 layout/structure.
