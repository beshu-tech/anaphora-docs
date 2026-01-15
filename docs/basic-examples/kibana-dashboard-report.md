---
sidebar_position: 1
description: Step-by-step tutorial to create a scheduled Kibana dashboard PDF report with email delivery in Anaphora.
keywords: [Kibana report tutorial, scheduled dashboard, PDF email, Anaphora example, dashboard automation]
---

# Kibana Dashboard Report

Create a scheduled report that captures your Kibana dashboard and delivers it via email.

## Goal

Send a daily PDF report of a Kibana dashboard to your team every morning at 9 AM.

## Steps

### 1. Create a New Job

1. Navigate to **Jobs** in the sidebar
2. Click **Create New Job**
3. Enter a name: "Daily Dashboard Report"

### 2. Configure General Settings

- **Frequency**: Daily at 9:00 AM (or use CRON: `0 9 * * *`)
- **Description**: "Morning dashboard snapshot for the team"

### 3. Set Up Capture

1. Select **Kibana** as the connector
2. Enter your dashboard URL:
   ```
   https://your-kibana.example.com/app/dashboards#/view/abc123
   ```
3. Choose authentication method (Basic or saved profile)
4. Set time range: "Last 24 hours"

### 4. Configure Composition

1. Select a report template or use default
2. Preview the layout
3. Add header/footer if needed

### 5. Set Up Delivery

1. Select **Email** as delivery interface
2. Add recipient email addresses
3. Set subject line: `Daily Dashboard Report - {{date}}`

### 6. Test and Save

1. Click **Test** to run the job immediately
2. Verify the email arrives correctly
3. **Save** the job

## Result

Your team will receive a PDF report every morning with the latest dashboard data.

## Next Steps

- [Kibana Alert](./kibana-alert) - Add conditional logic to your reports
