import React from "react";
import {ConversionType} from "../types";
interface ConversionSelectorProps{
    conversionType: ConversionType;
    onChange: (type: ConversionType)=> void;
}
interface ConversionOption{
    label: string
    desc: string
    value: ConversionType
}
let DNA_OPTIONS: ConversionOption[]=[
    {label: "Complement", desc: "A↔T, G↔C", value: "DNA_COMPLEMENT"},
    {label: "Reverse Complement", desc: "Flip + complement", value: "DNA_REVERSE_COMPLEMENT"},
    {label: "Transcription", desc: "DNA → mRNA", value: "DNA_TRANSCRIPT"},
    {label: "Translation", desc: "DNA → amino acids", value: "DNA_PROTEIN"}
]
let RNA_OPTIONS: ConversionOption[]=[
    {label: "Complement", desc: "A↔U, G↔C", value: "RNA_COMPLEMENT"},
    {label: "Translation", desc: "mRNA → amino acids", value: "RNA_PROTEIN"}
]
export default function ConversionSelector(props: ConversionSelectorProps){
    return (
        <div className="conversion-buttons" role="radiogroup">
            <div className="conversion-group">
                <div className="conversion-group-label">DNA Conversions</div>
                {DNA_OPTIONS.map((opt)=>(
                    <button key={opt.value} type="button" className={"conversion-btn"+(props.conversionType==opt.value?" active":"")} onClick={()=>props.onChange(opt.value)} aria-pressed={props.conversionType==opt.value}>
                        {opt.label}
                        <span className="conversion-desc">{opt.desc}</span>
                    </button>
                ))}
            </div>
            <div className="conversion-group">
                <div className="conversion-group-label">RNA Conversions</div>
                {RNA_OPTIONS.map((opt)=>(
                    <button key={opt.value} type="button" className={"conversion-btn"+(props.conversionType==opt.value?" active":"")} onClick={()=>props.onChange(opt.value)} aria-pressed={props.conversionType==opt.value}>
                        {opt.label}
                        <span className="conversion-desc">{opt.desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
