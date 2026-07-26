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

## 2026-07-26 — Phase 2 & 3: Full rebuild
- Approved direction: emerald-on-ink, default theme = system preference.
- Rebuilt `index.html` as semantic single page: sticky nav (blur + active-link tracking), mobile drawer, hero, about, **Experience timeline (new)**, projects, **Skills (new)**, **Articles (new, 2 seed drafts)**, contact, cleaned footer (dead links removed).
- Projects: **domain + role filters** (aria-pressed), accessible impact toggles (grid-rows animation, aria-expanded).
- New `css/styles.css` (full component/layout layer on tokens) and `js/main.js` (theme toggle w/ localStorage, mobile menu, scroll reveal via IntersectionObserver, filters, obfuscated email/phone reveal via base64, EmailJS form with graceful failure + mailto fallback, dynamic year).
- Added `favicon.svg`, SEO meta (description, canonical, OG/Twitter), JSON-LD Person schema.
- Fixed all baseline bugs: `#year` crash, duplicate observer; removed dead `#` links.
- Verified locally (localhost:4321): no console errors, filters/toggle/reveal/email-reveal all functional, all assets 200.
- **Next:** Owner review; confirm correct phone number; Phase 4 (article pages), 5 (polish/404), 6 (perf/SEO/a11y audit), 7 (deploy).

## 2026-07-26 — Phases 4–7
- **Phase 4:** two full seed articles (`articles/scaling-test-framework.html`, `articles/accessibility-beyond-checklist.html`) in first-person voice, with mini-header + theme toggle, BlogPosting JSON-LD; homepage cards now link to them.
- **Phase 5:** branded `404.html` ("This test case didn't pass"); scroll reveal, hover states, theme toggle, favicon, reduced-motion all in place.
- **Phase 6 (perf/SEO/a11y):** generated `profile.webp` (158KB→22KB) + optimized JPG fallback via `<picture>`; `og-cover.png` (1200×630) social card; `robots.txt`, `sitemap.xml`. Ran axe-core on all 3 pages in **both light and dark** → **0 WCAG 2.1 AA violations**. Fixed light-mode contrast (accent → #0b7350, white button text, darker text-dim) and the mobile-menu aria-hidden-focus issue.
- **Phase 7 (deploy prep only):** `CNAME` (kishoreguptaofficial.in), `.nojekyll`, and `README.md` with exact GitHub Pages + DNS steps. **Not deployed** — awaiting repo URL and owner go-ahead.
- Phone confirmed: reveal = +91 99799 80993; WhatsApp link left unchanged per content rules.
- **Next:** owner reviews site + article copy; provide GitHub repo to push; approve go-live.
