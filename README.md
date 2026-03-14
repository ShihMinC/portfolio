# Shih-Min Chen — Portfolio

Notion-powered portfolio website. Built with Next.js + react-notion-x, deployed on Vercel.

**No API token needed** — reads your public Notion page directly.

---

## Deploy in 3 steps

### 1. Push to GitHub

```bash
# If you don't have git installed, download GitHub Desktop instead
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your `portfolio` repo
4. Click **Deploy** — that's it

### 3. Update content

Just edit your Notion page. The site auto-updates within 60 seconds.

---

## Notion Page Structure

Your Notion page ID is hardcoded as `24d059c5d48d4f6d9ae6af5558658cfb`.

To change it, edit `src/lib/notion.ts`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
