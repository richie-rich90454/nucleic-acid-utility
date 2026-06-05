import { ConversionType } from "../types";
export class SequenceConverter{
    MAP_DNA_COMPLEMENT: {[key: string]: string};
    MAP_RNA_COMPLEMENT: {[key: string]: string};
    MAP_DNA_TRANSCRIPT: {[key: string]: string};
    constructor(){
        this.MAP_DNA_COMPLEMENT={A: "T", T: "A", C: "G", G: "C"};
        this.MAP_RNA_COMPLEMENT={A: "U", U: "A", C: "G", G: "C"};
        this.MAP_DNA_TRANSCRIPT={A: "U", T: "A", C: "G", G: "C"};
    }
    mapSequence(sequence: string, map: {[key: string]: string}): string{
        if (!sequence) return "";
        let out="";
        for (let i=0;i<sequence.length;i++){
            out+=map[sequence[i]]||sequence[i];
        }
        return out;
    }
    getDNAComplement(seq: string): string{
        return this.mapSequence(seq, this.MAP_DNA_COMPLEMENT);
    }
    getRNAComplement(seq: string): string{
        return this.mapSequence(seq, this.MAP_RNA_COMPLEMENT);
    }
    getRNATranscriptFromDNA(seq: string): string{
        return this.mapSequence(seq, this.MAP_DNA_TRANSCRIPT);
    }
    getDNAReverseComplement(seq: string): string{
        return this.mapSequence(seq, this.MAP_DNA_COMPLEMENT).split("").reverse().join("");
    }
    getOutputSequence(sequence: string, conversionType: ConversionType): string{
        if (conversionType=="DNA_COMPLEMENT"){
            return this.getDNAComplement(sequence);
        }
        if (conversionType=="RNA_COMPLEMENT"){
            return this.getRNAComplement(sequence);
        }
        if (conversionType=="DNA_TRANSCRIPT"){
            return this.getRNATranscriptFromDNA(sequence);
        }
        if (conversionType=="DNA_REVERSE_COMPLEMENT"){
            return this.getDNAReverseComplement(sequence);
        }
        return "";
    }
    getLabel(conversionType: ConversionType): string{
        if (conversionType=="DNA_COMPLEMENT") return "Complement DNA";
        if (conversionType=="RNA_COMPLEMENT") return "Complement RNA";
        if (conversionType=="DNA_TRANSCRIPT") return "RNA Transcript";
        if (conversionType=="DNA_REVERSE_COMPLEMENT") return "Reverse Complement DNA";
        return "";
    }
    isDNAType(type: ConversionType): boolean{
        return type.startsWith("DNA");
    }
    isRNAType(type: ConversionType): boolean{
        return type.startsWith("RNA");
    }
}
