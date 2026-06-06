import React from "react";
export default function AboutSection(){
    return (
        <section className="card" id="about-section">
            <details>
                <summary>About & Help</summary>
                <p className="indented">Convert DNA and RNA sequences in real time. All processing happens locally in your browser — no data is sent to any server.</p>
                <h3>Features</h3>
                <ul>
                    <li>DNA complement and reverse complement generation</li>
                    <li>DNA to RNA transcription</li>
                    <li>RNA complement generation</li>
                    <li>RNA to protein translation with codon table</li>
                    <li>DNA to protein translation via transcription</li>
                    <li>Colorized base and codon visualization</li>
                    <li>Interactive antiparallel strand and polypeptide chain diagrams</li>
                </ul>
                <h3>How to Use</h3>
                <ol>
                    <li>Enter your DNA or RNA sequence in the input field</li>
                    <li>Select the desired conversion type from the conversion selector</li>
                    <li>View the results, copy them, or share via URL</li>
                </ol>
                <h3>Example</h3>
                <p className="indented">For example, entering the DNA sequence &quot;ATGCGA&quot; and selecting &quot;DNA to RNA Transcript&quot; will produce the RNA sequence &quot;UACGCU&quot;. Selecting &quot;DNA to Protein&quot; will first transcribe the DNA to RNA and then translate the RNA codons into amino acids using the standard genetic code table.</p>
            </details>
        </section>
    );
}
