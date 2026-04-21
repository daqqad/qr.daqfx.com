# qr.daqfx.com

Cloudflare Worker that generates QR codes from text. Paste anything into the textarea and instantly get a scannable QR code — useful for sharing snippets, URLs, or notes from desktop to mobile.

Live at **https://qr.daqfx.com**

## How it works

- Single-page app served entirely from a Cloudflare Worker
- QR codes are generated client-side using [qrcodejs](https://github.com/davidshimjs/qrcodejs), bundled inline — no external dependencies or CDN requests
- Error correction level M (15% redundancy), supporting up to **2,331 bytes** of text
- A byte counter shows remaining capacity as you type, warning when approaching the limit

## Deployment

To deploy manually:

```bash
npx wrangler deploy
```

## Project structure

```
src/worker.js   — Worker script (serves the HTML page with inlined QR library)
wrangler.toml   — Cloudflare Worker config (name, account, route)
```
