# Nucleic Acid Utility

[![GitHub stars](https://img.shields.io/github/stars/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/network)
[![GitHub issues](https://img.shields.io/github/issues/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/issues)
[![License](https://img.shields.io/github/license/richie-rich90454/nucleic-acid-utility?style=for-the-badge)](https://github.com/richie-rich90454/nucleic-acid-utility/blob/main/LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/richie-rich90454/nucleic-acid-utility?style=for-the-badge&include_prereleases)](https://github.com/richie-rich90454/nucleic-acid-utility/releases)
[![Live Demo](https://img.shields.io/website?url=https%3A%2F%2Fdna.richardsblogs.com&style=for-the-badge)](https://dna.richardsblogs.com)

An interactive DNA/RNA conversion and protein translation tool.

Live at [dna.richardsblogs.com](https://dna.richardsblogs.com). Documentation at [dna.richardsblogs.com/docs/](https://dna.richardsblogs.com/docs/).

## What it does

Converts between DNA and RNA sequences, computes complementary strands, and translates nucleotide sequences into proteins using the standard genetic code. All computation runs locally in the browser.

Supported operations:

- DNA to complementary DNA (Watson-Crick pairing)
- DNA to reverse complement
- DNA coding strand to RNA transcript
- RNA to complementary RNA
- RNA to protein (codon table)
- DNA coding strand to protein

## Building

Requires Node.js >= 18.

```
npm install
npm run build
npm start
```

The application is served at `http://localhost:6001`.

For development with hot module replacement:

```
npm run dev
```

## Documentation

Full documentation is built with VitePress and served at `/docs/` alongside the application.

Local development:

```
npm run docs:dev
```

Build for production:

```
npm run docs:build
```

Online: [dna.richardsblogs.com/docs/](https://dna.richardsblogs.com/docs/)

## Project structure

```
src/
  logic/         Headless TypeScript classes (no framework dependency)
  components/    React UI components (thin wrappers)
  types.ts       Shared TypeScript interfaces
  style.css Vanilla CSS
index.html       Vite entry point with SEO meta tags
server.js        Fastify production server
docs/            VitePress documentation
```

## License

MIT. See [LICENSE](LICENSE).
