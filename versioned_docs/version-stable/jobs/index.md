---
sidebar_position: 4
description: Configure Anaphora jobs for automated report generation. Learn about capture, composer, delivery settings and conditional alerts.
keywords: [ Anaphora jobs, report scheduling, capture configuration, delivery settings, conditional alerts, headless browser ]
---

# Jobs - Automated Report Configuration

At the heart of Anaphora is the **Job**—a scheduled unit of execution that uses a headless browser to interact with web pages. A job is not just a screenshot tool; it is a programmable workflow that can navigate, interact, extract data, and apply conditional logic.

## Job Structure

Every job consists of four main components:

| Component | Description |
|-----------|-------------|
| [General](./jobs/general) | Name, description, scheduling, and throttling |
| [Capture](./jobs/capture) | What to capture and how |
| [Composer](./jobs/composer) | How to arrange content into a report |
| [Delivery](./jobs/delivery) | Where and how to send the report |

## Core Capabilities

### Navigate & Interact

Jobs can perform complex interactions with web applications:

- **Click elements** - Buttons, links, menu items
- **Type text** - Search boxes, form fields, filters
- **Enter** - Press Enter in a form field
- **Navigate** - Follow links, handle redirects, manage authentication
- **Wait conditions** - Wait for elements to appear (**Wait for visible**) or for a number of seconds (**Wait before continue**)

### Capture Data

Extract information in multiple formats:

| Capture Type | Use Case |
|--------------|----------|
| **Screenshots** | Visual snapshots of dashboards, charts, or specific elements |
| **Text extraction** | Pull specific values like counts, percentages, or status text |
| **Element capture** | Screenshot only a specific chart or panel |
| **Full page** | Capture the entire scrollable page |

### Logic & Control Flow

Implement sophisticated automation with:

- **Conditional execution** - **Conditional block** actions based on extracted values
- **Wait conditions** - **Wait for visible**, **Wait before continue**
- **Reload and retry** - **Reload** the page; **Retry on failure** retries a failed run
- **Variables** - Store and reuse extracted values throughout the workflow
- **Break conditions** - Stop execution if criteria are not met (useful for alerts)

## Job Types

### Report Jobs

Regular scheduled reports that always produce output:

- Daily dashboard snapshots
- Weekly metric summaries
- Monthly trend reports

### Alert Jobs

Conditional reports that only send when criteria are met:

- Error rate exceeds threshold
- Document count drops below minimum
- Custom conditions based on extracted values

:::tip
In Anaphora, **an alert is a conditional report**. You create alerts by adding conditions to your capture workflow that determine whether the report should be sent. Use the **Break** action to skip delivery when conditions aren't met.
:::

## AI-Powered Analysis

Jobs can integrate AI to analyze captured data:

```
Capture Dashboard -> Send to AI -> Receive Analysis -> Include in Report
```

- **Visual Analysis** - Pass screenshots to AI models to evaluate dashboard content
- **Text Summaries** - AI generates human-readable summaries of complex data
- **Anomaly Detection** - AI identifies unusual patterns or concerning trends
- **OpenAI Compatible** - Works with any AI provider using the OpenAI API format

## Visual Composer

Use the **Compose** tab to design professional reports:

| Setting | Description |
|---------|-------------|
| **Background** | Set colors or images for report sections |
| **Text styling** | Configure fonts, colors, and sizes |
| **Padding & spacing** | Control layout and whitespace |
| **Opacity** | Layer elements with transparency |
| **Branding** | Add logos and company colors |

Combine visual snapshots with AI-generated summaries for comprehensive, polished reports.

## Creating a Job

1. Go to **Jobs** in the sidebar
2. Click **Create Job**, then select **Create New** (or a template)
3. Configure each tab:
   - **General** - Set name, schedule, and basic settings
   - **Capture** - Define what to capture and extraction logic
   - **Compose** - Design the report layout and branding
   - **Deliver** - Select delivery channels and recipients
4. Test the job: click **Test capture** in the **Capture** tab, or a test run button in the **Deliver** tab
5. Click **Save**. A new job is active by default. Use the **Active** switch in the job list to suspend it or activate it again

## Next Steps

- [General Settings](./jobs/general) - Scheduling and throttling
- [Capture Configuration](./jobs/capture) - Data extraction workflows
- [Composer](./jobs/composer) - Report design and branding
- [Delivery](./jobs/delivery) - Output channels and formats
