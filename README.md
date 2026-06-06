# DevLog

A minimal developer blog platform built with Next.js 15, Prisma, and PostgreSQL for the ChaiCode Web Dev Cohort 2026 assignment.

---

## Project Overview

DevLog lets you write, tag, draft, and publish short developer notes/posts. It demonstrates every core Next.js concept taught in class — file-based routing, layouts, SSR/SSG/ISR, API routes with full CRUD, Server Actions, and database integration — in a small, cohesive application.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database ORM | Prisma 5 |
| Database | PostgreSQL |
| Styling | CSS Modules + CSS Variables |
| Validation | Zod |
| Icons | lucide-react |
| Theme | next-themes |
| Language | TypeScript |

---

## Features

- Write and manage developer posts with title, content, excerpt, and tags
- Save posts as drafts or publish to the public feed
- Full CRUD via REST API routes (GET, POST, PUT, PATCH, DELETE)
- Server Actions for create, update, and delete from forms
- Dark / light mode toggle (system default)
- Responsive layout with sticky glassmorphism navbar
- Structured API responses with proper error handling
- 404 and 500 error pages

---

## How to Run Locally

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd devlog

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local and set your DATABASE_URL

# 4. Push the schema to your database
npx prisma db push

# 5. (Optional) Open Prisma Studio to inspect data
npx prisma studio

# 6. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |

Example (Neon):
```
DATABASE_URL="postgresql://user:password@ep-xyz.us-east-1.aws.neon.tech/devlog?sslmode=require"
```

---

## Database Setup

This project uses Prisma with PostgreSQL. The schema has one model:

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  excerpt   String
  tags      String[]
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Run `npx prisma db push` to create the table. No migrations file is needed for this project.

---

## Routes / Pages

| Route | Description |
|---|---|
| `/` | Home page (SSG) |
| `/about` | About / docs page (SSG) |
| `/feed` | Public post feed (ISR, 60s) |
| `/posts` | My posts dashboard (SSR) |
| `/posts/new` | Create new post |
| `/posts/[id]` | Post detail page (SSR) |
| `/posts/[id]/edit` | Edit post (SSR) |

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | List all posts (filter by `?published=true&tag=react`) |
| POST | `/api/posts` | Create a new post |
| GET | `/api/posts/[id]` | Get a single post by ID |
| PUT | `/api/posts/[id]` | Full update of a post |
| PATCH | `/api/posts/[id]` | Partial update of a post |
| DELETE | `/api/posts/[id]` | Delete a post |

All responses follow the format:
```json
{ "success": true, "data": {...} }
{ "success": false, "error": "message" }
```

---

## Server Actions

Located in `src/actions/posts.ts`:

| Action | Use Case |
|---|---|
| `createPost(formData)` | Called from the New Post form via `useActionState` |
| `updatePost(id, formData)` | Called from the Edit Post form via `useActionState` |
| `deletePost(id)` | Called from the Delete button via `useTransition` |

Server Actions differ from API routes because they run on the server, are called directly from client components without a fetch, and can revalidate caches via `revalidatePath`.

---

## Rendering Strategies

| Page | Strategy | Reason |
|---|---|---|
| `/` | SSG | Static marketing page, no dynamic data |
| `/about` | SSG | Static content, never changes at runtime |
| `/feed` | ISR (60s) | Published posts change occasionally; stale-while-revalidate is ideal |
| `/posts` | SSR | Dashboard must always show the latest posts |
| `/posts/[id]` | SSR | Post detail must always be up to date |
| `/posts/[id]/edit` | SSR | Must load the latest post data before editing |

---

## Concepts Covered from Class

- Next.js App Router with file-based routing
- Nested layouts (root layout with Navbar)
- Server Components and Client Components (`'use client'`)
- `'use server'` directive in Server Actions
- `useActionState` for progressive form enhancement
- `revalidatePath` for cache invalidation
- `export const dynamic = 'force-dynamic'` for SSR
- `export const revalidate = 60` for ISR
- API Routes with `NextRequest` / `NextResponse`
- Prisma ORM with PostgreSQL
- Environment variables for database configuration
- `notFound()` and error boundaries
- Dynamic metadata generation with `generateMetadata`

---

## Project Structure

```
src/
├── actions/
│   └── posts.ts           ← Server Actions
├── app/
│   ├── api/posts/         ← REST API routes
│   ├── about/             ← SSG About page
│   ├── feed/              ← ISR public feed
│   ├── posts/             ← SSR dashboard + new/[id]/edit
│   ├── layout.tsx         ← Root layout
│   ├── page.tsx           ← SSG Home
│   ├── not-found.tsx      ← 404 page
│   └── error.tsx          ← Error boundary
├── components/
│   ├── ui/                ← Button, Input, Textarea, Badge
│   ├── Navbar.tsx
│   ├── ThemeToggle.tsx
│   ├── ThemeProvider.tsx
│   ├── PostCard.tsx
│   ├── PostForm.tsx
│   └── DeleteButton.tsx
└── lib/
    ├── prisma.ts           ← Prisma singleton
    └── validations.ts      ← Zod schemas
```

---

## Assumptions and Limitations

- No authentication — all posts are managed without user login (not required by the assignment)
- Tags are stored as a PostgreSQL `String[]` array (Prisma supports this natively)
- Content is plain text only — no Markdown rendering
- No pagination — suitable for a small assignment project
