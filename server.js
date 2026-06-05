import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyCompress from "@fastify/compress";
import fastifyRateLimit from "@fastify/rate-limit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fastify = Fastify({ logger: false });
const PORT = 6001;
const distDir = path.join(__dirname, "dist");
const docsDir = path.join(__dirname, "docs/.vitepress/dist");

fastify.register(fastifyStatic, {
    root: distDir,
    prefix: "/",
    maxAge: "1y",
    immutable: true,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
        }
    },
    decorateReply: false
});

if (fs.existsSync(docsDir)) {
    fastify.register(fastifyStatic, {
        root: docsDir,
        prefix: "/docs/",
        maxAge: "1y",
        immutable: true,
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".html")) {
                res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
            }
        },
        decorateReply: false
    });
}

fastify.register(fastifyCompress);
fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute"
});

const indexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
let docsIndexHtml = "";
if (fs.existsSync(path.join(docsDir, "index.html"))) {
    docsIndexHtml = fs.readFileSync(path.join(docsDir, "index.html"), "utf-8");
}

fastify.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith("/docs")) {
        if (docsIndexHtml) {
            reply.code(200).type("text/html").send(docsIndexHtml);
            return;
        }
    }
    reply.code(200).type("text/html").send(indexHtml);
});

fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    reply.code(500).type("text/plain").send(`Server error: ${error.message}`);
});

const start = async () => {
    try {
        await fastify.listen({ port: PORT, host: "::" });
        console.log(`Server running at http://localhost:${PORT}`);
    }
    catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};
start();
