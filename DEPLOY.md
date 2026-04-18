# Deploying Evara Advisory to Vercel

This project is a static HTML + inline-JSX site with **one serverless function** (`/api/scope`) that powers the live Scope Drafter on the Contact page.

## 1 · First-time Vercel setup

If the Vercel project is already connected to a GitHub repo (most likely), just push this project's files into that repo and Vercel will auto-deploy. If you're using the Vercel CLI directly, run `vercel --prod` from the project root.

## 2 · Environment variable (REQUIRED)

The Scope Drafter will silently fail without this.

1. Go to **Vercel Dashboard → your project → Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))
   - **Environments:** ✅ Production · ✅ Preview · ✅ Development
3. Click **Save**
4. **Redeploy** — env var changes only take effect on the next deploy. Trigger one by pushing a commit or clicking "Redeploy" in the Deployments tab.

## 3 · How to verify it's working

After deploy:
1. Visit `yourdomain.com/contact`
2. Type a scenario into the Scope Drafter (min 20 chars)
3. Click "Generate"
4. You should see a generated scope within a few seconds

If it errors:
- Check **Vercel → your project → Logs** for the `/api/scope` function
- Most likely cause: env var missing or typo'd
- Second most likely: you haven't redeployed since adding the env var

## 4 · Cost & rate limiting

- Model: `claude-haiku-4-5`
- Max tokens out: 1024 per request
- Typical cost per scope draft: ~$0.003 USD (about 0.3 cents)
- Rate limit: **5 requests per IP per hour** (in-memory, resets on cold start)

At 100 scope drafts/month, you're looking at ~$0.30/month. The rate limit stops anyone sitting on the form farming free tokens — at 5/hour an individual can cost you at most ~$1.50/day even if they try.

## 5 · If you want stricter rate limiting

The current limiter is per-function-instance. For hard enforcement across regions, swap to Upstash Redis (free tier is plenty). Ask and I'll wire it.

## 6 · Files added for deployment

- `api/scope.js` — the serverless function
- `vercel.json` — function config + HTML caching headers
- This file (`DEPLOY.md`) — you can delete it or leave it

Everything else is the same static site you've been iterating on.
