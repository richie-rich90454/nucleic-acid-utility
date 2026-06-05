import React from "react";
import NucleicAcidUtility from "./components/NucleicAcidUtility";
import ThemeToggle from "./components/ThemeToggle";
import Toast from "./components/Toast";
import SkipLink from "./components/SkipLink";
export default function App(){
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
                <p>2025 Richard&apos;s Blogs</p>
                <p>Main site: <a href="https://www.richardsblogs.com" target="_blank" rel="noopener noreferrer">www.richardsblogs.com</a> | <a href="/docs/" target="_blank" rel="noopener noreferrer">Documentation</a></p>
            </footer>
            <Toast />
        </>
    );
}