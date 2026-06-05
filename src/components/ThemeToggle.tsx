import React, {useState, useEffect, useRef} from "react";
import {ThemeManager} from "../logic/ThemeManager";
import {ThemeMode} from "../types";
export default function ThemeToggle(){
    let managerRef=useRef(new ThemeManager());
    let [icon, setIcon]=useState<string>("&#9790;");
    useEffect(()=>{
        managerRef.current.init();
        setIcon(managerRef.current.getIcon());
    }, []);
    function handleToggle(){
        managerRef.current.toggle();
        setIcon(managerRef.current.getIcon());
    }
    return (
        <button id="theme-toggle" className="theme-toggle" aria-label="Toggle dark/light mode" title="Toggle dark/light mode" onClick={handleToggle}>
            <span dangerouslySetInnerHTML={{__html: icon}} />
        </button>
    );
}