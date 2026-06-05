# CanvasRenderer

Class for rendering sequence visualizations on an HTML5 Canvas element. It draws antiparallel strand diagrams for complement and transcript conversions, and polypeptide chain diagrams for protein translations.

## Constructor

```typescript
constructor(canvas: HTMLCanvasElement, codonTable: CodonTable)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `canvas` | `HTMLCanvasElement` | The canvas element to render on |
| `codonTable` | `CodonTable` | A `CodonTable` instance used for base colors and amino acid lookups |

Internally creates a `SequenceConverter` instance for computing complement and transcript sequences.

## Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `drawVisualization` | `(sequence: string, conversionType: ConversionType): void` | Main entry point. Determines the canvas dimensions, applies DPR scaling, clears previous content, and dispatches to either `drawAntiparallelStrands` or `drawPolypeptideChain` based on the conversion type. |
| `drawAntiparallelStrands` | `(sequence: string, conversionType: ConversionType, width: number, height: number, padding: number): void` | Draws two horizontal strands (original and complement/transcript) with vertical lines connecting paired bases. Sets the canvas `aria-label` to describe the strand pair. |
| `drawStrand` | `(sequence: string, startX: number, startY: number, baseWidth: number, baseHeight: number, strandType: string, conversionType: ConversionType): void` | Draws a single horizontal strand of colored base rectangles with base letter labels. `strandType` is `"top"` or `"bottom"`, controlling which edge receives a backbone line. |
| `drawPolypeptideChain` | `(rnaSequence: string, width: number, height: number, padding: number): void` | Draws a polypeptide chain as connected circles, each representing an amino acid. Stops rendering at the first stop codon. Registers `mousemove` and `mouseout` event listeners for tooltip display. |
| `getAriaLabel` | `(sequence: string, conversionType: ConversionType): string` | Returns an accessible description of the visualization. For protein types, lists the amino acid names. For other types, describes the strand pair. |
| `cleanup` | `(): void` | Removes `mousemove` and `mouseout` event listeners from the canvas and nulls the handler references. Called internally before re-registering tooltip handlers. |

## Notes

- **DPR scaling**: The renderer reads `window.devicePixelRatio` and scales the canvas bitmap accordingly while keeping CSS dimensions at logical pixels. This ensures sharp rendering on high-DPI displays.
- **Mouse hover tooltips**: When `drawPolypeptideChain` is called, `mousemove` and `mouseout` listeners are registered on the canvas. Hovering over an amino acid circle displays a tooltip element (`.amino-acid-tooltip`) showing the amino acid name and codon. The `cleanup` method must be called to remove these listeners before re-rendering.
- **Aria labels**: The canvas `aria-label` attribute is set dynamically by `drawAntiparallelStrands` and `drawPolypeptideChain` to provide screen reader descriptions of the rendered content.
