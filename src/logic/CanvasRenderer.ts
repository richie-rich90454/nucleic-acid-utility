import { ConversionType } from "../types";
import { CodonTable } from "./CodonTable";
import { SequenceConverter } from "./SequenceConverter";
export class CanvasRenderer{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private codonTable: CodonTable;
    private converter: SequenceConverter;
    private tooltipHandler: ((e: MouseEvent)=>void)|null;
    private mouseOutHandler: ((e: MouseEvent)=>void)|null;
    constructor(canvas: HTMLCanvasElement, codonTable: CodonTable){
        this.canvas=canvas;
        this.ctx=canvas.getContext("2d")!;
        this.codonTable=codonTable;
        this.converter=new SequenceConverter();
        this.tooltipHandler=null;
        this.mouseOutHandler=null;
    }
    drawVisualization(sequence: string, conversionType: ConversionType): void{
        let baseWidth=40;
        let baseHeight=20;
        let padding=20;
        let width=Math.min(sequence.length*baseWidth+2*padding, window.innerWidth-40);
        let height=conversionType.includes("PROTEIN")?150:180;
        let dpr=window.devicePixelRatio||1;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.style.width=width+"px";
        this.canvas.style.height=height+"px";
        this.canvas.width=Math.round(width*dpr);
        this.canvas.height=Math.round(height*dpr);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        let rnaSequence: string|null=null;
        if (conversionType=="RNA_PROTEIN"){
            rnaSequence=sequence;
        }
        else if (conversionType=="DNA_PROTEIN"){
            rnaSequence=this.converter.getRNATranscriptFromDNA(sequence);
        }
        if (conversionType.includes("PROTEIN")){
            this.drawPolypeptideChain(rnaSequence||"", width, height, padding);
        }
        else{
            this.drawAntiparallelStrands(sequence, conversionType, width, height, padding);
        }
    }
    drawAntiparallelStrands(sequence: string, conversionType: ConversionType, width: number, height: number, padding: number): void{
        let baseWidth=40;
        let baseHeight=20;
        let yCenter=height/2;
        let complement="";
        if (conversionType=="DNA_COMPLEMENT"){
            complement=this.converter.getDNAComplement(sequence);
        }
        else if (conversionType=="DNA_REVERSE_COMPLEMENT"){
            complement=this.converter.getDNAReverseComplement(sequence);
        }
        else if (conversionType=="RNA_COMPLEMENT"){
            complement=this.converter.getRNAComplement(sequence);
        }
        else if (conversionType=="DNA_TRANSCRIPT"){
            complement=this.converter.getRNATranscriptFromDNA(sequence);
        }
        this.canvas.setAttribute("aria-label", `Antiparallel strands: ${sequence} paired with ${complement}`);
        this.drawStrand(sequence, padding, yCenter-40, baseWidth, baseHeight, "top", conversionType);
        this.drawStrand(complement, padding, yCenter+40, baseWidth, baseHeight, "bottom", conversionType);
        for (let i=0;i<sequence.length;i++){
            let x=padding+i*baseWidth+baseWidth/2;
            this.ctx.beginPath();
            this.ctx.moveTo(x, yCenter-40+baseHeight);
            this.ctx.lineTo(x, yCenter+40);
            this.ctx.strokeStyle="#CED4DA";
            this.ctx.lineWidth=1;
            this.ctx.stroke();
        }
        this.ctx.fillStyle="#6C757D";
        this.ctx.font="12px Noto Sans";
        this.ctx.textAlign="center";
        this.ctx.textBaseline="middle";
    }
    drawStrand(sequence: string, startX: number, startY: number, baseWidth: number, baseHeight: number, strandType: string, conversionType: ConversionType): void{
        let isTop=strandType=="top";
        for (let i=0;i<sequence.length;i++){
            let x=startX+i*baseWidth;
            let y=startY;
            let base=sequence[i]||"";
            this.ctx.fillStyle=this.codonTable.getBaseColor(base);
            this.ctx.fillRect(x, y, baseWidth, baseHeight);
            this.ctx.strokeStyle="#343A40";
            this.ctx.lineWidth=1;
            this.ctx.strokeRect(x, y, baseWidth, baseHeight);
            this.ctx.fillStyle="#FFFFFF";
            this.ctx.font="bold 14px Noto Sans";
            this.ctx.textAlign="center";
            this.ctx.textBaseline="middle";
            this.ctx.fillText(base, x+baseWidth/2, y+baseHeight/2);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y+(isTop?0:baseHeight));
            this.ctx.lineTo(x+baseWidth, y+(isTop?0:baseHeight));
            this.ctx.strokeStyle="#495057";
            this.ctx.lineWidth=3;
            this.ctx.stroke();
        }
    }
    drawPolypeptideChain(rnaSequence: string, width: number, height: number, padding: number): void{
        let aminoAcidRadius=25;
        let spacing=60;
        let startX=padding+aminoAcidRadius;
        let startY=height/2;
        let codons: {codon: string; aminoAcid: string; color: string; x: number; y: number}[]=[];
        let aminoAcidNames: string[]=[];
        for (let i=0;i<rnaSequence.length;i+=3){
            let codon=rnaSequence.slice(i, i+3);
            if (codon.length==3){
                let aminoAcid=this.codonTable.codonTable[codon]||"Unknown";
                if (aminoAcid=="Stop"){
                    break;
                }
                aminoAcidNames.push(aminoAcid);
                codons.push({
                    codon: codon,
                    aminoAcid: aminoAcid,
                    color: this.codonTable.aminoAcidColors[aminoAcid]||"#6C757D",
                    x: startX+codons.length*spacing,
                    y: startY
                });
            }
        }
        this.ctx.beginPath();
        for (let i=0;i<codons.length-1;i++){
            let curr=codons[i];
            let next=codons[i+1];
            this.ctx.moveTo(curr.x+aminoAcidRadius, curr.y);
            this.ctx.lineTo(next.x-aminoAcidRadius, next.y);
        }
        this.ctx.strokeStyle="#495057";
        this.ctx.lineWidth=2;
        this.ctx.stroke();
        this.cleanup();
        let self=this;
        function handleMouseMove(e: MouseEvent){
            let rect=self.canvas.getBoundingClientRect();
            let mouseX=(e.clientX-rect.left);
            let mouseY=(e.clientY-rect.top);
            let tooltipEl=document.querySelector(".amino-acid-tooltip") as HTMLElement|null;
            if (!tooltipEl) return;
            let tooltipShown=false;
            for (let c of codons){
                let distance=Math.sqrt((mouseX-c.x)**2+(mouseY-c.y)**2);
                if (distance<aminoAcidRadius){
                    tooltipEl.textContent=`${c.aminoAcid} (${c.codon})`;
                    tooltipEl.style.left=e.pageX+10+"px";
                    tooltipEl.style.top=e.pageY-30+"px";
                    tooltipEl.style.display="block";
                    tooltipShown=true;
                    break;
                }
            }
            if (!tooltipShown){
                tooltipEl.style.display="none";
            }
        }
        function handleMouseOut(){
            let tooltipEl=document.querySelector(".amino-acid-tooltip") as HTMLElement|null;
            if (tooltipEl){
                tooltipEl.style.display="none";
            }
        }
        this.tooltipHandler=handleMouseMove;
        this.mouseOutHandler=handleMouseOut;
        this.canvas.addEventListener("mousemove", handleMouseMove);
        this.canvas.addEventListener("mouseout", handleMouseOut);
        this.canvas.setAttribute("aria-label", `Polypeptide chain: ${aminoAcidNames.join(", ")}`);
        for (let codon of codons){
            let{x, y, color, aminoAcid}=codon;
            this.ctx.beginPath();
            this.ctx.arc(x, y, aminoAcidRadius, 0, Math.PI*2);
            this.ctx.fillStyle=color;
            this.ctx.fill();
            this.ctx.strokeStyle="#343A40";
            this.ctx.lineWidth=1;
            this.ctx.stroke();
            let abbr=aminoAcid.substring(0, 3);
            this.ctx.fillStyle="#FFFFFF";
            this.ctx.font="bold 12px Noto Sans";
            this.ctx.textAlign="center";
            this.ctx.textBaseline="middle";
            this.ctx.fillText(abbr, x, y);
        }
    }
    getAriaLabel(sequence: string, conversionType: ConversionType): string{
        if (conversionType.includes("PROTEIN")){
            let rnaSequence: string;
            if (conversionType=="RNA_PROTEIN"){
                rnaSequence=sequence;
            }
            else{
                rnaSequence=this.converter.getRNATranscriptFromDNA(sequence);
            }
            let names: string[]=[];
            for (let i=0;i<rnaSequence.length;i+=3){
                let codon=rnaSequence.slice(i, i+3);
                if (codon.length==3){
                    let aminoAcid=this.codonTable.codonTable[codon]||"Unknown";
                    if (aminoAcid=="Stop") break;
                    names.push(aminoAcid);
                }
            }
            return `Polypeptide chain: ${names.join(", ")}`;
        }
        else{
            let complement=this.converter.getOutputSequence(sequence, conversionType);
            return `Antiparallel strands: ${sequence} paired with ${complement}`;
        }
    }
    cleanup(): void{
        if (this.tooltipHandler){
            this.canvas.removeEventListener("mousemove", this.tooltipHandler);
        }
        if (this.mouseOutHandler){
            this.canvas.removeEventListener("mouseout", this.mouseOutHandler);
        }
        this.tooltipHandler=null;
        this.mouseOutHandler=null;
    }
}
