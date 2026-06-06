import React, {useState, useEffect, useRef, useCallback} from "react";
import {ConversionType} from "../types";
import {UrlHandler} from "../logic/UrlHandler";
import SequenceInput from "./SequenceInput";
import ResultsDisplay from "./ResultsDisplay";
import StructureVisualizer from "./StructureVisualizer";
import AboutSection from "./AboutSection";
import SequenceStats from "./SequenceStats";
import CodonWheel from "./CodonWheel";
import QuizMode from "./QuizMode";
import {showToast} from "../utils/toast";
export default function NucleicAcidUtility(){
    let [sequence, setSequence]=useState<string>("");
    let [conversionType, setConversionType]=useState<ConversionType>("DNA_COMPLEMENT");
    let [showBaseNames, setShowBaseNames]=useState<boolean>(true);
    let [colorize, setColorize]=useState<boolean>(true);
    let [activeView, setActiveView]=useState<"converter"|"quiz">("converter");
    let urlHandler=useRef(new UrlHandler());
    let resetApplication=useCallback(()=>{
        setSequence("");
        setConversionType("DNA_COMPLEMENT");
        setShowBaseNames(true);
        setColorize(true);
    }, []);
    useEffect(()=>{
        let parsed=urlHandler.current.parseUrlParams();
        if (parsed){
            setSequence(parsed.sequence);
            setConversionType(parsed.conversionType);
        }
        function handleKeyDown(e: KeyboardEvent){
            if (e.ctrlKey&&e.key=="Backspace"){
                e.preventDefault();
                resetApplication();
                showToast("Application reset");
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <div className="nucleic-acid-utility">
            <div className="view-toggle">
                <button
                    type="button"
                    className={`view-toggle-btn ${activeView==="converter"?"active":""}`}
                    onClick={()=>setActiveView("converter")}
                >
                    Converter
                </button>
                <button
                    type="button"
                    className={`view-toggle-btn ${activeView==="quiz"?"active":""}`}
                    onClick={()=>setActiveView("quiz")}
                >
                    Quiz Mode
                </button>
            </div>
            {activeView==="converter"?(
                <>
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
                    <SequenceStats sequence={sequence} conversionType={conversionType} />
                    <ResultsDisplay
                        sequence={sequence}
                        conversionType={conversionType}
                        showBaseNames={showBaseNames}
                        colorize={colorize}
                        onReset={resetApplication}
                    />
                    <StructureVisualizer
                        sequence={sequence}
                        conversionType={conversionType}
                    />
                    <CodonWheel />
                    <AboutSection />
                </>
            ):(
                <QuizMode onClose={()=>setActiveView("converter")} />
            )}
        </div>
    );
}
