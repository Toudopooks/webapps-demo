<div align="center">

# 🐱 hub

**A tiny, pretty links page for all my deployed projects.**

Dark mode. Glassmorphic cards. Animated aurora. Zero build step.

[![Live](https://img.shields.io/badge/live-✨_view_site-a78bfa?style=for-the-badge)](https://your-hub.vercel.app)
[![Vercel](https://img.shields.io/badge/deploy-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/new)
[![License](https://img.shields.io/badge/license-MIT-f472b6?style=for-the-badge)](#license)

</div>

---

## ✨ what is this

A single-page, static links hub to show off projects I've shipped. Think Linktree, but for devs — with filter chips, search, status badges, and a terminal-style header that makes me smile.

No frameworks. No bundlers. No npm. Just `index.html`, `styles.css`, `script.js`. Edit one array, push, done.

## 🎨 design

- **aurora backdrop** — three soft orbs drifting behind a subtle grid
- **glassmorphic cards** with gradient hover borders
- **terminal hero** with a blinking caret — because we're developers
- **filter + search** — tag chips and fuzzy text matching
- **status badges** — `live` / `wip` / `paused`
- **fully responsive** down to 320px
- **reduced-motion friendly** — respects `prefers-reduced-motion`
- **~20 KB total**, no external JS, only one Google Font

Color system built around violet (`#a78bfa`) → pink (`#f472b6`) → cyan (`#22d3ee`) on a deep indigo base (`#0b0616`).

## 🚀 getting started

```bash
# 1. clone it
git clone https://github.com/your-username/hub.git
cd hub

# 2. open it — no build required
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

That's it. Seriously. It's plain HTML.

## ✏️ adding a project

Open `script.js` and add an entry to the `projects` array:

```js
{
  name: "My Cool Thing",
  description: "One sentence about what it does.",
  url: "https://my-cool-thing.vercel.app",
  repo: "https://github.com/me/my-cool-thing",
  icon: "🚀",                       // any emoji
  tags: ["nextjs", "ai"],           // free-form
  status: "live",                   // "live" | "wip" | "paused"
}
```

Save, refresh. Tag chips rebuild themselves automatically.

## 🌍 deploying

### Vercel (recommended)

```bash
# push to GitHub, then
npm i -g vercel
vercel
```

No config needed — Vercel detects static sites automatically. Every push to `main` ships to production, every PR gets a preview URL.

### GitHub Pages

1. Push to GitHub.
2. Settings → Pages → Source: `main` / `root`.
3. Done. Lives at `https://<user>.github.io/hub`.

### Anywhere else

It's static HTML — drop it on Netlify, Cloudflare Pages, S3, a USB stick, whatever.

## 🧩 file structure

```
hub/
├── index.html      # markup + hero
├── styles.css      # all the pretty
├── script.js       # project data + filtering
├── README.md       # you are here
└── vercel.json     # optional Vercel config
```

## 🎛️ customizing

| want to change | edit |
| --- | --- |
| project list | `script.js` → `projects` array |
| colors / theme | `styles.css` → `:root` variables |
| hero text | `index.html` → `.title`, `.subtitle` |
| terminal lines | `index.html` → `.terminal__body` |
| socials | `index.html` → `.socials` block |

## 🐾 easter eggs

- Click the cat in the title.

## 📄 license

MIT — do whatever you want. A link back is appreciated but not required.

---

<div align="center">
<sub>built with too much coffee and a suspicious amount of gradient. meow.</sub>
</div>
