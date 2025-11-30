# Nucleic Acid Pairing and Protein Decoding available at [dna.richardsblogs.com](https://dna.richardsblogs.com)
> An interactive web application for exploring DNA and RNA sequences: convert between nucleic acids, compute complements and transcripts, and translate RNA (or coding‑strand DNA) into proteins.
## Table of Contents
* [Features](#features)
* [Demo](#demo)
* [Prerequisites](#prerequisites)
* [Installation & Usage](#installation--usage)
* [File Structure](#file-structure)
* [Customization](#customization)
* [License](#license)
---
## Features
* **Sequence Input**
  * Type or build a DNA/RNA sequence base by base with dedicated buttons.
  * Inline validation with visual error feedback on invalid characters.
* **Conversion Modes**
  * **DNA → Complementary DNA**
  * **DNA (coding strand) → RNA transcript**
  * **RNA → Complementary RNA**
  * **RNA → Protein translation**
  * **DNA (coding strand) → Protein translation**
* **Protein Decoding**
  * Standard genetic codon table for amino acid lookup.
  * Displays tRNA anticodons and full amino acid names.
* **Interactive Visualization**
  * Antiparallel strand diagram for DNA/RNA complement operations.
  * Polypeptide chain view for protein translations with hover tooltips.
  * Highlight, fade, and shake effects during sequence updates and errors.
* **UI Options**
  * Toggle full base‑name expansions (e.g., “Adenine, Thymine…”).
  * Toggle colorized base display.
  * Responsive design for desktop & mobile.
* **Lightweight & Accessible**
  * Built with plain HTML, CSS, and jQuery/UI.
  * Fastify static server serving files with `no-cache` headers.
---
## Demo
* Live demo: [dna.richardsblogs.com](https://dna.richardsblogs.com)
* Local preview: open your browser to `http://localhost:6001` after installation.
### Screenshots
| Operation                | Example                                                |
| ------------------------ | ------------------------------------------------------ |
| DNA → DNA Conversion     | ![DNA to DNA Conversion](demos/DNA_to_DNA.png)         |
| DNA → RNA Conversion     | ![DNA to RNA Conversion](demos/DNA_to_RNA.png)         |
| RNA → RNA Conversion     | ![RNA to RNA Conversion](demos/RNA_to_RNA.png)         |
| RNA → Protein Conversion | ![RNA to Protein Conversion](demos/RNA_to_Protein.png) |
| DNA → Protein Conversion | ![DNA to Protein Conversion](demos/DNA_to_Protein.png) |
---
## Prerequisites
* [Node.js](https://nodejs.org/) **≥ v14**
* Internet access for CDN assets (automatic fallbacks to local copies included)
* Modern web browser with JavaScript enabled
---
## Installation & Usage
# 🧬 Nucleic Acid Utility - Interactive DNA/RNA Conversion Tool

[![GitHub stars](https://img.shields.io/github/stars/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/network)
[![GitHub issues](https://img.shields.io/github/issues/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen?style=for-the-badge)](https://nodejs.org)
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://dna.richardsblogs.com)

> **An interactive educational web application for exploring molecular biology concepts** - Convert between DNA and RNA sequences, compute complementary strands, and translate genetic code into proteins with beautiful visualizations.

## 🚀 Live Demo

**Try it now:** [dna.richardsblogs.com](https://dna.richardsblogs.com)

## ✨ Key Features

### 🔬 Core Functionality
- **DNA → Complementary DNA** - Generate Watson-Crick complementary strands
- **DNA (coding strand) → RNA transcript** - Simulate transcription process
- **RNA → Complementary RNA** - Create RNA complement sequences
- **RNA → Protein translation** - Translate mRNA using standard genetic code
- **DNA (coding strand) → Protein translation** - Complete transcription + translation

### 🎨 Interactive Visualizations
- **Antiparallel Strand Diagrams** - Visualize DNA/RNA complement operations
- **Polypeptide Chain View** - See protein translations with hover tooltips
- **Color-coded Sequences** - Different colors for each nucleotide base
- **Real-time Updates** - Instant results as you type or modify sequences

### 🛠️ User Experience
- **Base-by-base Input** - Dedicated buttons for each nucleotide
- **Inline Validation** - Visual error feedback for invalid characters
- **Copy to Clipboard** - Easy results sharing
- **Mobile Responsive** - Works perfectly on all devices
- **Toggle Options** - Show/hide base names and colorization

## 📸 Screenshots

| Operation | Visualization |
|-----------|---------------|
| **DNA → DNA Conversion** | ![DNA to DNA Conversion](demos/DNA_to_DNA.png) |
| **DNA → RNA Conversion** | ![DNA to RNA Conversion](demos/DNA_to_RNA.png) |
| **RNA → RNA Conversion** | ![RNA to RNA Conversion](demos/RNA_to_RNA.png) |
| **RNA → Protein Conversion** | ![RNA to Protein Conversion](demos/RNA_to_Protein.png) |
| **DNA → Protein Conversion** | ![DNA to Protein Conversion](demos/DNA_to_Protein.png) |

## 🛠️ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) **≥ v14**
- Modern web browser with JavaScript enabled

### Installation & Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/richie-rich90454/nucleic-acid-utility.git
   cd nucleic-acid-utility
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   node server.js
   ```

4. **Open your browser**
   Navigate to `http://localhost:6001`

### 🏗️ Build for Production

The project includes Electron support for desktop applications:

```bash
# Build desktop application
npm run build

# Run as desktop app
npm start
```

## 🧪 Example Usage

### Basic DNA Operations
```
Input: ATGCGT
Operation: DNA → RNA Transcript
Output: UACGCA
```

### Protein Translation
```
Input: AUGCCAUAG
Operation: RNA → Protein
Output: Met-Pro-Stop
```

### Complete Workflow
1. Enter DNA sequence: `ATGGCCATT`
2. Convert to RNA: `UACCG GUAA`
3. Translate to protein: `Tyr-Arg-Val`

## 🏗️ Project Structure

```
nucleic-acid-utility/
├── public/
│   ├── index.html          # Main application interface
│   ├── script.js           # Core functionality and logic
│   ├── style.css           # Styling and responsive design
│   └── favicon.png         # Application icon
├── demos/                  # Screenshots and demo images
├── server.js              # Fastify web server
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## 🔧 Customization

### Styling
- Modify `public/style.css` for custom themes
- Update color schemes in the JavaScript color mappings
- Adjust canvas dimensions for different visualization sizes

### Genetic Code
- Edit the `codonTable` object in `script.js` to support alternative genetic codes
- Customize amino acid naming conventions
- Add support for non-standard codons

### Server Configuration
- Modify `server.js` to change ports or add custom routes
- Configure caching policies and headers
- Add authentication or rate limiting

## 🎯 Educational Value

This tool is perfect for:
- **Biology students** learning molecular biology concepts
- **Self-learners** exploring genetics fundamentals

### Learning Objectives Covered
- DNA/RNA base pairing rules
- Transcription and translation processes
- Genetic code and codon usage
- Protein synthesis pathways
- Sequence analysis techniques

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies (HTML5, CSS3, JavaScript)
- Uses [Fastify](https://fastify.io/) for high-performance serving
- jQuery and jQuery UI for enhanced user interactions
- Google Fonts for typography
- Inspired by educational needs in molecular biology

## 📞 Support

- **Live Demo**: [dna.richardsblogs.com](https://dna.richardsblogs.com)
- **Issues**: [GitHub Issues](https://github.com/richie-rich90454/nucleic-acid-utility/issues)
- **Author**: [Richard's Blogs](https://www.richardsblogs.com)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

</div>
