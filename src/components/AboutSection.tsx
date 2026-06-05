import React from "react";
export default function AboutSection(){
    return (
        <section className="card" id="about-section">
            <h2>About the Nucleic Acid Utility Tool</h2>
            <p>&emsp;The Nucleic Acid Utility is an online interactive DNA converter and RNA translator designed for students, educators, and researchers to explore DNA and RNA sequences. With this tool, you can convert DNA sequences into RNA transcripts, generate complementary strands, and translate RNA into amino acids and proteins using the standard genetic code. It visualizes codons and sequence bases in a user-friendly format, allowing users to understand the genetic code and the central dogma of molecular biology — how information flows from DNA to RNA to protein.</p>
            <p>&emsp;Users can input any DNA or RNA sequence and select the desired conversion type. The tool highlights codons, shows base names, and allows colorization for easy identification. All operations are performed locally in your browser, ensuring fast processing and privacy — no sequence data is sent to any server.</p>
            <p>&emsp;Key features include real-time DNA/RNA conversion, codon visualization with the complete codon table, protein translation using the standard genetic code, and interactive sequence analysis. Whether you are learning about Watson-Crick base pairing, studying transcription and translation, or verifying a codon table lookup, this genetic code calculator is optimized for accuracy and usability, making it suitable for classroom demonstrations, homework, and quick reference.</p>
            <h2>Features of the Tool</h2>
            <details>
                <summary>Click to expand details</summary>
                <ul>
                    <li>DNA complement and reverse complement generation</li>
                    <li>DNA to RNA transcription</li>
                    <li>RNA complement generation</li>
                    <li>RNA to protein translation with codon table</li>
                    <li>DNA to protein translation via transcription</li>
                    <li>Colorized base and codon visualization</li>
                    <li>Interactive antiparallel strand and polypeptide chain diagrams</li>
                </ul>
            </details>
            <h2>How to Use it</h2>
            <details>
                <summary>Click to expand details</summary>
                <ol>
                    <li>Enter your DNA or RNA sequence in the input field</li>
                    <li>Select the desired conversion type from the dropdown</li>
                    <li>Click the Convert button to process the sequence</li>
                    <li>View the results, copy them, or share via URL</li>
                </ol>
            </details>
            <h2>Example Usage</h2>
            <details>
                <summary>Click to expand details</summary>
                <p>&emsp;For example, entering the DNA sequence &quot;ATGCGA&quot; and selecting &quot;DNA to RNA Transcript&quot; will produce the RNA sequence &quot;UACGCU&quot;. Selecting &quot;DNA to Protein&quot; will first transcribe the DNA to RNA and then translate the RNA codons into amino acids using the standard genetic code table.</p>
            </details>
        </section>
    );
}