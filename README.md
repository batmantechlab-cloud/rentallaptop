# Rentiva – Laptop Rental Website

Next.js 16 static marketing site for a laptop / IT equipment rental business.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages static)
```

## Edit content

All business details (name, phone, address, products, prices, cities, FAQs, reviews) live in `lib/site.ts`.

## Deploy (Vercel)

1. Import this repository at https://vercel.com/new (framework is auto-detected as Next.js).
2. Add the environment variable `NEXT_PUBLIC_SITE_URL` = your live URL (e.g. `https://www.yourdomain.in`) so canonical links and the sitemap use it.
3. Deploy.
