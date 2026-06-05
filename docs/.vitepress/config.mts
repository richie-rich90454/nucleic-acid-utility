import {defineConfig} from "vitepress";
export default defineConfig({
    title: "Nucleic Acid Utility",
    description: "Interactive DNA/RNA conversion and protein translation tool",
    base: "/docs/",
    vite:{
        server:{
            port:6002,
        },
        preview:{
            port:6002,
        },
    },
    themeConfig:{
        nav:[
            {text: "Home", link: "/"},
            {text: "Guide", link: "/guide/getting-started"},
            {text: "API", link: "/api/overview"},
        ],
        sidebar:[
            {
                text: "Guide",
                items:[
                    {text: "Getting Started", link: "/guide/getting-started"},
                    {text: "Conversion Types", link: "/guide/conversions"},
                    {text: "Visualizations", link: "/guide/visualizations"},
                    {text: "Keyboard Shortcuts", link: "/guide/shortcuts"},
                    {text: "URL Sharing", link: "/guide/sharing"},
                    {text: "Theming", link: "/guide/theming"},
                ],
            },
            {
                text: "API Reference",
                items:[
                    {text: "Overview", link: "/api/overview"},
                    {text: "SequenceConverter", link: "/api/sequence-converter"},
                    {text: "CodonTable", link: "/api/codon-table"},
                    {text: "SequenceValidator", link: "/api/sequence-validator"},
                    {text: "CanvasRenderer", link: "/api/canvas-renderer"},
                    {text: "UrlHandler", link: "/api/url-handler"},
                    {text: "ThemeManager", link: "/api/theme-manager"},
                    {text: "ClipboardManager", link: "/api/clipboard-manager"},
                ],
            },
            {
                text: "Deployment",
                items:[
                    {text: "Production Build", link: "/deploy/production"},
                    {text: "Server Configuration", link: "/deploy/server"},
                ],
            },
        ],
        socialLinks:[
            {icon: "github", link: "https://github.com/richie-rich90454/nucleic-acid-utility"},
        ],
        footer:{
            message: "Released under the MIT License.",
            copyright: "2024-2026 Richard's Blogs",
        },
    },
});
