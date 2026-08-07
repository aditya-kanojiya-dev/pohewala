This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment & Database Setup

The contact, franchise and "Enquire Now" forms write to a Postgres database
and are visible behind an admin login. To run locally or deploy:

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Set `DATABASE_URL` to a Postgres connection string (Neon, Supabase,
   Vercel Postgres, RDS...). The `leads` and `login_attempts` tables are
   created automatically on first use — no manual schema step required.
3. Set `ADMIN_PASSWORD` (and optionally `AUTH_SECRET`).
4. Set `NEXT_PUBLIC_SITE_URL` to the real domain so canonical URLs, the
   sitemap and robots.txt point at the production site.
5. View received enquiries at `/admin` (e.g. `https://yourdomain.com/admin`).

> Vercel serverless note: the filesystem is ephemeral, so the site requires a
> managed Postgres (not a local file). Pools are capped at one connection to
> respect serverless connection limits.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
