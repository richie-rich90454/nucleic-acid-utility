let path=require("path");
let fs=require("fs");
let fastify=require("fastify")({logger: false});
let PORT=6001;
let distDir=path.join(__dirname, "dist");
fastify.register(require("@fastify/static"),{
    root: distDir,
    prefix: "/",
    maxAge: "1y",
    immutable: true,
    setHeaders: (res, filePath)=>{
        if (filePath.endsWith(".html")){
            res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
        }
    }
});
fastify.register(require("@fastify/compress"));
fastify.register(require("@fastify/rate-limit"),{
    max: 100,
    timeWindow: "1 minute"
});
let indexHtml=fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
fastify.setNotFoundHandler((request, reply)=>{
    reply.code(200).type("text/html").send(indexHtml);
});
fastify.setErrorHandler((error, request, reply)=>{
    request.log.error(error);
    reply.code(500).type("text/plain").send(`Server error: ${error.message}`);
});
let start=async()=>{
    try{
        await fastify.listen({port: PORT, host: "::"});
        console.log(`Server running at http://localhost:${PORT}`);
    }
    catch (err){
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};
start();
