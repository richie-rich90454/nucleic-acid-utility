export type ConversionType="DNA_COMPLEMENT"|"DNA_REVERSE_COMPLEMENT"|"DNA_TRANSCRIPT"|"RNA_COMPLEMENT"|"RNA_PROTEIN"|"DNA_PROTEIN";
export interface CodonResult{
    codon: string;
    anticodon: string;
    aminoAcid: string;
}
export interface ProteinResult{
    codons: CodonResult[];
    incomplete: string|null;
}
export interface ValidationResult{
    valid: boolean;
    message: string;
}
export interface UrlParseResult{
    sequence: string;
    conversionType: ConversionType;
}
export type ThemeMode="dark"|"light";
