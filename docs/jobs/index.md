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
| [Capture](./jobs/capture) | What to capture and how, with [the AI step](./jobs/ai-step) |
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

The **AI** step of a capture flow asks an AI provider about what the flow captured:

```
Capture pages and values -> AI step fills variables -> Conditional block, report, delivery
```

- One call fills several variables, each with a type: text, number, yes/no or HTML.
- The AI can look at earlier runs of the job, do exact math, read the captured pages when it needs them, and keep a
  notebook between runs.
- The AI decides; the flow acts. A **Conditional block** and a **Break** act on what the AI fills.
- **Try it** runs the step on the values of the last run, and saves and sends nothing. An assistant can write the step
  from your words.
- Hard limits stop a step that runs too long, on top of the token budget of the provider.
- Works with any AI provider that uses the OpenAI API format.

See [The AI step](./jobs/ai-step).

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

### Built-in templates

**Create Job** offers these templates next to **Create New**. Each one uses the public Kibana demo at
`demo.elastic.co`: change the URLs to your own Kibana.

| Template                                  | What the job does                                                                 | See                                                                        |
|-------------------------------------------|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **Kibana Dashboard Snapshot**             | Takes a snapshot of a dashboard                                                   | [Kibana Dashboard Report](../basic-examples/kibana-dashboard-report.md)    |
| **Conditional Kibana Dashboard Snapshot** | Takes a snapshot only when the query hits match                                   | [Kibana Conditional Report](../basic-examples/kibana-conditional-report.md) |
| **Kibana Anomaly Detection**              | Sends an alert when the number of Discover results changes                        | [Kibana Anomaly Alert](../advanced-examples/kibana-anomaly-alert.md)       |
| **Kibana AI Triage**                      | Lets an AI provider rate the severity of the 5xx errors, and notifies from 7 of 10 | [AI providers](../administration/ai-providers.md#the-kibana-ai-triage-template) |

All the templates except **Kibana Dashboard Snapshot** are advanced templates: the Free edition does not have them.

## Next steps

- [General settings](./jobs/general): scheduling and throttling
- [Capture configuration](./jobs/capture): data extraction workflows
- [The AI step](./jobs/ai-step): AI that fills variables, looks at earlier runs and remembers
- [Composer](./jobs/composer): report design and branding
- [Delivery](./jobs/delivery): output channels and formats
