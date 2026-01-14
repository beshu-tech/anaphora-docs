---
sidebar_position: 1
description: Get started with Anaphora - automated Kibana and Grafana report generation. Install, configure, and create your first scheduled dashboard report.
keywords: [Anaphora setup, Kibana reports installation, Grafana reports setup, automated reporting, dashboard scheduling, AI reports]
---

# Getting Started with Anaphora

Welcome to Anaphora! This guide will help you install and configure Anaphora for automated Kibana and Grafana reporting.

## What is Anaphora?

**Anaphora** is a powerful automation and reporting tool designed to streamline the capture, analysis, and delivery of data from web-based dashboards. Unlike simple screenshot tools, Anaphora provides programmable workflows that can navigate, interact with, and extract data from complex web applications.

### Core Capabilities

| Capability | Description |
|------------|-------------|
| **Capture** | Screenshots, data extraction, and interaction with Kibana, Grafana, or any web page |
| **Compose** | Build branded reports with visual snapshots and AI-generated summaries |
| **Deliver** | Send reports via email, Slack, webhooks, or export as PDF |
| **Automate** | Schedule jobs with conditional logic, variables, and control flow |

### Key Features

- **Headless Browser Automation** - Navigate, click, type, and interact with any web application
- **AI-Powered Analysis** - Pass captured snapshots to AI models for intelligent summaries (DeepSeek API compatible)
- **Visual Report Designer** - Brand your reports with custom colors, backgrounds, padding, and layouts
- **Multi-Tenant Spaces** - Isolated workspaces with role-based access control (RBAC)
- **Enterprise Security** - LDAP, SAML, and OpenID Connect authentication

## How It Works

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Capture   │ -> │   Analyze   │ -> │   Compose   │ -> │   Deliver   │
│             │    │             │    │             │    │             │
│ Screenshots │    │ AI Insights │    │ Brand &     │    │ Email/Slack │
│ Data Values │    │ Conditions  │    │ Format      │    │ Webhook/PDF │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

1. **Capture**: A scheduled job uses a headless browser to navigate to your dashboard, interact with it, and capture screenshots or extract specific values
2. **Analyze**: Apply conditional logic or pass captures to AI for intelligent analysis
3. **Compose**: Combine captures and AI summaries into a branded, professional report
4. **Deliver**: Send the final report to recipients via your configured delivery channels

## Quick Start

1. [Install Anaphora](./getting-started/installation) using Docker or your preferred method
2. [Configure](./getting-started/configuration) your connections and settings
3. Follow the [Basic Examples](./basic-examples/) to create your first job

## Use Cases

### Scheduled Reports
- Daily Kibana dashboard snapshots for stakeholders
- Weekly metric summaries from Grafana
- Monthly trend reports combining multiple data sources

### Intelligent Alerts
- Notify when error rates exceed thresholds
- Alert when document counts drop below minimum
- AI-analyzed anomaly detection with contextual summaries

### Compliance & Auditing
- Automated evidence capture for compliance requirements
- Historical record of dashboard states
- Audit trails with timestamps and delivery confirmations

## Next Steps

- [Installation](./getting-started/installation) - Get Anaphora running
- [Configuration](./getting-started/configuration) - Set up connections and preferences
- [Basic Examples](./basic-examples/) - Create your first report job
