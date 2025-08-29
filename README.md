# 🐱 Komako Gallery

A beautiful, fast, and accessible photo gallery website for Komako, a Scottish Fold cat born March 26, 2021. Built with Astro, Tailwind CSS, and optimized for deployment on Cloudflare Pages.

![Astro](https://img.shields.io/badge/Astro-5.0-ff5a1f?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **Fast Performance**: Static site generation with Astro for blazing-fast load times
- **Mobile-First Design**: Responsive masonry gallery layout that looks great on all devices
- **Image Optimization**: Automatic image optimization with multiple formats (WebP, AVIF, JPG)
- **Dark/Light Theme**: System-aware theme switching with manual override
- **Internationalization**: English and Japanese language support with fallbacks
- **Full-Text Search**: Client-side search with Fuse.js across photos, albums, and journal entries
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Structured data, Open Graph tags, and automatic sitemap generation

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/komako.git
cd komako

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

### Build for Production

```bash
# Build the site
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
komako/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI pipeline
├── content/
│   ├── photos/            # Photo content (MDX files)
│   │   └── 2025/
│   │       └── 08/
│   ├── albums/            # Album definitions (MD files)
│   └── journal/           # Journal posts (MDX files)
├── public/
│   ├── images/            # Photo assets
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/        # Astro components
│   │   ├── GalleryGrid.astro
│   │   ├── Lightbox.astro
│   │   ├── PhotoCard.astro
│   │   └── ...
│   ├── layouts/           # Page layouts
│   │   └── BaseLayout.astro
│   ├── lib/              # Utility functions
│   │   ├── content.ts
│   │   ├── i18n.ts
│   │   └── search.ts
│   ├── pages/            # Route pages
│   │   ├── index.astro
│   │   ├── timeline.astro
│   │   ├── albums/
│   │   ├── journal/
│   │   └── ja/           # Japanese translations
│   └── styles/
│       └── globals.css
├── astro.config.mjs      # Astro configuration
├── tailwind.config.cjs   # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## 📝 Content Management

### Adding Photos

Create a new MDX file in `content/photos/YYYY/MM/`:

```mdx
---
title: "Photo title"
date: 2025-08-20
tags: ["cute", "sleeping", "sunny"]
album: "2025-august"
image: "/images/2025/08/photo-name.jpg"
alt: "Descriptive alt text"
location: "Brisbane, AU"
lang: "en"
---

Optional description or story about the photo.
```

### Creating Albums

Add a new MD file in `content/albums/`:

```md
---
title: "Album Title"
slug: "album-slug"
cover: "/images/2025/08/cover.jpg"
summary: "Brief album description"
lang: "en"
date: "2025-08-01"
---
```

### Writing Journal Posts

Create an MDX file in `content/journal/`:

```mdx
---
title: "Post Title"
date: 2025-08-20
excerpt: "Brief summary for listings"
lang: "en"
---

Your journal content in Markdown format.
```

## 🖼️ Image Preparation

### Recommended Image Sizes

- **Gallery thumbnails**: 400x300 (4:3 ratio)
- **Full images**: 1920x1440 maximum
- **Album covers**: 800x600

### Optimization Tips

1. Use JPG for photos (80-85% quality)
2. Keep file sizes under 500KB for thumbnails
3. Provide descriptive alt text for accessibility
4. Use consistent naming: `komako-description.jpg`

## 🌐 Internationalization

### Adding Japanese Content

1. Create Japanese versions of content with `lang: "ja"` in frontmatter
2. Place in same directory as English version
3. System automatically falls back to English if Japanese not available

Example Japanese photo:
```mdx
---
title: "夕食を待っている"
date: 2025-08-14
tags: ["夕食", "かわいい", "ポーズ"]
lang: "ja"
---
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Run TypeScript type checking
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run check        # Run all checks (lint, typecheck, build)
```

## 📏 Git Workflow

### Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or fixes
- `chore:` Build process or auxiliary tool changes

Examples:
```bash
git commit -m "feat: add image lazy loading"
git commit -m "fix: correct lightbox keyboard navigation"
git commit -m "docs: update README with deployment steps"
```

### Branch Strategy

1. `main` - Production branch (protected)
2. Feature branches: `feat/feature-name`
3. Bug fixes: `fix/bug-description`
4. Create PR to merge into `main`

## 🚀 Cloudflare Pages Deployment

### Initial Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add -A
   git commit -m "feat: initial commit"
   git remote add origin git@github.com:yourusername/komako.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
   - Click "Create a project" → "Connect to Git"
   - Select the `komako` repository
   - Configure build settings:
     - **Framework preset**: Astro (or None)
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node version**: 20

3. **Enable Features**
   - ✅ Preview deployments
   - ✅ Auto deployments
   - ✅ Branch deployments

### Custom Domain (Optional)

1. Go to your Cloudflare Pages project
2. Navigate to "Custom domains"
3. Add your domain (e.g., `komako.example.com`)
4. Follow DNS configuration instructions

### Environment Variables

No environment variables required for basic setup. If needed in future:

1. Go to Settings → Environment variables
2. Add variables for both Production and Preview

## 🎯 Performance Goals

- **Lighthouse Score**: ≥90 for all metrics
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.05
- **Time to Interactive**: < 3s on 3G

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 🐾 About Komako

Komako is a Scottish Fold cat born on March 26, 2021, living in Brisbane, Australia. This gallery celebrates her daily adventures and adorable moments. Visit the [About page](/about) to learn more about her!

## 📞 Support

For issues, questions, or suggestions:
- Open an [issue](https://github.com/yourusername/komako/issues)
- Check [discussions](https://github.com/yourusername/komako/discussions)

---

Made with ❤️ for Komako 🐱