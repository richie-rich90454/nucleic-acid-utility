// Use: terser script.js -o script.min.js --compress --mangle
document.addEventListener("DOMContentLoaded", function (){
    let $sequenceInput=$("#sequence");
    let $conversionType=$("#conversionType");
    let $showBaseNames=$("#showBaseNames");
    let $colorizeSequenceCheckbox=$("#colorizeSequence");
    let $result=$("#result");
    let $error=$("#error");
    let $baseButtons=$("#base-buttons");
    let $deleteLast=$("#delete-last");
    let $clearAll=$("#clear-all");
    let $copyResults=$("#copy-results");
    let $resetAll=$("#reset-all");
    let $visualizerContainer=$("#visualizer-container");
    let $visualizerTitle=$("#visualizer-title");
    let $aminoAcidTooltip=$(".amino-acid-tooltip");
    let canvas=document.getElementById("sequence-visualizer");
    let ctx=canvas.getContext("2d");
    let dnaBases=["A", "T", "G", "C"];
    let rnaBases=["A", "U", "G", "C"];
    let sequenceOutputTypes=["DNA_COMPLEMENT", "RNA_COMPLEMENT", "DNA_TRANSCRIPT"];
    let codonTable={
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
    let aminoAcidColors={
        "Alanine": "#FF6B6B", "Arginine": "#4ECDC4", "Asparagine": "#1A936F",
        "Aspartic Acid": "#6A0572", "Cysteine": "#FFD166", "Glutamic Acid": "#118AB2",
        "Glutamine": "#073B4C", "Glycine": "#EF476F", "Histidine": "#FFD166",
        "Isoleucine": "#06D6A0", "Leucine": "#7209B7", "Lysine": "#3A86FF",
        "Methionine": "#FB5607", "Phenylalanine": "#8338EC", "Proline": "#3A86FF",
        "Serine": "#FF006E", "Threonine": "#FFBE0B", "Tryptophan": "#8AC926",
        "Tyrosine": "#FF9E00", "Valine": "#4361EE"
    };
    let baseColors={
        "A": "#FF6B6B",
        "T": "#4ECDC4",
        "U": "#1A936F",
        "G": "#FFD166",
        "C": "#6A0572"
    };
    let MAP_DNA_COMPLEMENT={
        A: "T", T: "A", C: "G", G: "C"
    };
    let MAP_RNA_COMPLEMENT={
        A: "U", U: "A", C: "G", G: "C"
    };
    let MAP_DNA_TRANSCRIPT={
        A: "U", T: "A", C: "G", G: "C"
    };
    let COMPLEMENT_MAP_FOR_ANTICODON={
        "A": "U", "U": "A", "G": "C", "C": "G"
    };
    function isDNAType(type){
        return type&&type.startsWith("DNA");
    }
    function isRNAType(type){
        return type&&type.startsWith("RNA");
    }
    function mapSequence(sequence, map){
        if (!sequence) return "";
        let out="";
        for (let i=0;i<sequence.length;i++){
            out+=map[sequence[i]]||sequence[i];
        }
        return out;
    }
    function getBaseColor(base){
        return baseColors[base]||"#6C757D";
    }
    function setSequence(newSeq){
        $sequenceInput.val(newSeq);
        convertSequence();
    }
    function updateButtonStates(){
        let seq=$sequenceInput.val();
        let disabled=!seq||seq.length==0;
        $deleteLast.prop("disabled", disabled);
        $clearAll.prop("disabled", disabled);
    }
    function showError(message){
        $error.text(message).fadeIn(200).addClass("error-shake");
        setTimeout(()=> $error.removeClass("error-shake"), 500);
        $result.hide();
    }
    function clearError(){
        $error.hide().text("");
        $result.show();
    }
    function getDNAComplement(seq){
        return mapSequence(seq, MAP_DNA_COMPLEMENT);
    }
    function getRNAComplement(seq){
        return mapSequence(seq, MAP_RNA_COMPLEMENT);
    }
    function getRNATranscriptFromDNA(seq){
        return mapSequence(seq, MAP_DNA_TRANSCRIPT);
    }
    function getAnticodon(codon){
        let anticodon="";
        for (let i=codon.length-1;i>=0;i--){
            anticodon+=COMPLEMENT_MAP_FOR_ANTICODON[codon[i]]||codon[i];
        }
        return anticodon;
    }
    function decodeRNAtoProtein(rnaSequence){
        let codons=[];
        for (let i=0;i<rnaSequence.length;i+=3){
            let codon=rnaSequence.slice(i, i+3);
            if (codon.length==3){
                let anticodon=getAnticodon(codon);
                let aminoAcid=codonTable[codon]||"Unknown";
                codons.push({ codon: codon, anticodon: anticodon, aminoAcid: aminoAcid });
            }
            else{
                return{codons: codons, incomplete: codon};
            }
        }
        return{codons: codons, incomplete: null};
    }
    function colorizeSequence(sequence){
        let out="";
        for (let i=0;i<sequence.length;i++){
            let base=sequence[i];
            out+=`<span class="base-${base.toLowerCase()}">${base}</span>`;
        }
        return out;
    }
    function getLabel(conversionType){
        let labels={
            "DNA_COMPLEMENT": "Complement DNA",
            "RNA_COMPLEMENT": "Complement RNA",
            "DNA_TRANSCRIPT": "RNA Transcript"
        };
        return labels[conversionType]||"";
    }
    function getBaseName(base){
        let baseNames={ A: "Adenine", T: "Thymine", U: "Uracil", C: "Cytosine", G: "Guanine" };
        return baseNames[base]||base;
    }
    function getBaseNames(sequence){
        return sequence.split("").map(getBaseName).join(", ");
    }
    function updateSequenceConversion(sequence, conversionType, showBaseNames, colorize){
        let outputSequence=getOutputSequence(sequence, conversionType);
        let html=`<p><strong>${getLabel(conversionType)}:</strong> `;
        if (colorize){
            html+=`<span class="sequence-container">${colorizeSequence(outputSequence)}</span>`;
        }
        else{
            html+=outputSequence;
        }
        html+=`</p>`;
        if (showBaseNames){
            html+=`<p><strong> Input Bases:</strong> ${getBaseNames(sequence)}</p>`;
            html+=`<p><strong> Output Bases:</strong> ${getBaseNames(outputSequence)}</p>`;
        }
        $result.html(html);
    }
    function updateProteinConversion(sequence, conversionType, showBaseNames, colorize){
        let rnaSequence=(conversionType=="RNA_PROTEIN")?sequence:getRNATranscriptFromDNA(sequence);
        let result=decodeRNAtoProtein(rnaSequence);
        let codons=result.codons;
        let incomplete=result.incomplete;
        if (codons.length==0){
            showError("No complete codons found.");
            return;
        }
        let html="<table><tr><th>Codon</th><th>tRNA Anticodon</th><th>Amino Acid</th></tr>";
        for (let i=0;i<codons.length;i++){
            let c=codons[i];
            let codonDisplay=colorize?colorizeSequence(c.codon):c.codon;
            let anticodonDisplay=colorize?colorizeSequence(c.anticodon):c.anticodon;
            html+=`<tr><td>${codonDisplay}</td><td>${anticodonDisplay}</td><td><strong>${c.aminoAcid}</strong></td></tr>`;
        }
        html+="</table>";
        if (incomplete) html+=`<p><strong>Incomplete codon:</strong> ${incomplete}</p>`;
        if (showBaseNames) html+=`<p><strong>Input Bases:</strong> ${getBaseNames(sequence)}</p>`;
        $result.html(html);
    }
    function getOutputSequence(sequence, conversionType){
        if (conversionType=="DNA_COMPLEMENT"){
            return getDNAComplement(sequence);
        }
        if (conversionType=="RNA_COMPLEMENT"){
            return getRNAComplement(sequence);
        }
        if (conversionType=="DNA_TRANSCRIPT"){
            return getRNATranscriptFromDNA(sequence);
        }
        return "";
    }
    function validateSequence(sequence, conversionType){
        clearError();
        let validDNA=/^[ATGC]*$/i;
        let validRNA=/^[AUGC]*$/i;
        if (sequence==""){
            $result.html("");
            return true;
        }
        let useRNA=(conversionType=="RNA_PROTEIN"||conversionType=="RNA_COMPLEMENT");
        if (useRNA){
            if (!validRNA.test(sequence)){
                showError("Invalid RNA sequence. Only A, U, G, C characters are allowed.");
                return false;
            }
        }
        else{
            if (!validDNA.test(sequence)){
                showError("Invalid DNA sequence. Only A, T, G, C characters are allowed.");
                return false;
            }
        }
        return true;
    }
    function updateBaseButtons(){
        let conversionType=$conversionType.val();
        let bases=(["DNA_COMPLEMENT", "DNA_TRANSCRIPT", "DNA_PROTEIN"].includes(conversionType))?dnaBases:rnaBases;
        $baseButtons.empty();
        bases.forEach(base=>{
            let $btn=$(`<button class="base-btn">${base}</button>`);
            $btn.on("click", function (){
                let current=$sequenceInput.val();
                $sequenceInput.val(current+base);
                convertSequence();
            });
            $baseButtons.append($btn);
        });
    }
    function deleteLastCharacter(){
        let s=$sequenceInput.val();
        if (s.length > 0) setSequence(s.slice(0, -1));
    }
    function clearSequence(){
        setSequence("");
        $sequenceInput.focus();
    }
    function copyResultsToClipboard(){
        let text=$result.text();
        if (text){
            navigator.clipboard.writeText(text).then(()=>{
                alert("Results copied to clipboard!");
            }).catch(err=>{
                showError("Failed to copy results.");
                console.error("Copy failed:", err);
            });
        }
        else{
            showError("No results to copy.");
        }
    }
    function resetApplication(){
        $sequenceInput.val("");
        $conversionType.val("DNA_COMPLEMENT");
        $showBaseNames.prop("checked", true);
        $colorizeSequenceCheckbox.prop("checked", true);
        $result.html("");
        $visualizerContainer.hide();
        clearError();
        updateBaseButtons();
        updateButtonStates();
        $sequenceInput.focus();
    }
    function drawVisualization(sequence, conversionType){
        $visualizerContainer.hide();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let baseWidth=40;
        let baseHeight=20;
        let padding=20;
        let width=Math.min(sequence.length*baseWidth+2*padding, window.innerWidth-40);
        let height=conversionType.includes("PROTEIN")?150:180;
        let dpr=window.devicePixelRatio||1;
        canvas.style.width=width+"px";
        canvas.style.height=height+"px";
        canvas.width=Math.round(width*dpr);
        canvas.height=Math.round(height*dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        let rnaSequence=null;
        if (conversionType=="RNA_PROTEIN"){
            rnaSequence=sequence;
        }
        else if (conversionType=="DNA_PROTEIN"){
            rnaSequence=getRNATranscriptFromDNA(sequence);
        }
        if (conversionType.includes("PROTEIN")){
            drawPolypeptideChain(rnaSequence||"", width, height, padding);
        }
        else{
            drawAntiparallelStrands(sequence, conversionType, width, height, padding);
        }
        $visualizerContainer.show();
    }
    function drawAntiparallelStrands(sequence, conversionType, width, height, padding){
        let baseWidth=40;
        let baseHeight=20;
        let yCenter=height/2;
        $visualizerTitle.text("Antiparallel Strands Visualization");
        drawStrand(sequence, padding, yCenter-40, baseWidth, baseHeight, "top", conversionType);
        let complement="";
        if (conversionType=="DNA_COMPLEMENT"){
            complement=getDNAComplement(sequence);
        }
        else if (conversionType=="RNA_COMPLEMENT"){
            complement=getRNAComplement(sequence);
        }
        else if (conversionType=="DNA_TRANSCRIPT"){
            complement=getRNATranscriptFromDNA(sequence);
        }
        drawStrand(complement, padding, yCenter+40, baseWidth, baseHeight, "bottom", conversionType);
        for (let i=0;i<sequence.length;i++){
            let x=padding+i*baseWidth+baseWidth/2;
            ctx.beginPath();
            ctx.moveTo(x, yCenter-40+baseHeight);
            ctx.lineTo(x, yCenter+40);
            ctx.strokeStyle="#CED4DA";
            ctx.lineWidth=1;
            ctx.stroke();
        }
        ctx.fillStyle="#6C757D";
        ctx.font="12px Noto Sans";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
    }
    function drawStrand(sequence, startX, startY, baseWidth, baseHeight, strandType, conversionType){
        let isTop=strandType=="top";
        for (let i=0;i<sequence.length;i++){
            let x=startX+i*baseWidth;
            let y=startY;
            let base=sequence[i]||"";
            ctx.fillStyle=getBaseColor(base, conversionType);
            ctx.fillRect(x, y, baseWidth, baseHeight);
            ctx.strokeStyle="#343A40";
            ctx.lineWidth=1;
            ctx.strokeRect(x, y, baseWidth, baseHeight);
            ctx.fillStyle="#FFFFFF";
            ctx.font="bold 14px Noto Sans";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillText(base, x+baseWidth/2, y+baseHeight/2);
            ctx.beginPath();
            ctx.moveTo(x, y+(isTop?0:baseHeight));
            ctx.lineTo(x+baseWidth, y+(isTop?0:baseHeight));
            ctx.strokeStyle="#495057";
            ctx.lineWidth=3;
            ctx.stroke();
        }
    }
    function drawPolypeptideChain(rnaSequence, width, height, padding){
        $visualizerTitle.text("Polypeptide Chain Visualization");
        let aminoAcidRadius=25;
        let spacing=60;
        let startX=padding+aminoAcidRadius;
        let startY=height/2;
        let codons=[];
        for (let i=0;i<rnaSequence.length;i+=3){
            let codon=rnaSequence.slice(i, i+3);
            if (codon.length==3){
                let aminoAcid=codonTable[codon]||"Unknown";
                if (aminoAcid=="Stop"){
                    break;
                }
                codons.push({
                    codon: codon,
                    aminoAcid: aminoAcid,
                    color: aminoAcidColors[aminoAcid]||"#6C757D",
                    x: startX+codons.length*spacing,
                    y: startY
                });
            }
        }
        ctx.beginPath();
        for (let i=0;i<codons.length-1;i++){
            let curr=codons[i];
            let next=codons[i+1];
            ctx.moveTo(curr.x+aminoAcidRadius, curr.y);
            ctx.lineTo(next.x-aminoAcidRadius, next.y);
        }
        ctx.strokeStyle="#495057";
        ctx.lineWidth=2;
        ctx.stroke();
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseout", handleMouseOut);
        function handleMouseMove(e){
            let rect=canvas.getBoundingClientRect();
            let mouseX=(e.clientX-rect.left);
            let mouseY=(e.clientY-rect.top);
            let tooltipShown=false;
            for (let codon of codons){
                let distance=Math.sqrt((mouseX-codon.x)**2+(mouseY-codon.y)**2);
                if (distance<aminoAcidRadius){
                    $aminoAcidTooltip.text(`${codon.aminoAcid} (${codon.codon})`).css({ left: e.pageX+10, top: e.pageY-30, display: "block" });
                    tooltipShown=true;
                    break;
                }
            }
            if (!tooltipShown){
                $aminoAcidTooltip.hide();
            }
        }
        function handleMouseOut(){
            $aminoAcidTooltip.hide();
        }
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseout", handleMouseOut);
        for (let codon of codons){
            let{ x, y, color, aminoAcid }=codon;
            ctx.beginPath();
            ctx.arc(x, y, aminoAcidRadius, 0, Math.PI*2);
            ctx.fillStyle=color;
            ctx.fill();
            ctx.strokeStyle="#343A40";
            ctx.lineWidth=1;
            ctx.stroke();
            let abbr=aminoAcid.substring(0, 3);
            ctx.fillStyle="#FFFFFF";
            ctx.font="bold 12px Noto Sans";
            ctx.textAlign="center";
            ctx.textBaseline="middle";
            ctx.fillText(abbr, x, y);
        }
    }
    function convertSequence(){
        clearError();
        let sequenceRaw=$sequenceInput.val()||"";
        let sequence=sequenceRaw.trim().toUpperCase();
        let conversionType=$conversionType.val();
        let showBaseNames=$showBaseNames.is(":checked");
        let colorize=$colorizeSequenceCheckbox.is(":checked");
        if (!validateSequence(sequence, conversionType)){
            return;
        }
        if (sequence){
            drawVisualization(sequence, conversionType);
        }
        else{
            $visualizerContainer.hide();
        }
        if (sequenceOutputTypes.includes(conversionType)){
            updateSequenceConversion(sequence, conversionType, showBaseNames, colorize);
        }
        else{
            updateProteinConversion(sequence, conversionType, showBaseNames, colorize);
        }
        updateButtonStates();
    }
    function handleUrlParameters(){
        let urlParams=new URLSearchParams(window.location.search);
        let paramMapping={
            "dna_dna": "DNA_COMPLEMENT",
            "dna_rna": "DNA_TRANSCRIPT", 
            "rna_rna": "RNA_COMPLEMENT",
            "rna_protein": "RNA_PROTEIN",
            "dna_protein": "DNA_PROTEIN"
        };
        let sequence="";
        let conversionType="";
        for (let [param, convType] of Object.entries(paramMapping)){
            let paramValue=urlParams.get(param);
            if (paramValue){
                sequence=paramValue.toUpperCase().replace(/[^ATUGC]/g, "");
                conversionType=convType;
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
            $sequenceInput.val(sequence);
            if (conversionType){
                $conversionType.val(conversionType);
            }
            updateBaseButtons();
            updateButtonStates();
            convertSequence();
            setTimeout(()=>{
                document.getElementById("results").scrollIntoView({ 
                    behavior: "smooth" 
                });
            }, 300);
            document.title=`${conversionType} for ${sequence} - Nucleic Acid Utility`;
        }
    }
    $sequenceInput.tooltip({
        content: "Enter DNA or RNA sequence (only A, T, G, C, U characters allowed)",
        position:{ my: "left+10 center", at: "right center" }
    });
    $sequenceInput.on("focus", function (){ $(this).addClass("highlight-effect"); })
        .on("blur", function (){ $(this).removeClass("highlight-effect"); })
        .on("input", convertSequence);

    $conversionType.on("change", function (){
        updateBaseButtons();
        convertSequence();
    });
    $showBaseNames.on("change", convertSequence);
    $colorizeSequenceCheckbox.on("change", convertSequence);
    $deleteLast.on("click", deleteLastCharacter);
    $clearAll.on("click", clearSequence);
    $copyResults.on("click", copyResultsToClipboard);
    $resetAll.on("click", resetApplication);
    updateBaseButtons();
    updateButtonStates();
    $sequenceInput.focus();
    handleUrlParameters();
});