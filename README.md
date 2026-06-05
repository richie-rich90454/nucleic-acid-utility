# Nucleic Acid Utility

An interactive DNA/RNA conversion and protein translation tool.

Live at [dna.richardsblogs.com](https://dna.richardsblogs.com).

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

Full documentation is available in the `docs/` directory and can be built with VitePress:

```
npm run docs:dev
npm run docs:build
```

## Project structure

```
src/
  logic/         Headless TypeScript classes (no framework dependency)
  components/    React UI components (thin wrappers)
  types.ts       Shared TypeScript interfaces
  style.full.css Vanilla CSS
index.html       Vite entry point with SEO meta tags
server.js        Fastify production server
docs/            VitePress documentation
```

## License

MIT. See [LICENSE](LICENSE).
