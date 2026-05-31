# Learnnify

AI learning widget service for turning manually pasted article snapshots into saved summary slides and quizzes, then embedding those generated learning assets in a blog article.

## MVP Scope

- Admin-only article management.
- Manual article body paste as an AI generation snapshot.
- Slide and quiz generation from the saved snapshot.
- Public embed API that returns only generated learning content.
- Vanilla `embed.js` widget for blog pages.

Out of scope for the MVP: article scraping, blog synchronization, multiple users, billing, analytics, answer history, generated content editing, and embed-domain restrictions.

## Setup

```bash
npm install
cp .env.example .env.local
```

Configure:

```txt
DATABASE_URL
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
ADMIN_EMAIL
AI_PROVIDER
AI_MODEL
NEXT_PUBLIC_APP_URL
```

For direct providers, also configure the matching server-side key:

```txt
OPENAI_API_KEY
GOOGLE_GENERATIVE_AI_API_KEY
```

## Database

```bash
npm run db:generate
npm run db:migrate
```

The schema contains `articles`, `slides`, and `quizzes`. Article body text is stored only as a generation snapshot and is not returned by the public embed API.

## Development

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/login
http://localhost:3000/admin/articles
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
node --check public/embed.js
```

## Embed Snippet

Each article detail page renders an embed snippet in this shape:

```html
<div data-learning-widget data-article-id="article_xxx"></div>
<script src="https://your-service.com/embed.js"></script>
```

`embed.js` reads saved content through `/api/embed/articles/:id`. It does not call AI generation endpoints.
