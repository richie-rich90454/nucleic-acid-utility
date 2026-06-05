import { ConversionType } from "../types";
import { UrlHandler } from "./UrlHandler";
export class ClipboardManager{
    async copyText(text: string): Promise<boolean>{
        try{
            await navigator.clipboard.writeText(text);
            return true;
        }
        catch(e){
            return false;
        }
    }
    async copyShareUrl(sequence: string, conversionType: ConversionType, urlHandler: UrlHandler): Promise<boolean>{
        let url=urlHandler.buildShareUrl(sequence, conversionType);
        return this.copyText(url);
    }
}
