export interface BaseStat{
    count: number;
    pct: number;
}

export interface SequenceStatsResult{
    length: number;
    gcContent: number;
    baseComposition: Record<string, BaseStat>;
    molecularWeight: number;
    meltingTemp: number|null;
    codonCount: number;
    stopCodons: number;
}

const DNA_MW: Record<string, number>={A: 331.2, T: 322.2, G: 347.2, C: 307.2};
const RNA_MW: Record<string, number>={A: 347.2, U: 324.2, G: 363.2, C: 323.2};
const PHOSPHODIESTER=17.01;
const STOP_CODONS=new Set(["UAA", "UAG", "UGA"]);

export class SequenceAnalyzer{
    analyze(sequence: string, type: "DNA"|"RNA"): SequenceStatsResult{
        let seq=sequence.toUpperCase().replace(/\s/g, "");
        let length=seq.length;
        let gcContent=this.computeGCContent(seq);
        let baseComposition=this.computeBaseComposition(seq);
        let molecularWeight=this.computeMolecularWeight(seq, type);
        let meltingTemp=type==="DNA"?this.computeMeltingTemp(seq):null;
        let codonInfo=this.countCodons(seq, type);
        return{
            length,
            gcContent,
            baseComposition,
            molecularWeight,
            meltingTemp,
            codonCount: codonInfo.total,
            stopCodons: codonInfo.stops
        };
    }

    computeGCContent(sequence: string): number{
        let seq=sequence.toUpperCase();
        let gc=0;
        for (let base of seq){
            if (base==="G"||base==="C") gc++;
        }
        return seq.length>0?Math.round((gc/seq.length)*10000)/100:0;
    }

    computeBaseComposition(sequence: string): Record<string, BaseStat>{
        let seq=sequence.toUpperCase();
        let counts: Record<string, number>={};
        for (let base of seq){
            counts[base]=(counts[base]||0)+1;
        }
        let composition: Record<string, BaseStat>={};
        for (let base in counts){
            composition[base]={
                count: counts[base],
                pct: Math.round((counts[base]/seq.length)*10000)/100
            };
        }
        return composition;
    }

    computeMolecularWeight(sequence: string, type: "DNA"|"RNA"): number{
        let seq=sequence.toUpperCase();
        let mwTable=type==="DNA"?DNA_MW:RNA_MW;
        let total=0;
        for (let base of seq){
            total+=mwTable[base]||0;
        }
        if (seq.length>1){
            total-=(seq.length-1)*PHOSPHODIESTER;
        }
        return Math.round(total*10)/10;
    }

    computeMeltingTemp(sequence: string): number|null{
        let seq=sequence.toUpperCase();
        if (seq.length===0) return null;
        let a=0, t=0, g=0, c=0;
        for (let base of seq){
            if (base==="A") a++;
            else if (base==="T") t++;
            else if (base==="G") g++;
            else if (base==="C") c++;
        }
        let len=a+t+g+c;
        if (len===0) return null;
        if (len<14){
            return Math.round((2*(a+t)+4*(g+c))*10)/10;
        }
        return Math.round((64.9+41*(g+c-16.4)/len)*10)/10;
    }

    countCodons(sequence: string, type: "DNA"|"RNA"): {total: number; stops: number}{
        let seq=sequence.toUpperCase();
        let rna=type==="DNA"?this.dnaToRna(seq):seq;
        let total=0;
        let stops=0;
        for (let i=0;i+2<rna.length;i+=3){
            let codon=rna.slice(i, i+3);
            if (codon.length===3){
                total++;
                if (STOP_CODONS.has(codon)) stops++;
            }
        }
        return{total, stops};
    }

    private dnaToRna(dna: string): string{
        return dna.replace(/T/g, "U");
    }
}
