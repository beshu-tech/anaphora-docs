---
sidebar_position: 1
---

# Getting Started

Welcome to Anaphora! This guide will help you understand the key components and get you up to speed with the basics of automated Kibana reporting and alerting.

## Overview

Anaphora enables you to create scheduled jobs that:

1. **Capture** data or screenshots from Kibana dashboards
2. **Compose** the captured content into a report template
3. **Deliver** the report to recipients via email, chat, or other channels

## Key Concepts

### Jobs

A [job](./jobs.md) is the fundamental unit in Anaphora. It defines:
- What to capture (which Kibana URL)
- When to capture (schedule/frequency)
- What conditions must be met (for alerts)
- Where to deliver the report

### Capture Modes

Anaphora supports two capture modes:

- **[Basic Capture](./basic-capture.md)**: Simple screenshot capture of a Kibana URL
- **[Advanced Capture](./advanced-capture.md)**: Complex workflows with multiple actions, conditions, and data extraction

### Workflow

```
General Settings → Capture → Compose → Deliver
```

Each job follows this workflow:
1. Configure [general settings](./general-settings.md) (name, schedule, throttling)
2. Set up [capture](./basic-capture.md) (URL, authentication, what to capture)
3. Design the report composition (arrange visualizations)
4. Configure delivery (recipients, channels)

## Next Steps

- [Understand Jobs](./jobs.md) - Learn what jobs are and how they work
- [General Settings](./general-settings.md) - Configure job timing and throttling
- [Basic Capture](./basic-capture.md) - Set up simple dashboard captures
- [Advanced Capture](./advanced-capture.md) - Create complex capture workflows with alerts
