import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import {exec} from "child_process";
import fs from "fs-extra";
import path from "path";
function vitepressBuildPlugin(){
    return {
        name: "vitepress-build",
        apply: "build",
        async closeBundle(){
            console.log("Building VitePress docs...");
            await new Promise<void>((resolve, reject)=>{
                exec("npx vitepress build docs", (error, stdout, stderr)=>{
                    if (error){
                        console.error("VitePress build error: " + error);
                        reject(error);
                        return;
                    }
                    console.log(stdout);
                    console.error(stderr);
                    resolve();
                });
            });
            const sourceDir=path.resolve("docs/.vitepress/dist");
            const destDir=path.resolve("dist/docs");
            await fs.ensureDir(destDir);
            await fs.copy(sourceDir, destDir);
            console.log("VitePress docs copied to " + destDir);
        }
    };
}
const base=process.env.BASE||"/";
export default defineConfig({
    base: base,
    plugins: [
        react(),
        legacy({
            targets: ["chrome >= 23", "safari >= 6", "ie >= 11"],
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
            modernPolyfills: true
        }),
        vitepressBuildPlugin()
    ],
    build: {
        outDir: "dist",
        sourcemap: false,
        minify: "terser"
    },
    server: {
        port: 6001
    },
    preview: {
        port: 6001
    }
});