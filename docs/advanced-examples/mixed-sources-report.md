---
sidebar_position: 1
description: Combine data from multiple sources like Kibana and Grafana into a single unified report using Anaphora.
keywords: [multi-source report, combined dashboard, Kibana Grafana, unified report, Anaphora advanced]
---

# Mixed Sources Report

Create reports that combine data from multiple sources into a single deliverable.

## Goal

Generate a weekly executive report combining:
- Kibana: Application metrics dashboard
- Grafana: Infrastructure health
- Web page: Service status page

## Use Cases

- Executive summaries pulling from multiple monitoring tools
- Cross-platform incident reports
- Unified operational dashboards

## Steps

### 1. Create a New Job

Name it: "Weekly Executive Summary"

### 2. Configure Advanced Capture

Build a multi-source workflow:

```
# Source 1: Kibana Application Metrics
Navigate → Kibana dashboard URL
Wait for visible → .dashboard-container
Capture snapshot → $appMetrics

# Source 2: Grafana Infrastructure
Navigate → Grafana dashboard URL
Wait for visible → .react-grid-layout
Capture snapshot → $infraMetrics

# Source 3: Status Page
Navigate → https://status.example.com
Capture snapshot → $statusPage
```

### 3. Configure Composition

Arrange the three captures in your report template:
1. Header with date and title
2. Application metrics section
3. Infrastructure metrics section
4. Status page summary

### 4. Deliver

Send the combined report to your executive team.

## Tips

- Use consistent time ranges across sources
- Consider adding summary text between sections
- Test each source individually before combining
