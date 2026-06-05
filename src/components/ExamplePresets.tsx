import React from "react";
import {ConversionType} from "../types";
interface ExamplePresetsProps{
    onSelect: (sequence: string, type: ConversionType)=> void;
}
let EXAMPLES: {label: string; sequence: string; type: ConversionType}[]=[
    {label: "TATA Box", sequence: "TATAAA", type: "DNA_COMPLEMENT"},
    {label: "Start Codon", sequence: "AUG", type: "RNA_PROTEIN"},
    {label: "Insulin Fragment", sequence: "ATGGCCCTGTGGATGCGC", type: "DNA_PROTEIN"},
    {label: "p53 Fragment", sequence: "ATGGAGGAGCCGCAGTCA", type: "DNA_PROTEIN"}
];
export default function ExamplePresets(props: ExamplePresetsProps){
    return (
        <div className="button-group">
            {EXAMPLES.map((ex)=>(
                <button key={ex.label} type="button" className="example-btn" onClick={()=>props.onSelect(ex.sequence, ex.type)}>{ex.label}</button>
            ))}
        </div>
    );
}
