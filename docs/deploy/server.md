# Server Configuration

The production server is a Fastify-based application defined in `server.js` at the project root.

## Stack

| Component | Package | Purpose |
|-----------|---------|---------|
| HTTP server | `fastify` | Core framework |
| Static files | `@fastify/static` | Serves the `dist/` directory |
| Compression | `@fastify/compress` | gzip and brotli encoding |
| Rate limiting | `@fastify/rate-limit` | Request throttling |

## Static File Serving

The `dist/` directory is served from the root path (`/`) with the following caching behavior:

| File Type | Cache-Control | Rationale |
|-----------|---------------|-----------|
| Hashed assets (JS, CSS) | `immutable`, `max-age=1y` | Filenames include content hashes, so content changes produce a new URL |
| HTML files | `public, max-age=3600, must-revalidate` | HTML references hashed assets but must be rechecked periodically |

## Compression

`@fastify/compress` is registered to provide automatic gzip and brotli compression for text-based responses. This reduces network transfer size for HTML, CSS, and JavaScript files.

## Rate Limiting

`@fastify/rate-limit` is configured with:

- **Maximum**: 100 requests per minute per client

This protects the server from abuse without affecting normal usage patterns.

## SPA Fallback

Unmatched routes return `index.html` with a `200` status code. This enables client-side routing for URL parameter deep links (e.g., `?dna_dna=ATGC`). Without this fallback, direct navigation to a URL with query parameters would result in a 404.

## Port

The server listens on port `6001` by default. This can be overridden with the `PORT` environment variable:

```bash
PORT=3000 npm start
```

The server binds to `::` (all IPv4 and IPv6 interfaces).

## Reverse Proxy

For production deployments, a reverse proxy is recommended to provide HTTPS termination. Common choices include:

- **Nginx** -- configure as a reverse proxy with SSL certificates
- **Cloudflare** -- enable the proxy toggle on DNS records for automatic TLS

A typical Nginx configuration:

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:6001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
