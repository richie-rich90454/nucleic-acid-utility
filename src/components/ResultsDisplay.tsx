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
            return seq;
        }
        return seq.split("").map((base: string, i: number)=>{
            let color=codonTableRef.current.getBaseColor(base);
            return <span key={i} className={"dna-pill "+base}>{base}</span>;
        });
    }

    function renderBaseNames(seq: string){
        if (!props.showBaseNames){
            return null;
        }
        let names=codonTableRef.current.getBaseNames(seq);
        return <div className="base-names" style={{marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)"}}>{names}</div>;
    }

    function handleCopySection(label: string, text: string){
        clipboardRef.current.copyText(text).then((success: boolean)=>{
            if (success){
                showToast(label+" copied to clipboard!");
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
            <div>
                <strong>{label}:</strong>
                <button type="button" className="inline-copy-btn" onClick={()=>handleCopySection(label, output)}>Copy</button>
                <div style={{marginTop: "0.5rem"}}>{renderColorizedSequence(output)}</div>
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
            <div>
                <strong>Protein:</strong>
                <button type="button" className="inline-copy-btn" onClick={()=>handleCopySection("Protein", proteinText)}>Copy</button>
                <table>
                    <thead>
                        <tr>
                            <th>Codon</th>
                            <th>tRNA Anticodon</th>
                            <th>Amino Acid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proteinResult.codons.map((cr: CodonResult, i: number)=>(
                            <tr key={i}>
                                <td>{cr.codon}</td>
                                <td>{cr.anticodon}</td>
                                <td>
                                    <span className="amino-dot" style={{background: codonTableRef.current.aminoAcidColors[cr.aminoAcid]}}></span>
                                    {cr.aminoAcid}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {proteinResult.incomplete&&(
                    <div style={{marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)"}}>
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
            showToast("Results copied to clipboard!");
        }
        else{
            showToast("Failed to copy results.");
        }
    }

    async function handleShareUrl(){
        let success=await clipboardRef.current.copyShareUrl(props.sequence, props.conversionType, urlHandlerRef.current);
        if (success){
            showToast("Share URL copied to clipboard!");
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
            <div id="results-container">
                {hasSequence&&!hasError?(
                    <div id="result">
                        {isProtein?renderProteinResult():renderSequenceResult()}
                    </div>
                ):!hasSequence?(
                    <div className="results-placeholder">
                        <span style={{color: "var(--muted)", fontSize: "0.95rem"}}>Results will appear here</span>
                    </div>
                ):null}
                <div id="error" role="alert" style={{display: hasError?"block":"none"}} className={errorShake?"error-shake":""}>
                    {error}
                </div>
            </div>
            {hasSequence&&!hasError&&(
                <div className="footer-controls">
                    <button type="button" className="footer-btn" onClick={handleCopyResults}>Copy Results</button>
                    <button type="button" className="footer-btn" onClick={handleShareUrl} title="Copies a shareable link to clipboard">Share URL</button>
                    <button type="button" className="footer-btn" onClick={handleResetAll}>Reset All</button>
                </div>
            )}
        </div>
    );
}
