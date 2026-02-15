# clipbin-web

Pastebin-style public resolver for links like:

- `https://clipbin.com/Ab12Cd34`

## Setup

1. Install dependencies

```bash
cd web
npm install
```

2. Configure env

```bash
cp .env.example .env.local
```

Set values from your Supabase project:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

3. Run locally

```bash
npm run dev
```

Open `http://localhost:3000/Ab12Cd34`.

## How it works

- Route: `app/[shortCode]/page.tsx`
- API endpoint: `app/api/resolve/route.ts`
- Endpoint calls Supabase RPC `resolve_clip` with:
  - `p_short_code`
  - `p_password`
  - `p_source = "web_public"`

Only public web resolves should increment clicks (owner preview in iOS is excluded by DB logic).

## Deploy to Vercel

1. Import this `web` folder as a project in Vercel.
2. Add env vars in Vercel project settings:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Deploy.
4. Point your domain (`clipbin.com`) to that Vercel project.
