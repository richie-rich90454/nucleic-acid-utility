import { CodonResult, ProteinResult } from "../types";
export class CodonTable{
    codonTable: {[key: string]: string};
    aminoAcidColors: {[key: string]: string};
    baseColors: {[key: string]: string};
    private COMPLEMENT_MAP_FOR_ANTICODON: {[key: string]: string};
    constructor(){
        this.codonTable={
            "UUU": "Phenylalanine", "UUC": "Phenylalanine", "UUA": "Leucine", "UUG": "Leucine",
            "CUU": "Leucine", "CUC": "Leucine", "CUA": "Leucine", "CUG": "Leucine",
            "AUU": "Isoleucine", "AUC": "Isoleucine", "AUA": "Isoleucine", "AUG": "Methionine",
            "GUU": "Valine", "GUC": "Valine", "GUA": "Valine", "GUG": "Valine",
            "UCU": "Serine", "UCC": "Serine", "UCA": "Serine", "UCG": "Serine",
            "CCU": "Proline", "CCC": "Proline", "CCA": "Proline", "CCG": "Proline",
            "ACU": "Threonine", "ACC": "Threonine", "ACA": "Threonine", "ACG": "Threonine",
            "GCU": "Alanine", "GCC": "Alanine", "GCA": "Alanine", "GCG": "Alanine",
            "UAU": "Tyrosine", "UAC": "Tyrosine", "UAA": "Stop", "UAG": "Stop",
            "CAU": "Histidine", "CAC": "Histidine", "CAA": "Glutamine", "CAG": "Glutamine",
            "AAU": "Asparagine", "AAC": "Asparagine", "AAA": "Lysine", "AAG": "Lysine",
            "GAU": "Aspartic Acid", "GAC": "Aspartic Acid", "GAA": "Glutamic Acid", "GAG": "Glutamic Acid",
            "UGU": "Cysteine", "UGC": "Cysteine", "UGA": "Stop", "UGG": "Tryptophan",
            "CGU": "Arginine", "CGC": "Arginine", "CGA": "Arginine", "CGG": "Arginine",
            "AGU": "Serine", "AGC": "Serine", "AGA": "Arginine", "AGG": "Arginine",
            "GGU": "Glycine", "GGC": "Glycine", "GGA": "Glycine", "GGG": "Glycine"
        };
        this.aminoAcidColors={
            "Alanine": "#FF6B6B", "Arginine": "#4ECDC4", "Asparagine": "#1A936F",
            "Aspartic Acid": "#6A0572", "Cysteine": "#FFD166", "Glutamic Acid": "#118AB2",
            "Glutamine": "#073B4C", "Glycine": "#EF476F", "Histidine": "#FFD166",
            "Isoleucine": "#06D6A0", "Leucine": "#7209B7", "Lysine": "#3A86FF",
            "Methionine": "#FB5607", "Phenylalanine": "#8338EC", "Proline": "#3A86FF",
            "Serine": "#FF006E", "Threonine": "#FFBE0B", "Tryptophan": "#8AC926",
            "Tyrosine": "#FF9E00", "Valine": "#4361EE"
        };
        this.baseColors={
            "A": "#FF6B6B",
            "T": "#4ECDC4",
            "U": "#1A936F",
            "G": "#FFD166",
            "C": "#6A0572"
        };
        this.COMPLEMENT_MAP_FOR_ANTICODON={
            "A": "U", "U": "A", "G": "C", "C": "G"
        };
    }
    getAnticodon(codon: string): string{
        let anticodon="";
        for (let i=codon.length-1;i>=0;i--){
            anticodon+=this.COMPLEMENT_MAP_FOR_ANTICODON[codon[i]]||codon[i];
        }
        return anticodon;
    }
    decodeRNAtoProtein(rnaSequence: string): ProteinResult{
        let codons: CodonResult[]=[];
        for (let i=0;i<rnaSequence.length;i+=3){
            let codon=rnaSequence.slice(i, i+3);
            if (codon.length==3){
                let anticodon=this.getAnticodon(codon);
                let aminoAcid=this.codonTable[codon]||"Unknown";
                codons.push({ codon: codon, anticodon: anticodon, aminoAcid: aminoAcid });
            }
            else{
                return{codons: codons, incomplete: codon};
            }
        }
        return{codons: codons, incomplete: null};
    }
    getBaseColor(base: string): string{
        return this.baseColors[base]||"#6C757D";
    }
    getBaseName(base: string): string{
        let baseNames: {[key: string]: string}={A: "Adenine", T: "Thymine", U: "Uracil", C: "Cytosine", G: "Guanine"};
        return baseNames[base]||base;
    }
    getBaseNames(sequence: string): string{
        return sequence.split("").map((b: string)=>this.getBaseName(b)).join(", ");
    }
}
