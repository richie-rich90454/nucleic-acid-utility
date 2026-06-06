import React, {useState, useEffect, useRef} from "react";
import {ThemeManager} from "../logic/ThemeManager";
import {ThemeMode} from "../types";
export default function ThemeToggle(){
    let managerRef=useRef(new ThemeManager());
    let [mode, setMode]=useState<ThemeMode>("light");
    useEffect(()=>{
        managerRef.current.init();
        setMode(managerRef.current.getCurrent());
    }, []);
    function handleToggle(){
        managerRef.current.toggle();
        setMode(managerRef.current.getCurrent());
    }
    return (
        <button id="theme-toggle" className="theme-toggle" aria-label={mode==="dark"?"Switch to light mode":"Switch to dark mode"} title="Toggle dark/light mode" onClick={handleToggle}>
            <span>{mode==="dark"?"☀":"☾"}</span>
        </button>
    );
}
