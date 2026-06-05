import React, {useRef, useEffect, useState} from "react";
import {ConversionType} from "../types";
import {CanvasRenderer} from "../logic/CanvasRenderer";
import {CodonTable} from "../logic/CodonTable";
interface StructureVisualizerProps{
    sequence: string;
    conversionType: ConversionType;
}
export default function StructureVisualizer(props: StructureVisualizerProps){
    let canvasRef=useRef<HTMLCanvasElement>(null);
    let rendererRef=useRef<CanvasRenderer|null>(null);
    let codonTableRef=useRef(new CodonTable());
    let [tooltip, setTooltip]=useState<{text: string; x: number; y: number}|null>(null);
    let [visible, setVisible]=useState<boolean>(false);
    let [title, setTitle]=useState<string>("");
    let [ariaLabel, setAriaLabel]=useState<string>("");
    useEffect(()=>{
        if (!canvasRef.current) return;
        if (!rendererRef.current){
            rendererRef.current=new CanvasRenderer(canvasRef.current, codonTableRef.current);
        }
        if (props.sequence){
            rendererRef.current.drawVisualization(props.sequence, props.conversionType);
            setAriaLabel(rendererRef.current.getAriaLabel(props.sequence, props.conversionType));
            setVisible(true);
            if (props.conversionType.includes("PROTEIN")){
                setTitle("Polypeptide Chain Visualization");
            }
            else{
                setTitle("Antiparallel Strands Visualization");
            }
        }
        else{
            setVisible(false);
        }
        return ()=>{
            rendererRef.current?.cleanup();
        };
    }, [props.sequence, props.conversionType]);
    if (!visible) return null;
    return (
        <div id="visualizer-container" style={{display: "block"}}>
            <div id="visualizer-title">{title}</div>
            <canvas id="sequence-visualizer" ref={canvasRef} role="img" aria-label={ariaLabel}>
                <span className="sr-only">Sequence visualization will appear here after conversion</span>
            </canvas>
            <div className="amino-acid-tooltip" style={tooltip?{display: "block", left: tooltip.x, top: tooltip.y}:{display: "none"}}>
                {tooltip?.text}
            </div>
        </div>
    );
}
