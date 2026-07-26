# Phase 0 — Baseline & Audit

**Date:** 2026-07-26
**Source:** Reconstructed from live site `https://kishoreguptaofficial.in` (source files were not present locally — only logo experiments existed in `Desktop/Portfolio_Design`).

---

## 1. Files captured (baseline, committed)

| File | Size | Notes |
|------|------|-------|
| `index.html` | 29 KB | Single-page site, all JS inline in one `<script>` block |
| `style.css` | 41 KB | 3 media queries only |
| `images/logo.svg` | 91 KB | Logo (large for an SVG) |
| `images/profile.jpg` | 158 KB | Profile photo (not optimized, no WebP) |
| `Kishore_Gupta_Resume.pdf` | 316 KB | Resume at expected root path |

External dependencies (render-blocking, from CDNs): Font Awesome 6.5.0, EmailJS v3.

## 2. Current structure

Navbar (logo + search + links + hamburger) → Hero → About → Projects (9 cards, 3 hidden behind "View More") → Contact (reveal email/phone + form) → Footer. Single page, no routing.

## 3. Design language (current)

- **Palette:** navy `#0a192f` background, teal `#64ffda` accent, slate text `#ccd6f6` / `#8892b0`. This is the well-known "dark navy + teal" template look — clean, but not distinctive.
- **Font:** system stack falling back to Inter. No loaded webfont.
- **Mode:** dark only. No light mode.

## 4. Issues found

### Bugs
- **`getElementById("year")` crashes** (index.html:853): script sets `.textContent` on a `#year` element that doesn't exist → throws, and the copyright year is hardcoded `© 2026` instead.
- **Phone number mismatch:** JS reveal shows `+91 9979980993` but the WhatsApp link uses `917022466118`. One is wrong.
- **Duplicate footer observer:** the IntersectionObserver for `.footer` is registered twice.

### Broken / dead links
- `#articles` — nav + footer link to it, but **no Articles section exists**.
- Footer `#` placeholders: Careers, Blogs, Help Center, Privacy Policy, Terms.
- GitHub icons (contact + footer) point to `#`; footer Twitter points to `#`.

### SEO / metadata (largely absent)
- No meta description, no Open Graph, no Twitter cards, no canonical.
- No favicon, no `sitemap.xml`, no `robots.txt`, no JSON-LD Person schema.
- Generic `<title>` "Kishore Gupta Portfolio".

### Accessibility
- Search input has placeholder but no `<label>`.
- Icon-only buttons (copy, social, hamburger) lack `aria-label`.
- No visible focus styles verified; no skip link.
- "View Impact" toggles don't expose `aria-expanded`.

### Performance
- Two render-blocking CDN stylesheets/scripts.
- Profile JPG unoptimized; no `loading="lazy"`, no WebP, no width/height.
- 41 KB unminified CSS.

### Content / privacy
- Email `kishoreguptaofficial@gmail.com` is hardcoded in the JS source (visible to scrapers reading source, though not in rendered HTML). Brief wants email kept out of plain source.

## 5. Content to preserve (verified against brief §2)

All 9 projects, roles, years, impact bullets, and tech tags matched the brief exactly and are captured. Hero copy, About (5 paragraphs), LinkedIn, WhatsApp, and resume path all preserved.

## 6. Gaps vs. redesign goals (to build in later phases)

Missing entirely: light/dark toggle, Experience Timeline, Skills section, Articles structure, project filtering (domain/role), most SEO/meta, accessibility affordances.
