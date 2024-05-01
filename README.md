The project that uses AI to generate quizzes based on documents you upload.

## Tech Stack 

- Next-auth - Authentication
- Shadcn ui - ui library
- Open Al - AI Integration
- Langchain - LLM Framework
- Drizzle - Orm
- PostgreSQL - Database
- Supabase - Database hosting
- Stripe - Payments
- Tanstack - Table
- Typescript - Type Checking
- Vercel - Deployment
- Stripe - Payments
- Zod - Schema Validation

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

Create a new .env file and add your keys in the following manner:
```
OPENAI_API_KEY=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
AUTH_SECRET=""
DATABASE_URL=""
NEXT_PUBLIC_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_WEBHOOK_LOCAL_SERCRET=""
```

## Deploy on Vercel

