---
sidebar_position: 4
description: Configure Anaphora jobs for automated report generation. Learn about capture, composer, delivery settings and conditional alerts.
keywords: [Anaphora jobs, report scheduling, capture configuration, delivery settings, conditional alerts]
---

# Jobs - Automated Report Configuration

A **job** is the core building block in Anaphora. It represents a scheduled task that captures data, composes reports, and delivers them to recipients.

## Job Structure

Every job consists of four main components:

| Component | Description |
|-----------|-------------|
| [General](./jobs/general) | Name, description, scheduling, and throttling |
| [Capture](./jobs/capture) | What to capture and how |
| [Composer](./jobs/composer) | How to arrange content into a report |
| [Delivery](./jobs/delivery) | Where and how to send the report |

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
In Anaphora, **an alert is a conditional report**. You create alerts by adding conditions to your capture workflow that determine whether the report should be sent.
:::

## Creating a Job

1. Navigate to **Jobs** in the sidebar
2. Click **Create New**
3. Configure each tab: General → Capture → Composer → Delivery
4. Test the job
5. Save and activate
