---
sidebar_position: 2
description: Create conditional Kibana alerts with Slack notifications when error thresholds are exceeded using Anaphora.
keywords: [ Kibana alert, conditional notification, Slack alert, error threshold, Anaphora alerting ]
---

# Kibana Alert

Create an alert that notifies you when specific conditions are met in your Kibana data.

## Goal

Send a notification when the error count in your logs exceeds 100 in the last hour.

## Concept

In Anaphora, **an alert is a conditional report**. You create alerts by:

1. Capturing data from Kibana
2. Evaluating conditions
3. Only delivering the report when conditions are met

## Steps

### 1. Create a New Job

1. Navigate to **Jobs**
2. Click **Create New Job**

### 2. Configure General Settings

- **Frequency**: Every 5 minutes (`*/5 * * * *`)
- **Max notify frequency**: 3 hours (avoid notification fatigue)

:::tip Why Throttling?
Even if errors persist every 5 minutes, you'll only get one notification in 3 hours.
:::

### 3. Set Up Capture

1. Select **Kibana** as the connector
2. Enter your Kibana discover URL:
	 	```
		 https://kibana.example.com/app/discover#/view/your-view-id
		 ```
3. Choose authentication method: **ReadonlyREST** and add credentials
4. Check **Deliver report only if conditions are met**
5. Set Hits to be greater than `100`

### 4. Configure Delivery

1. Select a delivery interface
2. Modify the body: `Alert: {{kibanaDiscoverHits}} errors in the last hour`

### 5. Test and Save

1. **Test** the job to verify the workflow
2. Check that conditions evaluate correctly
3. **Save** the job

## Result

You'll receive alerts only when error count exceeds your threshold, with at most one notification per hour.

## Next Steps

- [Conditional Report](./conditional-report) - Need to also take a dashboard screenshot when the condition is met? See
	how to use actions for conditional reports.
