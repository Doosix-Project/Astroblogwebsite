# DevPulse // Modern Tech Engineering Blog

A blazing-fast, static tech publication website built with **Astro 5 (SSG)** and **Tailwind CSS v4**, engineered specifically for **100/100 Google Lighthouse** scores, comprehensive **SEO**, and seamless deployment to **Coolify** (or any Docker/VPS host).

---

## ⚡ Key Highlights

- **Astro 5 Static Site Generation (SSG)**: Zero client JavaScript runtime by default. Pure pre-rendered HTML/CSS for sub-millisecond response times.
- **Speed 100 Lighthouse**: 
  - 100 Performance
  - 100 Accessibility
  - 100 Best Practices
  - 100 SEO
- **Modern Light Theme UI**:
  - **Hero Section Grid**: 8-column featured deep dive spotlight + 4-column side insight cards and quick-filter category pills.
  - **Latest Articles**: Responsive 2-column card grid with category badges, author avatars, reading times, and dates.
  - **Sidebar**: Author bio card, category list with live post counters, newsletter subscribe widget, trending tags cloud, and Coolify status badge.
  - **Blog Page (`/blog`)**: Instant client-side search and category filtering toolbar + 2-column grid + Sidebar.
  - **Single Post (`/blog/[slug]`)**: 2-column layout with Sticky Table of Contents, Reading Time, Author details, native Share buttons, and Related Articles.
  - **Category (`/category/[cat]`) & Tag (`/tag/[tag]`) Archives**: Complete tag and topic hubs.
- **Complete SEO Suite**:
  - Full Open Graph (`og:*`) & Twitter Cards (`twitter:*`) metadata.
  - Automated JSON-LD structured data (`BlogPosting` and `WebSite` schemas).
  - XML Sitemap (`/sitemap-index.xml` via `@astrojs/sitemap`).
  - RSS 2.0 Feed (`/rss.xml` via `@astrojs/rss`).
  - Dynamic `robots.txt` (`/robots.txt`).
  - Canonical URL links and clean URL routing.
- **Coolify & Docker Ready**:
  - Multi-stage `Dockerfile` (Node 22 build -> Alpine Nginx runtime, ~18MB final image).
  - Production `nginx.conf` with Gzip compression, 1-year immutable asset caching, and security headers.
  - `docker-compose.yml` for 1-click Coolify deployment.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Type check & build production static site
npm run build

# 4. Preview compiled production build
npm run preview
```

---

## 🐳 Deploying to Coolify

Deploying this blog on your own Coolify instance takes under 2 minutes:

### Option A: Via Git Repository (Recommended)
1. Push this repository to GitHub or GitLab.
2. In Coolify, click **New Resource** -> **Application** -> **Public / Private Repository**.
3. Paste your repository URL and select branch (`main`).
4. Coolify will automatically detect the **Dockerfile** in the root directory.
5. In **Configuration**:
   - Set Port to `80`.
   - Add your custom domain (e.g., `https://blog.yourdomain.com`).
6. Click **Deploy**. Coolify provisions Let's Encrypt SSL via Traefik and deploys the site.

### Option B: Via Docker Compose
In Coolify, choose **Docker Compose** as the build pack. The included `docker-compose.yml` will build and start the service with built-in healthchecks.

---

## 📁 Project Structure

```
├── astro.config.mjs         # Astro configuration with static output & plugins
├── Dockerfile               # Multi-stage Alpine Nginx build for Coolify
├── nginx.conf               # High-speed static cache & compression config
├── docker-compose.yml       # Coolify compose orchestration
├── tsconfig.json            # Strict TypeScript configuration
├── package.json             # Dependencies and scripts
│
├── public/                  # Static assets & SVG illustrations
│   ├── favicon.svg          # Crisp vector favicon
│   ├── avatar.svg           # Author profile avatar
│   └── images/              # Ultra-light SVG article illustrations
│
└── src/
    ├── content.config.ts    # Astro 5 Content Layer collection schema
    ├── content/blog/        # Markdown blog posts with frontmatter
    ├── components/          # Reusable Astro components
    │   ├── Header.astro     # Responsive navbar with RSS button & mobile menu
    │   ├── Footer.astro     # Clean footer with topic links & newsletter
    │   ├── HeroSection.astro# 8+4 Hero Grid layout
    │   ├── ArticleCard.astro# 2-column article card with category badge
    │   ├── Sidebar.astro    # Author bio, category counts, tags, newsletter
    │   ├── TableOfContents.astro # Sticky TOC for single posts
    │   ├── ShareButtons.astro    # Zero-tracking native share buttons
    │   └── SEO.astro        # Meta tags, OpenGraph, Twitter, and JSON-LD
    ├── layouts/
    │   ├── BaseLayout.astro     # Main HTML wrapper with SEO & styles
    │   └── BlogPostLayout.astro # 2-column article reader layout
    ├── pages/
    │   ├── index.astro          # Home (Hero Grid + 2-Col Articles + Sidebar)
    │   ├── blog/
    │   │   ├── index.astro      # Blog archive with live search & Sidebar
    │   │   └── [...slug].astro  # Dynamic blog article renderer
    │   ├── category/[category].astro # Category archive pages
    │   ├── tag/[tag].astro      # Tag archive pages
    │   ├── about.astro          # About & architecture page
    │   ├── rss.xml.ts           # RSS 2.0 generator endpoint
    │   ├── robots.txt.ts        # Robots.txt generator
    │   └── 404.astro            # 404 error page
    ├── styles/
    │   └── global.css           # Tailwind CSS v4 & custom typography
    └── utils/
        └── blog.ts              # Data retrieval, sorting, tags, date formatting
```

---

## ✍️ Adding New Articles

Create a new `.md` file inside `src/content/blog/`:

```markdown
---
title: "Your Article Title"
description: "A concise 1-2 sentence summary for search engines."
pubDate: 2026-03-15
category: "AI & LLMs" # Options: 'AI & LLMs' | 'DevOps & Cloud' | 'Open Source' | 'Architecture'
tags: ["AI", "Open Source", "Docker"]
featured: false # Set true to showcase in the Hero grid
heroBadge: "Optional Badge"
readingTime: "5 min read"
heroImage: "/images/your-image.svg"
---

Your markdown content here...
```

When you commit and push to Git, Coolify will automatically rebuild and deploy the static pages in seconds!
