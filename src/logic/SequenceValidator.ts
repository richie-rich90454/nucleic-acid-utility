import { ConversionType, ValidationResult } from "../types";
export class SequenceValidator{
    dnaBases: string[];
    rnaBases: string[];
    constructor(){
        this.dnaBases=["A", "T", "G", "C"];
        this.rnaBases=["A", "U", "G", "C"];
    }
    validate(sequence: string, conversionType: ConversionType): ValidationResult{
        if (sequence=="") return{valid: true, message: ""};
        let useRNA=(conversionType=="RNA_PROTEIN"||conversionType=="RNA_COMPLEMENT");
        if (useRNA){
            if (!/^[AUGC]*$/i.test(sequence)){
                return{valid: false, message: "Invalid RNA sequence. Only A, U, G, C characters are allowed."};
            }
        }
        else{
            if (!/^[ATGC]*$/i.test(sequence)){
                return{valid: false, message: "Invalid DNA sequence. Only A, T, G, C characters are allowed."};
            }
        }
        return{valid: true, message: ""};
    }
    isValidRealTime(sequence: string, conversionType: ConversionType): boolean{
        let useRNA=(conversionType=="RNA_PROTEIN"||conversionType=="RNA_COMPLEMENT");
        if (useRNA){
            return /^[AUGC]*$/i.test(sequence);
        }
        else{
            return /^[ATGC]*$/i.test(sequence);
        }
    }
    getBasesForType(conversionType: ConversionType): string[]{
        if (conversionType.startsWith("DNA")){
            return this.dnaBases;
        }
        else{
            return this.rnaBases;
        }
    }
}
