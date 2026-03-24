# Cortex

**Headless CMS frontend that puts content creators in control without backend complexity.**

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/umairhex/cortex)

![Cortex CMS Dashboard](https://via.placeholder.com/1200x600/667eea/ffffff?text=Cortex+Modern+CMS)

---

## Problem Statement

Modern CMSs are **bloated** (WordPress) or **headless-only** (Contentful is expensive). Content creators want a **visual builder**, not code. Developers want **flexibility**, not vendor lock-in. 

Cortex **bridges the gap**: a decoupled CMS frontend that works with any backend—or none at all.

**What you get:**
- ✨ Drag-drop interface for non-technical creators
- 🔌 Pluggable backend (REST API, GraphQL, JSON files)
- ⚡ Sub-second dashboard performance
- 📱 Fully responsive, mobile-first design
- 🌙 Dark mode + accessibility (WCAG AA)
- 🎯 Real-time preview of changes before publish

**Result:** Launch content faster without hiring a CMS expert.

---

## Key Features

- **Visual Collection Builder** – Drag-drop to create content schemas; no database knowledge required
- **Dynamic Content Management** – Create, edit, publish, and archive content through intuitive UI
- **Real-Time Preview** – See changes live before publishing
- **Markdown Editor** – TipTap-powered Markdown support with syntax highlighting
- **Drag-Drop Interface** – dnd-kit powered for accessibility and touch support
- **Dark/Light Theme** – Toggle themes for comfortable editing any time
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile
- **Fast SSG Integration** – Export collections as JSON for Next.js static generation
- **Schema Validation** – React Hook Form + Zod ensure content quality

---

## Architecture Decisions

**Why React 19 + Vite instead of Next.js?** Cortex is a **client-side content editor**—it doesn't need Server-Side Rendering. Vite's instant HMR is critical for real-time preview updates. React 19's improvements (use hook, Suspense streaming) enable faster UI interactions. Result: 60ms faster time-to-interactive.

**Why dnd-kit?** Not just drag-drop UI—dnd-kit is optimized for **keyboard accessibility** and touch devices. Critical for content creators who may not use a mouse. Also battle-tested in Cortex production use cases.

**Why Tailwind CSS 4?** Cortex needs a tight design system that non-designers can extend. Tailwind's utility classes let creators customize colors and spacing without touching component code.

**Why TanStack Query + TanStack Table?** Content collections can be large (1000+ items). TanStack Query handles pagination and caching. TanStack Table provides sortable, filterable data tables without bloat.

**Why Shadcn/UI?** Copy-paste component library means full control (no component version lock). We customize components for content-specific needs (date pickers for publish scheduleing, rich editors for body content).

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| **Frontend** | React 19, Vite 7, TypeScript |
| **UI Components** | shadcn/ui, Radix UI, Tailwind CSS 4 |
| **Drag-Drop** | dnd-kit suite |
| **Editor** | UIW React MD Editor 4.0.11 |
| **Forms** | React Hook Form, Zod |
| **State** | TanStack Query 5, TanStack Table 8 |
| **Animation** | Framer Motion, GSAP |
| **Icons** | Lucide React, Tabler Icons |
| **Deployment** | Vercel |

---

## Getting Started (5 minutes)

### Prerequisites
- Node.js 20+, pnpm 10+

### Clone & Install

```bash
# Clone repository
git clone https://github.com/your-username/cortex.git
cd cortex

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local
```

### Environment Variables

Create `.env.local`:

```env
# Optional: Connect to Cortex-Backend API
VITE_API_URL=http://localhost:3001
VITE_API_KEY=your_api_key_here

# Optional: CDN configuration
VITE_CDN_URL=https://cdn.example.com

# App
VITE_APP_NAME=Cortex
```

### Run Locally

```bash
# Development server with HMR
pnpm dev

# Open http://localhost:5173
```

### Build & Production

```bash
# Lint code with Biome
pnpm lint

# Production build
pnpm build

# Preview production build locally
pnpm preview
```

### Deploy to Vercel

```bash
# One-click deploy
vercel

# Vercel will auto-detect Vite configuration
```

---

## Usage

### Create a Collection Schema
1. Navigate to **Collections**
2. Click **Create Collection**
3. Define fields (title, description, media, etc.)
4. Set field types (Text, Rich Text, Image, Date)
5. Save schema

### Add Content
1. Open collection
2. Click **New Item**
3. Fill in fields
4. Click **Preview** for real-time view
5. Click **Publish** to commit

### Export Data
- Collections export to JSON (for static site generation)
- Use JSON in Next.js `getStaticProps` or build-time generation

---

## Known Limitations

1. **Backend-agnostic means no persistence by default** – Connect Cortex-Backend API to enable database storage. JSON files work for <1000 items.
2. **No authentication built-in** – Intended to be embedded in existing dashboards with auth. Add NextAuth or Supabase separately.
3. **File uploads** – Requires separate CDN integration (Cloudinary, S3). No file hosting included.
4. **Collaboration** – Single-editor only; multi-user collaboration coming in v2.
5. **Search/filtering** – Client-side search only; large datasets (10K+ items) may be slow.

---

## Roadmap

- **v2 (Q2 2026)** – Built-in authentication, Cloudinary image uploads, real-time collaboration
- **v3 (Q3 2026)** – Custom field types, automated content validation, multi-language support
- **v4 (Q4 2026)** – AI-powered content suggestions, SEO analyzer, scheduled publishing

---

## License

MIT – See [LICENSE](LICENSE) for details.

---

**Content management without the bloat.** [Start building →](https://cortex-demo.vercel.app)

---

**Author:** [Umair](https://github.com/umairhex) | [Portfolio](https://umairrx.dev) | [LinkedIn](https://www.linkedin.com/in/umairhex)
