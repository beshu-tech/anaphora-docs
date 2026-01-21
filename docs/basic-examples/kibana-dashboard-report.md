---
sidebar_position: 1
description: Step-by-step tutorial to create a scheduled Kibana dashboard PDF report with email delivery in Anaphora.
keywords: [ Kibana report tutorial, scheduled dashboard, PDF email, Anaphora example, dashboard automation ]
---

# Kibana Dashboard Report

Create a scheduled report that captures your Kibana dashboard and delivers it via email.

## Goal

Send a daily PDF report of a Kibana dashboard to your team every morning at 9 AM.

## Steps

### 1. Create a New Job

1. Navigate to **Jobs** in the sidebar
2. Click **Create New Job**

### 2. Configure General Settings

- **Frequency**: Daily at 9:00 AM (or use CRON: `0 9 * * *`)

### 3. Set Up Capture

1. Select **Kibana** as the connector
2. Enter your dashboard URL:
	 ```
	 https://your-kibana.example.com/app/dashboards#/view/abc123
	 ```
3. Choose authentication method: **ReadonlyREST** and add credentials
4. Set time range: "Last 24 hours"

### 4. Configure Composition

1. Drag the captured dashboard snapshot into the layout
2. Add additional text blocks if needed
3. Adjust the layout for optimal viewing

### 5. Set Up Delivery

1. Select **Email** as delivery interface (needs to be configured first in **Delivery Interfaces**)
2. Add recipient email addresses

### 6. Test and Save

1. Use the test to send a sample report to your email
2. Verify the email arrives correctly
3. **Save** the job

## Result

Your team will receive a PDF report every morning with the latest dashboard data.

## Next Steps

- [Kibana Alert](./kibana-alert) - Add conditional logic to your reports
