# Career Navigator — Student Skill Roadmap

An AI-guided career discovery, skill-gap analysis, and personalized roadmap
platform for students — built with React + Vite + Tailwind CSS.

All "AI" behavior (career matching, skill-gap scoring, roadmap generation,
resume/job keyword extraction) runs on deterministic client-side logic using
realistic sample data, so the app is fully demoable with no backend or API
key. The logic lives in clearly separated functions in `src/App.jsx`
(`computeDiscoveryMatches`, `computeSkillGap`, `buildRoadmap`,
`extractSkillsFromText`), so swapping in a real LLM/API later is a contained
change.

## Project structure

```
career-navigator/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── src/
    ├── main.jsx      # React entry point
    ├── App.jsx       # Entire application (pages, data, logic)
    └── index.css     # Tailwind directives + font imports
```

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The build output goes to `dist/`.

## Deploy to Vercel

**Option A — Vercel dashboard**
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. In Vercel, click **New Project** and import the repo.
3. Framework preset: **Vite** (auto-detected). Build command: `npm run build`.
   Output directory: `dist`.
4. Click **Deploy**.

**Option B — Vercel CLI**
```bash
npm install -g vercel
vercel        # first deploy (follow prompts)
vercel --prod # promote to production
```

No environment variables are required — the app ships with all sample
data built in.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react (icons)
