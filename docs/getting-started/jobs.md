---
sidebar_position: 2
---

# Jobs

A **job** is the core building block in Anaphora. It represents a periodic data capture from a web page that can optionally fill a template and be sent to recipients through a delivery interface.

## What is a Job?

Think of a job as an automated task that:

1. Runs on a schedule (e.g., every hour, daily at 9 AM)
2. Opens a headless browser and navigates to a URL
3. Captures data or takes screenshots
4. Optionally evaluates conditions (for alerts)
5. Composes a report from the captured content
6. Delivers the report to configured recipients

## Job Components

Every job consists of four main parts:

| Component | Description |
|-----------|-------------|
| **General** | Name, description, and timing configuration |
| **Capture** | What to capture and how (URL, authentication, actions) |
| **Compose** | How to arrange captured content into a report |
| **Deliver** | Where and how to send the final report |

## Job Types

### Report Jobs

Regular scheduled reports that always send output:
- Daily dashboard snapshots
- Weekly metric summaries
- Monthly trend reports

### Alert Jobs

Conditional reports that only send when criteria are met:
- Error rate exceeds threshold
- Document count drops below minimum
- Custom conditions based on extracted values

:::tip
In Anaphora, **an alert is modeled as a conditional report**. You create an alert by adding conditions to your capture workflow that determine whether the report should be sent.
:::

## Creating a Job

To create a new job:

1. Navigate to **Jobs** in the sidebar
2. Click **Create New**
3. Configure each tab: General → Capture → Compose → Deliver
4. Save and activate the job

## Next Steps

- [General Settings](./general-settings) - Configure job timing and throttling
- [Basic Capture](./basic-capture) - Set up simple captures
- [Advanced Capture](./advanced-capture) - Create complex workflows with conditions
