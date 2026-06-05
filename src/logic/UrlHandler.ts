import { ConversionType, UrlParseResult } from "../types";
export class UrlHandler{
    paramToType: {[key: string]: string};
    typeToParam: {[key: string]: string};
    constructor(){
        this.paramToType={
            "dna_dna": "DNA_COMPLEMENT",
            "dna_revcomp": "DNA_REVERSE_COMPLEMENT",
            "dna_rna": "DNA_TRANSCRIPT",
            "rna_rna": "RNA_COMPLEMENT",
            "rna_protein": "RNA_PROTEIN",
            "dna_protein": "DNA_PROTEIN"
        };
        this.typeToParam={};
        for (let key in this.paramToType){
            this.typeToParam[this.paramToType[key]]=key;
        }
    }
    parseUrlParams(): UrlParseResult|null{
        let urlParams=new URLSearchParams(window.location.search);
        let sequence="";
        let conversionType="";
        for (let param in this.paramToType){
            let paramValue=urlParams.get(param);
            if (paramValue){
                sequence=paramValue.toUpperCase().replace(/[^ATUGC]/g, "");
                conversionType=this.paramToType[param];
                break;
            }
        }
        if (!sequence){
            let sequenceParam=urlParams.get("sequence");
            if (sequenceParam){
                sequence=sequenceParam.toUpperCase().replace(/[^ATUGC]/g, "");
                if (sequence.includes("U")&&!sequence.includes("T")){
                    conversionType="RNA_PROTEIN";
                }
                else{
                    conversionType="DNA_PROTEIN";
                }
            }
        }
        if (sequence){
            return{sequence: sequence, conversionType: conversionType as ConversionType};
        }
        return null;
    }
    buildShareUrl(sequence: string, conversionType: ConversionType): string{
        let param=this.typeToParam[conversionType];
        return `${window.location.origin}${window.location.pathname}?${param}=${sequence}`;
    }
    updateDocumentTitle(sequence: string, conversionType: ConversionType): void{
        document.title=`${conversionType} for ${sequence} - Nucleic Acid Utility`;
    }
}
