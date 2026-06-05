import React, {useState, useEffect, useRef, useCallback} from "react";
import {ConversionType} from "../types";
import {SequenceConverter} from "../logic/SequenceConverter";
import {CodonTable} from "../logic/CodonTable";
import {SequenceValidator} from "../logic/SequenceValidator";
import {UrlHandler} from "../logic/UrlHandler";
import {ClipboardManager} from "../logic/ClipboardManager";
import {ThemeManager} from "../logic/ThemeManager";
import SequenceInput from "./SequenceInput";
import ResultsDisplay from "./ResultsDisplay";
import StructureVisualizer from "./StructureVisualizer";
import AboutSection from "./AboutSection";
import {showToast} from "../utils/toast";
export default function NucleicAcidUtility(){
    let [sequence, setSequence]=useState<string>("");
    let [conversionType, setConversionType]=useState<ConversionType>("DNA_COMPLEMENT");
    let [showBaseNames, setShowBaseNames]=useState<boolean>(true);
    let [colorize, setColorize]=useState<boolean>(true);
    let converter=useRef(new SequenceConverter());
    let codonTable=useRef(new CodonTable());
    let validator=useRef(new SequenceValidator());
    let urlHandler=useRef(new UrlHandler());
    let clipboard=useRef(new ClipboardManager());
    let themeManager=useRef(new ThemeManager());
    let resetApplication=useCallback(()=>{
        setSequence("");
        setConversionType("DNA_COMPLEMENT");
        setShowBaseNames(true);
        setColorize(true);
    }, []);
    useEffect(()=>{
        themeManager.current.init();
        let parsed=urlHandler.current.parseUrlParams();
        if (parsed){
            setSequence(parsed.sequence);
            setConversionType(parsed.conversionType);
        }
        if ("serviceWorker" in navigator){
            navigator.serviceWorker.register("/sw.js").catch(()=>{});
        }
        function handleKeyDown(e: KeyboardEvent){
            if (e.ctrlKey&&e.key=="Enter"){
                e.preventDefault();
            }
            else if (e.ctrlKey&&e.shiftKey&&e.key=="C"){
                e.preventDefault();
            }
            else if (e.ctrlKey&&e.key=="Backspace"){
                e.preventDefault();
                resetApplication();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <div className="nucleic-acid-utility">
            <SequenceInput
                sequence={sequence}
                conversionType={conversionType}
                onSequenceChange={setSequence}
                onConversionTypeChange={setConversionType}
                showBaseNames={showBaseNames}
                colorize={colorize}
                onShowBaseNamesChange={setShowBaseNames}
                onColorizeChange={setColorize}
            />
            <ResultsDisplay
                sequence={sequence}
                conversionType={conversionType}
                showBaseNames={showBaseNames}
                colorize={colorize}
            />
            <StructureVisualizer
                sequence={sequence}
                conversionType={conversionType}
            />
            <AboutSection />
        </div>
    );
}
