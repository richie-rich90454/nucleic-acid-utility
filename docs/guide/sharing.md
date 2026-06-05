# URL Sharing

The application supports deep linking through URL query parameters. This enables sharing conversion results by distributing a URL that auto-populates the input and conversion type.

## Supported Parameters

| Parameter | Conversion Type | Input Format |
|-----------|----------------|-------------|
| `dna_dna` | DNA to Complement DNA | DNA |
| `dna_revcomp` | DNA to Reverse Complement | DNA |
| `dna_rna` | DNA to RNA Transcript | DNA |
| `rna_rna` | RNA to Complement RNA | RNA |
| `rna_protein` | RNA to Protein | RNA |
| `dna_protein` | DNA to Protein | DNA |

## Usage

Append a query parameter with a nucleotide sequence as the value:

```
https://dna.richardsblogs.com/?dna_protein=ATGGCCCTGTGGATGCGC
```

When the page loads, the application parses the URL parameters. If a valid parameter is found, the input field is populated with the provided sequence and the corresponding conversion type is selected. The conversion executes automatically.

## Share URL Button

The **Share URL** button generates a URL containing the current input sequence and conversion type as a query parameter. Clicking the button copies the generated URL to the clipboard. The URL can then be shared with others, who will see the same conversion pre-loaded upon opening the link.

## Example

The following URL encodes a DNA-to-protein conversion of an insulin gene fragment:

```
https://dna.richardsblogs.com/?dna_protein=ATGGCCCTGTGGATGCGC
```

Opening this URL will populate the input with `ATGGCCCTGTGGATGCGC`, select the DNA to Protein conversion, and display the translated amino acid sequence.
