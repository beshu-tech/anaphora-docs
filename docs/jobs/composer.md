---
sidebar_position: 3
description: Design professional PDF reports with Anaphora's block-based composer - layouts, branding, snapshots, and AI-generated content.
keywords: [ PDF report builder, report composer, branded reports, PDF layout, report template ]
---

# Composer - Report Builder

The Composer tab is where captured content becomes a professional report. Using a block-based editor, you can create
branded PDFs with custom layouts, text, images, and snapshots.

## Block Types

### Capture Blocks

| Block         | Description                                   |
|---------------|-----------------------------------------------|
| **Snapshots** | All captured screenshots                      |
| **Variables** | Captured texts, calculated values, AI results |

### Component Blocks

| Block       | Description                                        |
|-------------|----------------------------------------------------|
| **Text**    | Add any text to the report. Can contain variables. |
| **Image**   | Upload static images like logos                    |
| **Divider** | Horizontal line separator                          |
| **Spacer**  | Vertical whitespace                                |

## Layout

The report layout is built using a hierarchical structure of pages, rows, and cells.

| Structure | Description                                                   |
|-----------|---------------------------------------------------------------|
| **Page**  | Pages reflect PDF pagination. Every page consists of rows.    |
| **Row**   | Rows split pages horizontally into sections.                  |
| **Cell**  | Cells hold blocks within rows. Up to 3 cells can fit per row. |

## Text Blocks

A text block is a [Liquid](https://shopify.github.io/liquid/) template. It can show variables, for example
`{{ hits }}`, and use tags such as `{% if hits > 5 %}`.

### Errors in a Text Block

- The editor shows a syntax error in the place of the block. You cannot save a template with a syntax error.
- A template that fails only on the example values in the editor (for example a colour filter on a captured text) can
  still be saved.
- If a text block fails at run time, the report is **not delivered**. Anaphora keeps the report on the run, with the
  error in the place of the broken block, so you can open it and see where the template breaks. The Jobs list shows the
  job as **Not delivered**, and each delivery of the run names the page, row and column of the broken block.

### Limits

Report templates run in a separate process on the server:

| Limit                                         | Value              |
|-----------------------------------------------|--------------------|
| Time for all the text blocks of a report      | 10 seconds         |
| Memory                                        | 256 MB             |
| Liquid tags per template                      | 5,000              |
| Characters in the output of all text blocks   | 20 million         |

In the job editor, the preview renders one block at a time in your browser, with a 6-second limit per block.

The tags `{% include %}`, `{% render %}` and `{% layout %}` are not available. A template that uses one is refused as a
syntax error.

## Colours

A colour field accepts `#rrggbb`, `rgb()`, `rgba()`, `hsl()`, `hsla()` or a colour name. Anaphora refuses other values
when you save.

## Next Steps

- [Delivery](./delivery) - Configure where reports are sent
- [Basic Examples](../basic-examples/) - See complete job examples
