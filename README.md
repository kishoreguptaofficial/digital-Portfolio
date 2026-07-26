# Kishore Gupta — Portfolio

Personal portfolio for Kishore Gupta (QA Lead & Automation Engineer). Vanilla HTML/CSS/JS, zero build step. Live at **https://kishoreguptaofficial.in**.

## Structure

```
index.html                     Single-page site
404.html                       Custom not-found page
styleguide.html                Design-system reference (noindex)
favicon.svg
CNAME                          Custom domain for GitHub Pages
.nojekyll                      Tell GitHub Pages to skip Jekyll
robots.txt  sitemap.xml
css/
  tokens.css                   Design tokens (colors, type, spacing) — dark + light
  styles.css                   Components & layout
js/
  main.js                      Theme toggle, menu, filters, reveal, contact form
images/
  logo.svg  profile.webp  profile-opt.jpg  og-cover.png
articles/
  scaling-test-framework.html
  accessibility-beyond-checklist.html
Kishore_Gupta_Resume.pdf       Kept at root so /Kishore_Gupta_Resume.pdf still works
```

## Run locally

Any static server works. For example:

```bash
npx serve .
```

Then open the printed URL (e.g. http://localhost:3000).

## Deploy to GitHub Pages (custom domain)

> The site is currently served from other hosting. These steps move it to GitHub Pages **without downtime** if you do the DNS change last.

1. **Create the repo** on GitHub (e.g. `kishoreguptaofficial/portfolio`), public.
2. **Push this folder:**
   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git branch -M main
   git push -u origin main
   ```
3. **Enable Pages:** repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save.
4. **Custom domain:** the `CNAME` file already sets `kishoreguptaofficial.in`. In Settings → Pages, confirm the domain shows and check **Enforce HTTPS** (once the cert is issued).
5. **DNS** (at your domain registrar) — point the apex domain to GitHub Pages:
   - Four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (Optional) `AAAA` records for IPv6, and a `CNAME` for `www` → `<you>.github.io`
   - Do this step **last**; propagation can take up to ~24h.

Because it's a root-level static site, `/Kishore_Gupta_Resume.pdf` and all existing shareable links keep working.

## Notes for future edits

- **Colors/spacing/type:** edit `css/tokens.css` — everything else references the tokens.
- **New article:** copy an existing file in `articles/`, update the content and `<title>`/meta/JSON-LD, add a card in the Articles section of `index.html`, and add a `<url>` to `sitemap.xml`.
- **Contact form:** uses EmailJS (service `service_85maghr`, template `template_poq5olc`). Falls back to a mailto link if EmailJS is unavailable.
- `node_modules/` (only used to regenerate optimized images via `sharp`) is git-ignored and not needed to run or deploy.
