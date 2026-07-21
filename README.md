# Nucleic Acid Utility

[![GitHub stars](https://img.shields.io/github/stars/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/network)
[![GitHub issues](https://img.shields.io/github/issues/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/issues)
[![License](https://img.shields.io/github/license/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/releases)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdna.richardsblogs.com&style=for-the-badge)](https://dna.richardsblogs.com)

A modern, interactive **DNA/RNA sequence analysis and protein translation toolkit** built with React, TypeScript, and Tauri.

Nucleic Acid Utility provides tools for nucleotide sequence conversion, complementary strand generation, reverse complements, protein translation, codon visualization, and sequence analysis.

All sequence processing happens locally on the user's device. No sequence data is uploaded or sent to external services.

**Website:** https://dna.richardsblogs.com  
**Documentation:** https://dna.richardsblogs.com/docs/

## Features

### DNA and RNA Conversion

Convert nucleotide sequences between common biological representations:

- DNA → complementary DNA
- DNA → reverse complement
- DNA coding strand → RNA transcript
- RNA → complementary RNA
- DNA → protein translation
- RNA → protein translation

Supports standard Watson–Crick base pairing and the standard genetic code.

### Protein Translation and Genetic Code Tools

Explore nucleotide-to-protein relationships with:

- Complete codon table support
- Interactive codon wheel visualization
- DNA/RNA translation
- Amino acid identification
- Start and stop codon recognition

### Sequence Analysis

Analyze nucleotide sequences with:

- GC content calculation
- Molecular weight estimation
- Melting temperature estimation
- Base composition visualization
- Sequence validation

### Interactive Learning Tools

Includes interactive tools for exploring molecular biology concepts:

- Randomized codon quizzes
- Configurable quiz sessions
- Instant feedback
- Integrated codon reference tools
- Example biological sequences

### User Interface

Features include:

- Dark and light themes
- System theme detection
- Persistent preferences
- Keyboard accessibility support
- Toast notifications
- Shareable URLs containing sequence state
- Responsive design

## Desktop Application

Nucleic Acid Utility is available as a cross-platform desktop application powered by Tauri.

Supported platforms:

- Windows x64
- macOS ARM64
- Linux x64

The desktop version provides:

- Smaller application size
- Lower memory usage
- Faster startup compared with traditional web-wrapper applications
- Native application packaging

Desktop builds are available through the GitHub Releases page.

## Offline Support

The web application supports offline usage through local asset caching:

- Static resources are cached locally
- Application functionality remains available after initial loading
- Sequence processing runs entirely on-device

## Architecture

Nucleic Acid Utility uses a modern TypeScript-based architecture designed for maintainability and reuse.

The biological processing logic is separated from the user interface, allowing core functionality to be tested and extended independently.

Core modules:

```text
SequenceConverter
CodonTable
SequenceValidator
SequenceAnalyzer
QuizEngine
ThemeManager
ClipboardManager
UrlHandler
CanvasRenderer
```

Architecture highlights:

- React frontend
- TypeScript codebase
- Framework-independent core logic layer
- Vite build system
- ECMAScript module architecture
- Tauri desktop integration

## Technology Stack

**Frontend**

- React
- TypeScript
- Vite
- CSS

**Desktop**

- Tauri
- Rust backend

**Documentation**

- VitePress

**Server**

- Fastify
- Node.js

## Documentation

The documentation site includes:

- Getting started guide
- Conversion explanations
- Visualization guides
- Keyboard shortcuts
- URL sharing
- Theme customization
- API reference
- Deployment documentation

Documentation:

https://dna.richardsblogs.com/docs/

## Project Structure

```text
src/
 ├── logic/          Framework-independent TypeScript biology logic
 ├── components/     React UI components
 ├── types.ts        Shared TypeScript definitions
 └── style.css       Application styling

docs/
 └── VitePress documentation

server.js            Fastify production server
```

## Development

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Development server:

```bash
npm run dev
```

Build application:

```bash
npm run build
```

Build application and documentation:

```bash
npm run build:full
```

Production server:

```bash
npm start
```

## Privacy

Nucleic Acid Utility is designed to keep sequence data private:

- No account required
- No sequence uploads
- No external processing APIs
- No stored biological data

All conversions, translations, and analyses are performed locally.

## Contributing

Contributions, bug reports, and feature requests are welcome.

Please open an issue before major changes to discuss proposed improvements.

## License

MIT License

See [LICENSE](LICENSE).