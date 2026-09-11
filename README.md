# Shuwen Yu · Personal Index

A React + Vite + TypeScript personal homepage combining academic work, finance experience, and a personal library of animation and music.

## Local preview

```bash
cd "C:\Users\25895\Desktop\MIS3011\个人网站\portfolio-site"
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open:

```text
http://127.0.0.1:5173/yu-shuwen-portfolio/#home
```

The site uses hash navigation so it works safely on GitHub Pages:

- `#home` — Bento homepage
- `#papers` — academic papers / research notes
- `#library` — animation and music library

## Content and API data

- `src/data/siteData.ts` remains the source of truth for personal profile, reviews, ratings, music notes, games, and creative work.
- `src/data/libraryData.json` is the simple configuration file for live API enrichment:
  - `animes`: `bgmId`, personal `rating`, `comment`, and optional `xhsUrl`
  - `musics`: `songName` and optional `artist`
- `src/services/bangumiApi.ts` fetches subject title, Chinese title, cover, year, summary, and Bangumi URL from `https://api.bgm.tv/v0/subjects/{id}`.
- `src/services/itunesApi.ts` searches the iTunes Search API, upgrades artwork to 600×600 where supported, and exposes the optional 30-second preview URL.

Live data is optional. If an API request fails, is rate-limited, blocked by CORS, or returns no result, the site keeps showing saved local entries instead of a blank page. No API keys are stored in the browser.

## Resume link

The highlighted Resume button currently points to the temporary local URL in `src/data/siteConfig.ts`:

```ts
export const resumeUrl = 'http://127.0.0.1:4176/shuwen-yu-resume/'
```

After deploying the separate `resume-portfolio` project to GitHub Pages, replace this value with its public URL.

## Build

```bash
npm run build
npm run preview
```

The existing Vite base is `/yu-shuwen-portfolio/`, matching the current GitHub Pages repository configuration.
