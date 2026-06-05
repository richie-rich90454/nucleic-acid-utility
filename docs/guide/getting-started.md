# Getting Started

## Overview

Nucleic Acid Utility is an interactive web application for molecular biology sequence analysis. It provides real-time DNA/RNA conversions, protein translation, and visual representations of nucleic acid interactions. The tool is designed for students, educators, and researchers who need quick, accurate sequence transformations without installing desktop software.

Core capabilities include:

- DNA and RNA complement generation
- Reverse complement computation
- DNA-to-RNA transcription
- RNA-to-protein and DNA-to-protein translation
- Antiparallel strand diagrams and polypeptide chain visualizations
- URL-based sharing of conversion results

## Prerequisites

- Node.js >= 18
- npm (included with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd nucleic-acid-utility
npm install
```

## Development Mode

Start the development server:

```bash
npm run dev
```

The application is served at `http://localhost:6001` with hot module replacement enabled.

## Production Build

Build and serve the production bundle:

```bash
npm run build
npm start
```

The `build` command generates an optimized output. The `start` command serves the production build locally.

## First Conversion

1. Enter a nucleotide sequence in the input field (for example, `ATGGCCCTGTGG`).
2. Select a conversion type from the dropdown menu.
3. Press **Ctrl+Enter** or click the conversion button to execute.
4. The result appears in the output area, along with a visualization when applicable.

## Example Presets

The application includes preset sequences for common biological motifs:

- **TATA Box** - A promoter element recognized by transcription factors
- **Start Codon** - The AUG initiation codon in mRNA
- **Insulin Fragment** - A segment of the human insulin gene
- **p53 Fragment** - A portion of the tumor suppressor gene TP53

Select a preset from the dropdown to populate the input field automatically.
