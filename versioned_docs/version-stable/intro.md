---
sidebar_position: 1
slug: /
---

# Welcome to Anaphora

**Anaphora** is a powerful tool for automated Kibana reporting and alerting. It enables you to schedule periodic data captures from Kibana dashboards, create conditional alerts, and deliver reports through various channels like email and chat.

## What is Anaphora?

Anaphora sits between your Kibana instance and your team, automatically capturing dashboard snapshots, extracting data, and delivering reports based on your schedule and conditions.

### Key Features

- **Scheduled Reports**: Capture Kibana dashboards, Canvas workpads, and Discover queries on a schedule
- **Conditional Alerts**: Define conditions that trigger reports only when thresholds are met
- **Multiple Delivery Channels**: Send reports via email, Slack, Microsoft Teams, and more
- **Throttling**: Control notification frequency to avoid alert fatigue
- **Template Composition**: Arrange captured visualizations into custom report layouts

## Quick Links

- [Getting Started](./getting-started/) - Learn the basics of creating your first job
- [Jobs](./getting-started/jobs) - Understand the core concept of Anaphora jobs
- [Delivery Interfaces](./delivery-interfaces/) - Configure how reports are delivered

## Architecture Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Kibana     │────▶│   Anaphora   │────▶│  Recipients  │
│  Dashboard   │     │    Job       │     │  (Email/Chat)│
└──────────────┘     └──────────────┘     └──────────────┘
```

Anaphora uses a headless browser to navigate to your Kibana instance, authenticate if needed, capture screenshots or data, and then compose and deliver the final report.

## Getting Help

- Browse the documentation using the sidebar
- Check the [GitHub repository](https://github.com/beshu-tech/anaphora-docs) for issues and discussions
- Visit [anaphora.it](https://anaphora.it) for product information
