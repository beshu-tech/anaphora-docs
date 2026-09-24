---
sidebar_position: 4
description: Configure Anaphora jobs for automated report generation. Learn about capture, composer, delivery settings and conditional alerts.
keywords: [ Anaphora jobs, report scheduling, capture configuration, delivery settings, conditional alerts, headless browser ]
---

# Jobs: automated report configuration

The central unit of Anaphora is the job: a scheduled unit of execution that uses a headless browser to interact with
web pages. A job is a programmable workflow. It can navigate, interact, extract data, and apply conditional logic.

## Job structure

Every job has four main components:

| Component | Description |
|-----------|-------------|
| [General](./jobs/general) | Name, description, scheduling, and throttling |
| [Capture](./jobs/capture) | What to capture and how |
| [Composer](./jobs/composer) | How to arrange content into a report |
| [Delivery](./jobs/delivery) | Where and how to send the report |

## Core capabilities

### Navigate and interact

Jobs can do complex interactions with web applications:

- Click elements: buttons, links, menu items
- **Type text**: search boxes, form fields, filters
- **Enter**: press Enter in a form field
- **Navigate**: follow links, handle redirects, manage authentication
- Wait conditions: wait for elements to appear (**Wait for visible**) or for a number of seconds (**Wait before continue**)

### Capture data

Extract information in several formats:

| Capture type | Use case |
|--------------|----------|
| Screenshots | Visual snapshots of dashboards, charts, or specific elements |
| Text extraction | Pull specific values like counts, percentages, or status text |
| Element capture | Screenshot only a specific chart or panel |
| **Full page** | Capture the entire scrollable page |

### Logic and control flow

Build the automation logic with:

- Conditional execution: **Conditional block** actions based on extracted values
- Wait conditions: **Wait for visible**, **Wait before continue**
- Reload and retry: **Reload** the page. **Retry on failure** retries a failed run.
- Variables: store extracted values and use them again anywhere in the workflow
- Break conditions: stop execution if criteria are not met (useful for alerts)

## Job types

### Report jobs

Regular scheduled reports that always produce output:

- Daily dashboard snapshots
- Weekly metric summaries
- Monthly trend reports

### Alert jobs

Conditional reports that send only when criteria are met:

- Error rate exceeds threshold
- Document count drops below minimum
- Custom conditions based on extracted values

:::tip
In Anaphora, an alert is a conditional report. To create an alert, add conditions to your capture workflow. The
conditions decide whether the report is sent. Use the **Break** action to skip delivery when conditions are not met.
:::

## AI-powered analysis

Jobs can use AI to analyze captured data:

```
Capture Dashboard -> Send to AI -> Receive Analysis -> Include in Report
```

- Visual analysis: pass screenshots to AI models to evaluate dashboard content
- Text summaries: AI generates human-readable summaries of complex data
- Anomaly detection: AI identifies unusual patterns or concerning trends
- OpenAI compatible: works with any AI provider that uses the OpenAI API format

## Visual composer

Use the **Compose** tab to design reports:

| Setting | Description |
|---------|-------------|
| **Background** | Set colors or images for report sections |
| **Text styling** | Configure fonts, colors, and sizes |
| **Padding & spacing** | Control layout and whitespace |
| **Opacity** | Layer elements with transparency |
| **Branding** | Add logos and company colors |

You can combine visual snapshots with AI-generated summaries in one report.

## Creating a job

1. Go to **Jobs** in the sidebar
2. Click **Create Job**, then select **Create New** (or a template)
3. Configure each tab:
   - **General**: set the name, schedule, and basic settings
   - **Capture**: define what to capture and the extraction logic
   - **Compose**: design the report layout and branding
   - **Deliver**: select delivery channels and recipients
4. Test the job: click **Test capture** in the **Capture** tab, or a test run button in the **Deliver** tab
5. Click **Save**. A new job is active by default. Use the **Active** switch in the job list to suspend it or activate it again

## Next steps

- [General settings](./jobs/general): scheduling and throttling
- [Capture configuration](./jobs/capture): data extraction workflows
- [Composer](./jobs/composer): report design and branding
- [Delivery](./jobs/delivery): output channels and formats
