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
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
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
    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="sequence">Input Sequence:</label>
                <input id="sequence" type="text" value={props.sequence} onChange={handleInputChange} placeholder="e.g., ATGC (DNA) or AUGC (RNA)" aria-describedby="error" className={validClass} />
            </div>
            <div id="base-buttons" className="button-group">
                {bases.map((base: string)=>(
                    <button key={base} type="button" className="base-btn" onClick={()=>handleBaseClick(base)}>{base}</button>
                ))}
            </div>
            <div id="sequence-controls" className="button-group">
                <button type="button" className="action-btn" onClick={handleDeleteLast} disabled={props.sequence.length==0}>Delete Last</button>
                <button type="button" className="action-btn" onClick={handleClearAll} disabled={props.sequence.length==0}>Clear All</button>
            </div>
            <div className="form-group">
                <label htmlFor="conversionType">Conversion Type:</label>
                <ConversionSelector conversionType={props.conversionType} onChange={props.onConversionTypeChange} />
                <select id="conversionType" value={props.conversionType} onChange={(e)=>props.onConversionTypeChange(e.target.value as ConversionType)} hidden aria-hidden="true">
                    <option value="DNA_COMPLEMENT">DNA → DNA</option>
                    <option value="DNA_REVERSE_COMPLEMENT">DNA → Rev Comp</option>
                    <option value="DNA_TRANSCRIPT">DNA → RNA</option>
                    <option value="RNA_COMPLEMENT">RNA → RNA</option>
                    <option value="RNA_PROTEIN">RNA → Protein</option>
                    <option value="DNA_PROTEIN">DNA → Protein</option>
                </select>
            </div>
            <div className="form-group">
                <label>Try an Example:</label>
                <ExamplePresets onSelect={handleExampleSelect} />
            </div>
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
