---
sidebar_position: 3
---

# General Settings

The General Settings tab is where you configure the basic properties of your job, including its name, description, and timing configuration.

## Overview

![General Settings Tab](./images/capture-tab.png)

In this view, you configure:

- **Name**: A descriptive name for your job
- **Description**: Optional details about what this job does
- **Timing**: When and how often the job runs

## Timing Configuration

### Frequency

Set how often the job should run:

- **Every X minutes/hours/days**: Simple recurring schedule
- **Advanced (CRON)**: Use a CRON expression for complex schedules

Toggle the **Advanced** switch to enter a custom CRON string for precise scheduling control.

#### CRON Examples

| CRON Expression | Description |
|-----------------|-------------|
| `0 9 * * *` | Every day at 9:00 AM |
| `0 */2 * * *` | Every 2 hours |
| `0 9 * * 1-5` | Weekdays at 9:00 AM |
| `0 0 1 * *` | First day of every month |

### Throttling (Max Notify Frequency)

Throttling is a powerful feature that helps you avoid notification fatigue. It controls the **maximum notification frequency** regardless of how often the job runs.

:::tip Why Throttling Matters
Throttling lets you keep a high sampling rate (frequency) while avoiding flooding recipients when alerting thresholds are continuously met.
:::

**Example**:
- Job runs every 5 minutes to check for errors
- Throttling set to 3 hours
- Even if errors are detected every 5 minutes, recipients only receive one notification every 3 hours

## Configuration Fields

| Field | Description | Required |
|-------|-------------|----------|
| Name | Job identifier shown in lists and reports | Yes |
| Description | Optional notes about the job's purpose | No |
| Frequency | How often to run (or CRON in advanced mode) | Yes |
| Max Notify Freq | Minimum time between notifications | No |

## Next Steps

- [Basic Capture](./basic-capture) - Configure what to capture
- [Advanced Capture](./advanced-capture) - Set up complex workflows
