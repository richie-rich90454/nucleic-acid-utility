import React, {useRef, useState, useEffect} from "react";
import {ConversionType} from "../types";
import {SequenceValidator} from "../logic/SequenceValidator";
import ConversionSelector from "./ConversionSelector";
import ExamplePresets from "./ExamplePresets";
interface SequenceInputProps{
    sequence: string;
    conversionType: ConversionType;
    onSequenceChange: (seq: string)=> void;
    onConversionTypeChange: (type: ConversionType)=> void;
    showBaseNames: boolean;
    colorize: boolean;
    onShowBaseNamesChange: (val: boolean)=> void;
    onColorizeChange: (val: boolean)=> void;
}
export default function SequenceInput(props: SequenceInputProps){
    let validator=useRef(new SequenceValidator());
    let textareaRef=useRef<HTMLTextAreaElement>(null)
    let [validClass, setValidClass]=useState<string>("");
    useEffect(()=>{
        if (props.sequence==""){
            setValidClass("");
        }
        else if (validator.current.isValidRealTime(props.sequence, props.conversionType)){
            setValidClass("input-valid");
        }
        else{
            setValidClass("input-invalid");
        }
    }, [props.sequence, props.conversionType]);
    useEffect(()=>{
        let textarea=textareaRef.current
        if (textarea){
            textarea.style.height="auto"
            let lineHeight=parseInt(getComputedStyle(textarea).lineHeight)||20
            let minRows=2
            let maxRows=6
            let minHeight=lineHeight*minRows
            let maxHeight=lineHeight*maxRows
            textarea.style.height=Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)+"px"
        }
    }, [props.sequence])
    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        props.onSequenceChange(e.target.value.toUpperCase());
    }
    function handleBaseClick(base: string){
        props.onSequenceChange(props.sequence+base);
    }
    function handleDeleteLast(){
        props.onSequenceChange(props.sequence.slice(0, -1));
    }
    function handleClearAll(){
        props.onSequenceChange("");
    }
    function handleExampleSelect(seq: string, type: ConversionType){
        props.onSequenceChange(seq);
        props.onConversionTypeChange(type);
    }
    let bases=validator.current.getBasesForType(props.conversionType);
    let isRnaType=props.conversionType==="RNA_COMPLEMENT"||props.conversionType==="RNA_PROTEIN"
    let placeholder=isRnaType?"e.g., AUGC":"e.g., ATGC"
    let baseCount=props.sequence.length
    let isIncompleteCodon=baseCount>0&&baseCount%3!==0
    function renderCodonAlignment(){
        if (!props.colorize||props.sequence.length===0) return null
        let chars=props.sequence.split("")
        let elements: React.ReactNode[]=chars.map((char, i)=>{
            let group=Math.floor(i/3)
            let posInGroup=i%3
            let sep=null
            if (posInGroup===0&&group>0){
                sep=<span key={`sep-${i}`} className="codon-separator">·</span>
            }
            return <React.Fragment key={i}>{sep}<span>{char}</span></React.Fragment>
        })
        return (
            <div className="codon-alignment" aria-label="Codon alignment display">
                {elements}
            </div>
        )
    }
    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="sequence">
                    Input Sequence: <span className="base-counter">{baseCount>0?`${baseCount} bases`:null}</span>
                    {isIncompleteCodon&&<span className="incomplete-codon"> (incomplete codon)</span>}
                </label>
                <textarea
                    id="sequence"
                    ref={textareaRef}
                    rows={2}
                    value={props.sequence}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    aria-describedby="error"
                    className={validClass}
                />
                {renderCodonAlignment()}
            </div>

            <div className="section-divider"></div>

            <div className="button-group-row">
                <div id="base-buttons" className="button-group">
                    {bases.map((base: string)=>(
                        <button key={base} type="button" className="base-btn" onClick={()=>handleBaseClick(base)} aria-label={`Append base ${base}`}>{base}</button>
                    ))}
                </div>
                <div id="sequence-controls" className="button-group">
                    {props.sequence.length>0&&(
                        <>
                            <button type="button" className="action-btn" onClick={handleDeleteLast}>Delete Last</button>
                            <button type="button" className="action-btn" onClick={handleClearAll}>Clear All</button>
                        </>
                    )}
                </div>
            </div>

            <div className="section-divider"></div>

            <div className="form-group">
                <label htmlFor="conversionType">Conversion Type:</label>
                <ConversionSelector conversionType={props.conversionType} onChange={props.onConversionTypeChange} />
            </div>

            <div className="section-divider"></div>

            <div className="form-group">
                <label>Try an Example:</label>
                <ExamplePresets onSelect={handleExampleSelect} />
            </div>

            <div className="section-divider"></div>

            <div className="form-group">
                <label>
                    <input type="checkbox" checked={props.showBaseNames} onChange={(e)=>props.onShowBaseNamesChange(e.target.checked)} />
                    Show Base Names
                </label>
                <label>
                    <input type="checkbox" checked={props.colorize} onChange={(e)=>props.onColorizeChange(e.target.checked)} />
                    Colorize Sequence
                </label>
            </div>
        </div>
    );
}
