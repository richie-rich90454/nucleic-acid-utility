import { ThemeMode } from "../types";
export class ThemeManager{
    init(): void{
        let saved=localStorage.getItem("theme");
        if (saved){
            document.documentElement.setAttribute("data-theme", saved);
        }
        else{
            let prefersDark=this.isDarkPreferred();
            if (prefersDark){
                document.documentElement.setAttribute("data-theme", "dark");
            }
        }
    }
    toggle(): void{
        let current=this.getCurrent();
        let next: ThemeMode=current==="dark"?"light":"dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    }
    getCurrent(): ThemeMode{
        let attr=document.documentElement.getAttribute("data-theme");
        return (attr==="dark"||attr==="light")?attr:"light";
    }
    isDarkPreferred(): boolean{
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    getIcon(): string{
        let current=this.getCurrent();
        return current==="dark"?"&#9788;":"&#9790;";
    }
}
