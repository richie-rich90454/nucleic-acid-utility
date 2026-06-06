import React, {useRef, useMemo} from "react";
import {ConversionType} from "../types";
import {SequenceAnalyzer, SequenceStatsResult} from "../logic/SequenceAnalyzer";
import {CodonTable} from "../logic/CodonTable";

interface SequenceStatsProps{
    sequence: string;
    conversionType: ConversionType;
}

export default function SequenceStats(props: SequenceStatsProps){
    let analyzerRef=useRef(new SequenceAnalyzer());
    let codonTableRef=useRef(new CodonTable());

    let stats: SequenceStatsResult|null=useMemo(()=>{
        if (!props.sequence) return null;
        let type: "DNA"|"RNA"=props.conversionType.startsWith("RNA")?"RNA":"DNA";
        return analyzerRef.current.analyze(props.sequence, type);
    }, [props.sequence, props.conversionType]);

    if (!stats) return null;

    let baseColors=codonTableRef.current.baseColors;
    let type=props.conversionType.startsWith("RNA")?"RNA":"DNA";

    return (
        <div className="seq-stats">
            <div className="stat-grid">
                <div className="stat-item">
                    <span className="stat-label">Length</span>
                    <span className="stat-value">{stats.length} nt</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">GC Content</span>
                    <span className="stat-value">{stats.gcContent}%</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Mol. Weight</span>
                    <span className="stat-value">{stats.molecularWeight.toLocaleString()} Da</span>
                </div>
                {stats.meltingTemp!==null&&(
                    <div className="stat-item">
                        <span className="stat-label">Tm (approx.)</span>
                        <span className="stat-value">{stats.meltingTemp} °C</span>
                    </div>
                )}
                {stats.codonCount>0&&(
                    <div className="stat-item">
                        <span className="stat-label">Codons</span>
                        <span className="stat-value">{stats.codonCount}{stats.stopCodons>0?` (${stats.stopCodons} stop)`:``}</span>
                    </div>
                )}
            </div>
            <div className="base-composition">
                {Object.entries(stats.baseComposition)
                    .sort((a, b)=>b[1].pct-a[1].pct)
                    .map(([base, info])=>(
                        <div key={base} className="base-bar">
                            <span className="base-bar-label" style={{color: baseColors[base]||"var(--muted)"}}>{base}</span>
                            <div className="base-bar-track">
                                <div
                                    className="base-bar-fill"
                                    style={{
                                        width: `${info.pct}%`,
                                        background: baseColors[base]||"var(--muted)"
                                    }}
                                ></div>
                            </div>
                            <span className="base-bar-pct">{info.pct}%</span>
                            <span className="base-bar-count">({info.count})</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
