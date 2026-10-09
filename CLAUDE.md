# mojo4k.uk

Static site for MOJO 4K (UK IPTV), built with `node build.mjs` into `dist/` and deployed on Cloudflare Pages from `main`.

## Standing rules

- **Blacklisted URLs:** never create a page at, link to, or redirect to any path in `blacklistedPaths` (`src/site.mjs`). The homepage is `/uk/`; `/` only redirects to it. The build enforces this.
- **Audience:** British English, UK-first content, prices in GBP, en-GB locale.
- Commit the rebuilt `dist/` with every change and push to `main`.
