import React from "react";
import NucleicAcidUtility from "./components/NucleicAcidUtility";
import ThemeToggle from "./components/ThemeToggle";
import Toast from "./components/Toast";
import SkipLink from "./components/SkipLink";
import {openUrl} from "@tauri-apps/plugin-opener";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";
export default function App(){
    const handleLinkClick=(e: React.MouseEvent<HTMLAnchorElement>, url: string)=>{
        e.preventDefault();
        const isTauri=typeof window!=="undefined"&&!!(window as any).__TAURI__;
        if (isTauri){
            if (url.startsWith("http://")||url.startsWith("https://")){
                openUrl(url);
            }
            else{
                new WebviewWindow("docs",{
                    url: url,
                    title: "Documentation",
                    width: 1024,
                    height: 768,
                    resizable: true,
                    fullscreen: false,
                    center: true
                });
            }
        }
        else{
            window.open(url,"_blank");
        }
    };
    return (
        <>
            <SkipLink />
            <header>
                <h1>Nucleic Acid Utility</h1>
                <ThemeToggle />
            </header>
            <main id="main">
                <div className="container">
                    <NucleicAcidUtility />
                </div>
            </main>
            <footer id="footer">
                <p>2024-2026 Richard&apos;s Blogs</p>
                <p>Main site: <a href="https://www.richardsblogs.com" onClick={(e)=>handleLinkClick(e,"https://www.richardsblogs.com")}>www.richardsblogs.com</a> | <a href="docs/index.html" onClick={(e)=>handleLinkClick(e,"docs/index.html")}>Documentation</a></p>
            </footer>
            <Toast />
        </>
    );
}