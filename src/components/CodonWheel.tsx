import React, {useState, useRef} from "react";
import {CodonTable} from "../logic/CodonTable";

const BASES=["U", "C", "A", "G"];

export default function CodonWheel(){
    let codonTableRef=useRef(new CodonTable());
    let [base1, setBase1]=useState<string|null>(null);
    let [base2, setBase2]=useState<string|null>(null);
    let [base3, setBase3]=useState<string|null>(null);

    function handleBase1Click(b: string){
        setBase1(b);
        setBase2(null);
        setBase3(null);
    }

    function handleBase2Click(b: string){
        setBase2(b);
        setBase3(null);
    }

    function handleBase3Click(b: string){
        setBase3(b);
    }

    function handleReset(){
        setBase1(null);
        setBase2(null);
        setBase3(null);
    }

    let codon=base1&&base2&&base3?base1+base2+base3:null;
    let aminoAcid=codon?codonTableRef.current.codonTable[codon]||"Unknown":null;
    let aminoColor=aminoAcid?codonTableRef.current.aminoAcidColors[aminoAcid]:null;

    let size=320;
    let cx=size/2;
    let cy=size/2;
    let r1=55;
    let r2=95;
    let r3=140;
    let r4=155;

    function polarToCart(angle: number, radius: number): {x: number; y: number}{
        let rad=(angle-90)*Math.PI/180;
        return{x: cx+radius*Math.cos(rad), y: cy+radius*Math.sin(rad)};
    }

    function describeArc(startAngle: number, endAngle: number, innerR: number, outerR: number): string{
        let s1=polarToCart(startAngle, innerR);
        let s2=polarToCart(endAngle, innerR);
        let e1=polarToCart(startAngle, outerR);
        let e2=polarToCart(endAngle, outerR);
        let largeArc=endAngle-startAngle>180?1:0;
        return `M ${s1.x} ${s1.y} A ${innerR} ${innerR} 0 ${largeArc} 1 ${s2.x} ${s2.y} L ${e2.x} ${e2.y} A ${outerR} ${outerR} 0 ${largeArc} 0 ${e1.x} ${e1.y} Z`;
    }

    function renderInnerRing(){
        let segments: React.ReactElement[]=[];
        for (let i=0;i<4;i++){
            let base=BASES[i];
            let startAngle=i*90;
            let endAngle=(i+1)*90;
            let isActive=base1===base;
            let isDimmed=base1!==null&&!isActive;
            let path=describeArc(startAngle, endAngle, r1, r2);
            let midAngle=(startAngle+endAngle)/2;
            let labelPos=polarToCart(midAngle, (r1+r2)/2);
            segments.push(
                <g key={`inner-${base}`} onClick={()=>handleBase1Click(base)} style={{cursor: "pointer"}}>
                    <path d={path} fill={isActive?"var(--primary)":isDimmed?"var(--border)":"var(--surface-alt)"} stroke="var(--border)" strokeWidth="1"/>
                    <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="800" fill={isActive?"var(--on-primary)":"var(--text)"} style={{pointerEvents: "none"}}>{base}</text>
                </g>
            );
        }
        return segments;
    }

    function renderMiddleRing(){
        if (!base1) return null;
        let base1Idx=BASES.indexOf(base1);
        let base1Start=base1Idx*90;
        let segments: React.ReactElement[]=[];
        for (let i=0;i<4;i++){
            let base=BASES[i];
            let startAngle=base1Start+i*22.5;
            let endAngle=base1Start+(i+1)*22.5;
            let isActive=base2===base;
            let isDimmed=base2!==null&&!isActive;
            let path=describeArc(startAngle, endAngle, r2, r3);
            let midAngle=(startAngle+endAngle)/2;
            let labelPos=polarToCart(midAngle, (r2+r3)/2);
            segments.push(
                <g key={`mid-${base}`} onClick={()=>handleBase2Click(base)} style={{cursor: "pointer"}}>
                    <path d={path} fill={isActive?"var(--tertiary)":isDimmed?"var(--border)":"var(--muted-surface)"} stroke="var(--border)" strokeWidth="1"/>
                    <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill={isActive?"var(--on-primary)":"var(--text)"} style={{pointerEvents: "none"}}>{base}</text>
                </g>
            );
        }
        return segments;
    }

    function renderOuterRing(){
        if (!base1||!base2) return null;
        let base1Idx=BASES.indexOf(base1);
        let base2Idx=BASES.indexOf(base2);
        let base1Start=base1Idx*90;
        let base2Start=base1Start+base2Idx*22.5;
        let segments: React.ReactElement[]=[];
        for (let i=0;i<4;i++){
            let base=BASES[i];
            let startAngle=base2Start+i*5.625;
            let endAngle=base2Start+(i+1)*5.625;
            let codonStr=base1+base2+base;
            let amino=codonTableRef.current.codonTable[codonStr]||"Unknown";
            let color=codonTableRef.current.aminoAcidColors[amino]||"var(--muted)";
            let isActive=base3===base;
            let path=describeArc(startAngle, endAngle, r3, r4);
            let midAngle=(startAngle+endAngle)/2;
            let labelPos=polarToCart(midAngle, (r3+r4)/2);
            segments.push(
                <g key={`outer-${base}`} onClick={()=>handleBase3Click(base)} style={{cursor: "pointer"}}>
                    <path d={path} fill={isActive?color:"var(--surface-alt)"} stroke="var(--border)" strokeWidth="0.5" opacity={isActive?1:0.85}/>
                    <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="700" fill={isActive?"#FFF":"var(--text)"} style={{pointerEvents: "none"}}>{base}</text>
                </g>
            );
        }
        return segments;
    }

    return (
        <div className="codon-wheel-section">
            <details>
                <summary>Codon Wheel</summary>
                <div className="codon-wheel-content">
                    <div className="codon-wheel-container">
                        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="codon-wheel-svg">
                            {renderOuterRing()}
                            {renderMiddleRing()}
                            {renderInnerRing()}
                            <circle cx={cx} cy={cy} r={r1-2} fill="var(--surface)" stroke="var(--border)" strokeWidth="1" onClick={handleReset} style={{cursor: "pointer"}}/>
                            <text x={cx} y={cy-8} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="700" fill="var(--text)" style={{pointerEvents: "none"}}>
                                {codon||"Click"}
                            </text>
                            <text x={cx} y={cy+8} textAnchor="middle" dominantBaseline="central" fontSize="8" fill="var(--muted)" style={{pointerEvents: "none"}}>
                                {aminoAcid||"to start"}
                            </text>
                        </svg>
                    </div>
                    {aminoAcid&&(
                        <div className="codon-wheel-result">
                            <span className="codon-wheel-result-codon mono">{codon}</span>
                            <span className="codon-wheel-result-arrow">→</span>
                            <span className="amino-chip" style={{"--amino-color": aminoColor} as React.CSSProperties}>{aminoAcid}</span>
                        </div>
                    )}
                    <button type="button" className="action-btn" onClick={handleReset} style={{marginTop: ".4rem"}}>Reset</button>
                </div>
            </details>
        </div>
    );
}
