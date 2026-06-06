import React, {useRef, useState, useEffect} from "react";
import {ConversionType, CodonResult, ProteinResult, ValidationResult} from "../types";
import {SequenceConverter} from "../logic/SequenceConverter";
import {CodonTable} from "../logic/CodonTable";
import {SequenceValidator} from "../logic/SequenceValidator";
import {ClipboardManager} from "../logic/ClipboardManager";
import {UrlHandler} from "../logic/UrlHandler";
import {showToast} from "../utils/toast";

interface ResultsDisplayProps{
    sequence: string;
    conversionType: ConversionType;
    showBaseNames: boolean;
    colorize: boolean;
    onReset: ()=> void;
}

let TYPE_LABELS: Record<ConversionType, string>={
    DNA_COMPLEMENT: "Complement",
    DNA_REVERSE_COMPLEMENT: "Rev. Complement",
    DNA_TRANSCRIPT: "Transcription",
    RNA_COMPLEMENT: "Complement",
    RNA_PROTEIN: "Translation",
    DNA_PROTEIN: "Translation"
}
let TYPE_BADGES: Record<ConversionType, string>={
    DNA_COMPLEMENT: "DNA",
    DNA_REVERSE_COMPLEMENT: "DNA",
    DNA_TRANSCRIPT: "DNA→RNA",
    RNA_COMPLEMENT: "RNA",
    RNA_PROTEIN: "RNA→Pro",
    DNA_PROTEIN: "DNA→Pro"
}

export default function ResultsDisplay(props: ResultsDisplayProps){
    let converterRef=useRef(new SequenceConverter());
    let codonTableRef=useRef(new CodonTable());
    let validatorRef=useRef(new SequenceValidator());
    let clipboardRef=useRef(new ClipboardManager());
    let urlHandlerRef=useRef(new UrlHandler());
    let [error, setError]=useState<string>("");
    let [errorShake, setErrorShake]=useState<boolean>(false);

    useEffect(()=>{
        if (props.sequence==""){
            setError("");
            setErrorShake(false);
            return;
        }
        let result: ValidationResult=validatorRef.current.validate(props.sequence, props.conversionType);
        if (!result.valid){
            setError(result.message);
            setErrorShake(true);
            setTimeout(()=>setErrorShake(false), 400);
        }
        else{
            setError("");
            setErrorShake(false);
        }
    }, [props.sequence, props.conversionType]);

    function renderColorizedSequence(seq: string){
        if (!props.colorize){
            return <span className="result-seq-plain">{seq}</span>;
        }
        return seq.split("").map((base: string, i: number)=>{
            return <span key={i} className={"dna-pill "+base}>{base}</span>;
        });
    }

    function renderBaseNames(seq: string){
        if (!props.showBaseNames){
            return null;
        }
        let names=codonTableRef.current.getBaseNames(seq);
        return <div className="base-names">{names}</div>;
    }

    function handleCopySection(label: string, text: string){
        clipboardRef.current.copyText(text).then((success: boolean)=>{
            if (success){
                showToast(label+" copied!");
            }
            else{
                showToast("Failed to copy "+label+".");
            }
        });
    }

    function renderSequenceResult(){
        let output=converterRef.current.getOutputSequence(props.sequence, props.conversionType);
        let label=converterRef.current.getLabel(props.conversionType);
        return (
            <div className="result-block">
                <div className="result-header">
                    <span className="result-type-badge">{TYPE_BADGES[props.conversionType]}</span>
                    <span className="result-label">{label}</span>
                    <button type="button" className="inline-copy-btn" onClick={()=>handleCopySection(label, output)}>Copy</button>
                </div>
                <div className="result-sequence">{renderColorizedSequence(output)}</div>
                {renderBaseNames(output)}
            </div>
        );
    }

    function renderProteinResult(){
        let rnaSequence: string;
        if (props.conversionType=="RNA_PROTEIN"){
            rnaSequence=props.sequence;
        }
        else{
            rnaSequence=converterRef.current.getRNATranscriptFromDNA(props.sequence);
        }
        let proteinResult: ProteinResult=codonTableRef.current.decodeRNAtoProtein(rnaSequence);
        let proteinText=proteinResult.codons.map((cr: CodonResult)=>cr.aminoAcid).join(", ");
        return (
            <div className="result-block">
                <div className="result-header">
                    <span className="result-type-badge">{TYPE_BADGES[props.conversionType]}</span>
                    <span className="result-label">Protein</span>
                    <button type="button" className="inline-copy-btn" onClick={()=>handleCopySection("Protein", proteinText)}>Copy</button>
                </div>
                <div className="protein-summary">
                    {proteinResult.codons.map((cr: CodonResult, i: number)=>(
                        <span key={i} className="amino-chip" style={{"--amino-color": codonTableRef.current.aminoAcidColors[cr.aminoAcid]} as React.CSSProperties}>
                            {cr.aminoAcid}
                        </span>
                    ))}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Codon</th>
                            <th>Anticodon</th>
                            <th>Amino Acid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proteinResult.codons.map((cr: CodonResult, i: number)=>(
                            <tr key={i}>
                                <td className="mono">{cr.codon}</td>
                                <td className="mono">{cr.anticodon}</td>
                                <td>
                                    <span className="amino-dot" style={{background: codonTableRef.current.aminoAcidColors[cr.aminoAcid]}}></span>
                                    {cr.aminoAcid}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {proteinResult.incomplete&&(
                    <div className="incomplete-codon-warning">
                        Incomplete codon: {proteinResult.incomplete}
                    </div>
                )}
            </div>
        );
    }

    function getResultText(): string{
        if (props.conversionType.includes("PROTEIN")){
            let rnaSequence: string;
            if (props.conversionType=="RNA_PROTEIN"){
                rnaSequence=props.sequence;
            }
            else{
                rnaSequence=converterRef.current.getRNATranscriptFromDNA(props.sequence);
            }
            let proteinResult=codonTableRef.current.decodeRNAtoProtein(rnaSequence);
            return proteinResult.codons.map((cr: CodonResult)=>cr.aminoAcid).join(", ");
        }
        else{
            return converterRef.current.getOutputSequence(props.sequence, props.conversionType);
        }
    }

    async function handleCopyResults(){
        let text=getResultText();
        let success=await clipboardRef.current.copyText(text);
        if (success){
            showToast("Results copied!");
        }
        else{
            showToast("Failed to copy results.");
        }
    }

    async function handleShareUrl(){
        let success=await clipboardRef.current.copyShareUrl(props.sequence, props.conversionType, urlHandlerRef.current);
        if (success){
            showToast("Share URL copied!");
        }
        else{
            showToast("Failed to copy share URL.");
        }
    }

    function handleResetAll(){
        props.onReset();
    }

    let isProtein=props.conversionType.includes("PROTEIN");
    let hasError=error!="";
    let hasSequence=props.sequence!="";
    return (
        <div id="results" aria-live="polite">
            {hasSequence&&!hasError&&(
                <div className="input-summary">
                    <span className="input-summary-badge">{props.conversionType.startsWith("RNA")?"RNA":"DNA"}</span>
                    <span className="input-summary-seq">{props.sequence}</span>
                    <span className="input-summary-arrow">→</span>
                    <span className="input-summary-type">{TYPE_LABELS[props.conversionType]}</span>
                </div>
            )}
            <div id="results-container">
                {hasSequence&&!hasError?(
                    <div id="result">
                        {isProtein?renderProteinResult():renderSequenceResult()}
                    </div>
                ):!hasSequence?(
                    <div className="results-placeholder">
                        <span style={{color: "var(--muted)", fontSize: "0.85rem"}}>Results will appear here</span>
                    </div>
                ):null}
                <div id="error" role="alert" style={{display: hasError?"block":"none"}} className={errorShake?"error-shake":""}>
                    {error}
                </div>
            </div>
            {hasSequence&&!hasError&&(
                <div className="footer-controls">
                    <button type="button" className="footer-btn" onClick={handleCopyResults}>Copy</button>
                    <button type="button" className="footer-btn" onClick={handleShareUrl} title="Copies a shareable link to clipboard">Share</button>
                    <button type="button" className="footer-btn" onClick={handleResetAll}>Reset</button>
                </div>
            )}
        </div>
    );
}
