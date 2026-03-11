# Vibe

A modern **Next.js 16** startup template with **React 19**, **TypeScript**, and the App Router. Single-page landing with theme switcher, color picker, and responsive sections (hero, features, pricing, contact, and more).

**Live site:** [vibe.infyways.com](https://vibe.infyways.com)

## Prerequisites

- **Node.js** 20.9 or later ([download](https://nodejs.org/))
- **npm**, **pnpm**, or **yarn**

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/vibe-next.git
cd vibe-next
```

### 2. Install dependencies

```bash
npm install
```

Or use **pnpm** or **yarn** if you prefer.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start the production server (run after `build`) |
| `npm run lint` | Run ESLint |

> **Note:** If `next lint` reports “Invalid project directory”, run it from the project root or use your IDE’s ESLint integration.

## Configuration

### Next.js config

Settings live in `next.config.mjs`. To allow more image domains (e.g. for `<Image>`), add them to `images.remotePatterns`:

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    // Add more hosts as needed
  ],
},
```

### Path alias

Use the `@/` alias (see `tsconfig.json`) to import from the project root:

```ts
import { getThemeVars } from '@/lib/theme';
```

### Theme

Primary and secondary colors are defined in `lib/theme.ts`. The in-app settings panel lets users switch dark/light mode, gradient/flat style, and primary color (saved in cookies).

### Environment variables

None are required. If you add any:

1. Create `.env.local` (do not commit it).
2. Add `.env.example` with variable names only, so others know what to set.
3. Use the `NEXT_PUBLIC_` prefix for values needed in the browser.

## Project structure

```
vibe-next/
├── app/                 # App Router
│   ├── globals.css      # Global styles and design tokens
│   ├── icon.tsx         # Favicon (Next.js metadata)
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── lib/
│   └── theme.ts         # Theme config (primary/secondary colors)
├── public/              # Static assets (favicon.ico, etc.)
├── .eslintrc.json       # ESLint (Next.js config)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Tech stack

- **Next.js 16** — App Router, Turbopack by default
- **React 19**
- **TypeScript** (`.tsx` / `.ts`)
- **Lucide React** — icons

## Contributing

Contributions are welcome. Open an issue or submit a pull request. When you add dependencies or config, update this README (and `.env.example` if you introduce env vars).

## License

[Add your license here, e.g. MIT, Apache 2.0]
