import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

const base = process.env.BASE || "/";

export default defineConfig({
    base,
    plugins:[
        react(),
        legacy({
            targets: ["chrome >= 23", "safari >= 6", "ie >= 11"],
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
            modernPolyfills: true,
        }),
    ],
    build:{
        outDir:"dist",
        sourcemap:false,
        minify:"terser",
    },
    server:{
        port:6001,
    },
    preview:{
        port:6001,
    },
});
