---
sidebar_position: 3
---

# Composer

The Composer tab defines how captured content is arranged into a report.

## Overview

After capture, the Composer assembles your content into a deliverable format:
- Arrange screenshots and data
- Apply templates
- Add headers, footers, and text
- Generate PDF or image output

## Composition Options

### Template Selection

Choose from:
- **Default**: Auto-arranged based on capture type
- **Custom templates**: Your branded layouts
- **Grid**: Manual arrangement of elements

### Layout Controls

- Drag and drop captured elements
- Resize visualizations
- Add text blocks between sections
- Configure page breaks

## Template Variables

Use variables in your templates:

| Variable | Description |
|----------|-------------|
| `{{date}}` | Report generation date |
| `{{job_name}}` | Name of the job |
| `{{$varname}}` | Captured variable values |

## Output Formats

| Format | Use Case |
|--------|----------|
| PDF | Email attachments, archival |
| PNG | Slack/chat delivery |
| HTML | Web viewing |

## Headers and Footers

Configure persistent elements:
- Company logo
- Report title
- Page numbers
- Generation timestamp

## Preview

Use the **Preview** button to see how the final report will look before saving.

## Next Steps

- [Delivery](./delivery) - Configure report delivery
