# Neotro Ltd website

Plain HTML/CSS/JS, no build step or framework required.

## Structure
```
index.html          public site
admin.html           local tool for editing projects & testimonials
css/styles.css        shared styles
css/admin.css          admin-page-only styles
js/main.js           renders projects.json and testimonials.json on the public site
js/admin.js            add/edit/export projects.json and testimonials.json
data/projects.json      the project list shown on the site
data/testimonials.json    client quotes shown on the site (starts empty)
```

## Sections
- **Nav** — a services dropdown, plus links to How we work, Work, Reviews, Contact
- **Method** — Neotro's own four-stage process (Survey → Design → Build → Support), grounded in the founder's quantity-surveying background, not copied from anyone else's framework
- **Marquee** — a scrolling line of the company's positioning statement
- **Testimonials** — starts empty; only add real client quotes, with their permission, via `admin.html`

## Running it locally
Opening `index.html` directly by double-clicking won't load `projects.json` (browsers block local file fetches). Serve the folder instead, e.g.:

```
npx serve .
```
or
```
python3 -m http.server
```
then open the printed local address.

## Deploying
Upload the whole folder to any static host — GitHub Pages, Netlify, Vercel, cPanel, or your own server. No build step needed.

## Adding or removing projects
1. Open `admin.html` (locally or on the live site — it's not linked from the main navigation, so keep the URL to yourself).
2. Add a project, or remove one from the current list.
3. Click **Export projects.json** to download the updated file.
4. Replace `data/projects.json` on your host with the downloaded file and redeploy/upload.

This keeps the site fully static — editing projects doesn't touch a database. If you'd rather have the admin page save changes live for every visitor without a manual redeploy step, that needs a small backend (an API + a real database) — worth doing once the project list starts changing often.
