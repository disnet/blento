# Contributing Guidelines

For new cards see [CustomCards](CustomCards.md) and [CardIdeas](CardIdeas.md).

## Setup

```sh
git clone https://github.com/flo-bit/blento.git
cd blento
pnpm install
pnpm env:setup-dev   # creates .env, fills COOKIE_SECRET + CLIENT_ASSERTION_KEY
pnpm dev
```

Note: if cloudflare authorization website opens when running `pnpm dev` flip the `DB` binding's `"remote": true` to `false` in `wrangler.jsonc` and re-run.

Individual `/handle` pages load directly from each user's PDS — no backfill needed.

## Before opening a PR

- `pnpm check` — must complete with 0 errors and 0 warnings (existing baseline excepted).
- `pnpm format` — runs eslint --fix + prettier --write across the project.

## Subpages

In-progress changes go on a subpage so your live profile stays clean: `/your.handle/p/<page>/edit` (any `<page>` other than `edit` or `api`). Login redirects to the main page — navigate to the subpage URL manually.

## AI-assisted PRs

Welcome — please:

- Keep diffs minimal; no unrelated cleanup or verbose code
- Test light/dark, colored cards, edit/view, desktop and both mobile modes (screen-size and `pointer: coarse`)
