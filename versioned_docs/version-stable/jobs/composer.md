---
sidebar_position: 3
description: Design professional PDF reports with Anaphora's block-based composer - layouts, branding, snapshots, and AI-generated content.
keywords: [PDF report builder, report composer, branded reports, PDF layout, report template]
---

# Composer - Report Builder

The Composer tab is where captured content becomes a professional report. Using a block-based editor, you can create branded PDFs with custom layouts, text, images, and snapshots.

## Overview

After capture, the Composer assembles your content into a deliverable format:

```
┌─────────────────────────────────────────────────────────────┐
│                     Report Page                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Logo]     Company Dashboard Report                │    │
│  │             Generated: {{date}}                     │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │   $dashboard_a       │  │   $dashboard_b       │        │
│  │   (Snapshot)         │  │   (Snapshot)         │        │
│  └──────────────────────┘  └──────────────────────┘        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  AI Analysis: {{$ai_summary}}                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                         Page 1 of 2                         │
└─────────────────────────────────────────────────────────────┘
```

## Block Types

### Content Blocks

| Block | Description |
|-------|-------------|
| **Snapshot** | Insert captured screenshot (from variable) |
| **Text** | Headings, paragraphs, metadata |
| **Image** | Logos, icons, decorative images |
| **AI Content** | AI-generated analysis or summary |

### Layout Blocks

| Block | Description |
|-------|-------------|
| **Columns** | Multi-column layouts (2, 3, or custom) |
| **Divider** | Horizontal line separator |
| **Spacer** | Vertical whitespace |
| **Page Break** | Force new page |

### Structure Blocks

| Block | Description |
|-------|-------------|
| **Header** | Repeating page header |
| **Footer** | Repeating page footer |
| **Container** | Grouping with background/border |

## Block Editor

### Adding Blocks

1. Click **+ Add Block** or use the block palette
2. Select block type
3. Configure block properties
4. Drag to reposition

### Block Properties

Each block has configurable properties:

**Text Block Properties:**
| Property | Options |
|----------|---------|
| Content | Text with variable support |
| Heading Level | H1, H2, H3, paragraph |
| Alignment | Left, center, right |
| Font Size | Custom or preset sizes |
| Color | Text color picker |

**Snapshot Block Properties:**
| Property | Options |
|----------|---------|
| Variable | Select from captured snapshots |
| Size | Width/height or auto |
| Border | None, thin, medium |
| Caption | Optional text below image |

**Container Properties:**
| Property | Options |
|----------|---------|
| Background | Color or image |
| Padding | Inner spacing |
| Border | Style, color, radius |
| Opacity | Transparency level |

## Branding & Styling

### Global Styles

Set default styles for the entire report:

| Setting | Description |
|---------|-------------|
| **Page Size** | A4, Letter, or custom dimensions |
| **Margins** | Top, bottom, left, right spacing |
| **Font Family** | Default typeface |
| **Colors** | Primary, secondary, accent colors |

### Branded Reports

Create professional branded reports:

1. **Logo placement** — Header, footer, or watermark
2. **Color scheme** — Match corporate brand colors
3. **Typography** — Use brand-approved fonts
4. **Backgrounds** — Subtle patterns or gradients

### Example: Corporate Template

```
Header:
├── Logo (left)
├── Report Title (center)
└── Date (right)

Body:
├── Executive Summary (text)
├── Dashboard Snapshot (full width)
├── Two-Column Layout:
│   ├── Metrics Panel (left)
│   └── Trend Chart (right)
└── AI Analysis (text)

Footer:
├── Company Name (left)
├── Page Number (center)
└── Confidentiality Notice (right)
```

## Template Variables

Insert dynamic content using variables:

### System Variables

| Variable | Description | Example Output |
|----------|-------------|----------------|
| `{{date}}` | Report date | "January 15, 2025" |
| `{{time}}` | Report time | "09:30 AM" |
| `{{datetime}}` | Full timestamp | "2025-01-15 09:30:00" |
| `{{job_name}}` | Job name | "Daily Dashboard Report" |
| `{{job_id}}` | Job identifier | "job-123abc" |

### Captured Variables

Variables from the Capture workflow:

| Syntax | Description |
|--------|-------------|
| `{{$snapshot_name}}` | Insert captured snapshot |
| `{{$value_name}}` | Insert captured text value |
| `{{$calculated}}` | Insert calculated result |

### AI Variables

When using AI providers:

| Variable | Description |
|----------|-------------|
| `{{$ai_summary}}` | AI-generated summary |
| `{{$ai_analysis}}` | AI analysis of captured data |

## Multi-Page Reports

### Page Management

- **Add Page** — Create additional pages
- **Page Order** — Drag pages to reorder
- **Page Break** — Force content to next page
- **Continuous** — Let content flow naturally

### Page-Specific Content

Each page can have:
- Different layouts
- Unique content blocks
- Shared headers/footers (optional)

## Output Formats

| Format | Use Case | Notes |
|--------|----------|-------|
| **PDF** | Email attachments, archival | Most common, best quality |
| **PNG** | Slack, chat apps | Single image, limited pages |
| **JPEG** | Smaller file size | Compressed, some quality loss |
| **HTML** | Web viewing | Interactive, larger file |

## Templates

### Saving Templates

Save your composition as a reusable template:

1. Design your report layout
2. Click **Save as Template**
3. Name and categorize
4. Reuse across jobs

### Template Library

- **Default templates** — Pre-built layouts
- **Custom templates** — Your saved designs
- **Shared templates** — Available within your Space

## Preview & Testing

### Preview Mode

Click **Preview** to see the final rendered report:
- Actual PDF rendering
- Variable substitution
- Page breaks and layout
- Real captured content (if available)

### Test Run

For complete validation:
1. Run a test capture from Capture tab
2. Switch to Composer
3. Preview with actual data
4. Adjust layout as needed

## Best Practices

### Layout Tips

- Use consistent margins and spacing
- Keep important content above the fold on page 1
- Use page breaks to control pagination
- Test with different data volumes

### Performance

- Optimize image sizes before upload
- Limit complex layouts on high-frequency jobs
- Use appropriate output format for delivery channel

### Accessibility

- Use sufficient color contrast
- Include alt text for images
- Maintain readable font sizes
- Use clear heading hierarchy

## Next Steps

- [Delivery](./delivery) - Configure where reports are sent
- [Basic Examples](../basic-examples/) - See complete job examples
