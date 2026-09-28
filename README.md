# Tale's Bakery — Website Source

The complete source for the Tale's Bakery website. You can run it, edit it, and deploy it from your own laptop using VS Code.

## What you need

- [Node.js](https://nodejs.org) version 20 or newer (the LTS version is fine). Download and install it, then restart VS Code.
- (Optional) [Bun](https://bun.sh) if you prefer it over npm — the project also includes a `bun.lock`.

## Run it on your laptop

1. Unzip this folder and open it in VS Code (`File → Open Folder`).
2. Open the built-in terminal (`Terminal → New Terminal`) and run:

```sh
npm install
npm run dev
```

3. Open http://localhost:5173 in your browser. The site hot-reloads as you edit files in `src/`.

> The `.env` file contains your project's public web address and public key. These are safe to ship — they only allow reading and posting reviews.

## Build for production

```sh
npm run build
```

This creates a `dist/` folder with the optimized site (a Nitro/Cloudflare-ready build).

## Deploy

The build targets Cloudflare Workers by default, so the easiest paths are:

- **Cloudflare**: `npx nitro deploy --prebuilt` (walks you through connecting a Cloudflare account), or connect the repo to Cloudflare Workers Builds.
- **Netlify / Vercel**: import the Git repository, and it auto-detects the Nitro build (`npm run build`, publish `dist`).
- **Any Node host**: `npm run build && npm run preview` to test the production build locally first.

## Where things live

- `src/routes/index.tsx` — the whole one-page site (hero, about, menu, gallery, reviews, contact, footer)
- `src/components/ReviewsSection.tsx` — the live customer reviews
- `src/assets/bakery/` — all photos
- `src/styles.css` — colors, fonts, and design tokens
- `supabase/migrations/` — the database table behind the customer reviews

## Reviews database

The reviews section connects to your Lovable Cloud database using the settings in `.env`. As long as the database stays active, customer reviews posted on any deployment will appear everywhere.
