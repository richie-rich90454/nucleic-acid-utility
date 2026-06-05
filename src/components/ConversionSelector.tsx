import React from "react";
import {ConversionType} from "../types";
interface ConversionSelectorProps{
    conversionType: ConversionType;
    onChange: (type: ConversionType)=> void;
}
let CONVERSION_OPTIONS: {label: string; value: ConversionType}[]=[
    {label: "DNA → DNA", value: "DNA_COMPLEMENT"},
    {label: "DNA → Rev Comp", value: "DNA_REVERSE_COMPLEMENT"},
    {label: "DNA → RNA", value: "DNA_TRANSCRIPT"},
    {label: "RNA → RNA", value: "RNA_COMPLEMENT"},
    {label: "RNA → Protein", value: "RNA_PROTEIN"},
    {label: "DNA → Protein", value: "DNA_PROTEIN"}
];
export default function ConversionSelector(props: ConversionSelectorProps){
    return (
        <div className="conversion-buttons">
            {CONVERSION_OPTIONS.map((opt)=>(
                <button key={opt.value} type="button" className={"conversion-btn"+(props.conversionType==opt.value?" active":"")} onClick={()=>props.onChange(opt.value)}>{opt.label}</button>
            ))}
        </div>
    );
}
