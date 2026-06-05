# Production Build

## Build Command

```bash
npm run build
```

This runs `tsc && vite build` -- TypeScript type checking followed by Vite's production build.

## Output Directory

All build artifacts are written to `dist/`.

## Build Output

```
dist/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
```

- `index.html` -- the application entry point
- `assets/index-[hash].js` -- bundled JavaScript with content hash in the filename
- `assets/index-[hash].css` -- bundled stylesheet with content hash in the filename

## Static Assets

Files in the `public/` directory are copied to `dist/` without modification:

- `favicon.png`
- `og-image.png`
- `robots.txt`
- `sitemap.xml`
- `sw.js`

## Content-Hashed Filenames

Vite appends a content hash to asset filenames (e.g., `index-a1b2c3d4.js`). This enables immutable caching: the filename changes only when the file content changes, so browsers and CDNs can cache these assets indefinitely without serving stale content.

## Serving the Build

```bash
npm start
```

This runs `node server.js`, which starts the Fastify production server on port 6001. See [Server Configuration](/deploy/server.md) for details.
