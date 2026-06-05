import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.BASE || "/";

export default defineConfig({
    base,
    plugins:[react()],
    build:{
        outDir:"dist",
        sourcemap:false,
    },
    server:{
        port:6001,
    },
    preview:{
        port:6001,
    },
});
