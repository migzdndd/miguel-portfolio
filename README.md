# Portfolio v2 — Major Upgrade

This bundle is an additive upgrade designed to preserve the original console/green identity while improving positioning, information architecture, case-study depth, responsiveness, and accessibility.

## Replace these HTML files
- `index.html`
- `about.html`
- `projects.html`
- `skills.html`
- `accomplishments.html`
- `beyond.html`
- `contact.html`

## Add these files
- `css/v2.css`
- `js/v2.js`

The upgraded pages intentionally load the existing baseline first:
- `css/style.css`
- `js/script.js`

Then the v2 layer is loaded after them. Keep your original `style.css` and `script.js` in place.

## What changed
- Home now leads with demonstrated capability and selected work.
- Added a Current System dashboard and evidence-driven homepage.
- Projects are now case studies with Problem, Contribution, Technical Approach, Outcome, and Stack.
- About is positioned around how you build and learn rather than disclaimers about being unfinished.
- Skills clearly separates Hands-on, Coursework, and Learning experience.
- Accomplishments now highlights shipped work first, then supporting knowledge evidence.
- Beyond no longer uses unfinished image placeholders or page-level inline CSS/JS.
- Contact now has a stronger primary-email hierarchy and cleaner channel structure.
- Added Escape-to-close mobile navigation behavior.
- Added project-modal focus trapping.
- Added subtle project spotlight effects with reduced-motion fallback.
- Removed project-page inline spacing CSS.

## Existing baseline files left unchanged
- `css/style.css`
- `js/script.js`
- `robots.txt`
- `sitemap.xml`

## Deployment cleanup still required
The baseline sitemap/canonical setup should use your real production domain once you deploy. Add a real Open Graph preview image at the same time.
