# Neotro Ltd Corporate & Institutional Showcase Website

Official modern web portal for **Neotro Ltd** — enterprise digital infrastructure, sovereign cloud, and institutional software solutions across Africa.

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Vite 8**, and **Three.js**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + TypeScript (~6.0)
- **Bundler & Tooling**: Vite 8 + `@vitejs/plugin-react`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) + Lucide React icons
- **Interactive 3D / Graphics**: Three.js (interactive architectural canvas) + Pan-African animated vector routing network
- **Serverless API**: Vercel Serverless Function (`api/contact.ts`) with Resend REST delivery to `info@neotroltd.com`
- **Deployment**: Vercel / Netlify / Static Edge Hosting (configured via `vercel.json`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ or v20+ recommended)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start local Vite development server
npm run dev
```

The application runs locally at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build optimized static assets
npm run build
```

Production output will be generated in `dist/`.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

---

## 📬 Contact Form & Serverless Email Route

The website includes a serverless endpoint at `POST /api/contact` powered by **Resend**. When visitors submit the inquiry form or launch the project modal, inquiries are formatted into a structured enterprise HTML notification and delivered directly to **`info@neotroltd.com`**.

### Environment Variables

Set the following environment variables in your Vercel Project Settings (**Settings > Environment Variables**):

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | API key generated from [Resend](https://resend.com/api-keys) | `re_123456789...` |
| `NOTIFICATION_EMAIL` | Target inbox for client inquiries | `info@neotroltd.com` |
| `FROM_EMAIL` | Sender email identity | `Neotro Portal <onboarding@resend.dev>` or `Neotro Portal <inquiry@neotroltd.com>` |

*Note: During initial setup before domain DNS verification, Resend permits sending from `onboarding@resend.dev` to the registered Resend account owner email. Once `neotroltd.com` domain is verified in Resend, you can send directly from `inquiry@neotroltd.com`.*

---

## 📂 Project Structure

```text
├── api/                    # Vercel serverless function endpoints
│   └── contact.ts          # Resend inquiry dispatch handler
├── public/                 # Static assets, logos, brand vectors, sitemap, robots.txt
│   ├── data/               # Vector path definitions (e.g., Africa country outlines)
│   ├── images/             # Media and showcase illustrations
│   ├── logos/              # Official Neotro Ltd vector marks and lockups
│   ├── robots.txt          # Search engine crawling rules
│   └── sitemap.xml         # Canonical search index sitemap
├── src/
│   ├── components/         # Modular React UI components (NeotroLogo, AfricaMotionMap, ContactModal, etc.)
│   ├── data/               # Static showcase content, sector platforms, and initial data
│   ├── App.tsx             # Main application orchestrator and interactive showcase
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global typography and Tailwind CSS v4 layers
├── .env.example            # Template for environment variables
├── vercel.json             # Vercel deployment rewrites and edge routing
└── vite.config.ts          # Vite build configuration
```

---

## 📄 License

Proprietary © Neotro Ltd. All rights reserved.
