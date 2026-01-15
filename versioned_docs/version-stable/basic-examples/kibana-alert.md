---
sidebar_position: 2
description: Create conditional Kibana alerts with Slack notifications when error thresholds are exceeded using Anaphora.
keywords: [Kibana alert, conditional notification, Slack alert, error threshold, Anaphora alerting]
---

# Kibana Alert

Create an alert that notifies you when specific conditions are met in your Kibana data.

## Goal

Send a Slack notification when the error count in your logs exceeds 100 in the last hour.

## Concept

In Anaphora, **an alert is a conditional report**. You create alerts by:
1. Capturing data from Kibana
2. Evaluating conditions
3. Only delivering the report when conditions are met

## Steps

### 1. Create a New Job

1. Navigate to **Jobs** > **Create New Job**
2. Name it: "Error Rate Alert"

### 2. Configure General Settings

- **Frequency**: Every 5 minutes (`*/5 * * * *`)
- **Throttling**: 1 hour (avoid notification fatigue)

:::tip Why Throttling?
Even if errors persist every 5 minutes, you'll only get one notification per hour.
:::

### 3. Set Up Advanced Capture

1. Toggle **Advanced** mode on
2. Add actions:

```
Navigate → Kibana Discover (filtered for errors, last 1 hour)
Wait for visible → .euiDataGrid__content
Capture value → [data-test-subj="discoverQueryHits"] → $errorCount
Conditional block → $errorCount > 100:
  └── Capture snapshot → Dashboard screenshot
```

### 4. Configure Delivery

1. Select **Slack** as delivery interface
2. Choose the alert channel
3. Message: `Alert: {{$errorCount}} errors in the last hour`

### 5. Test and Save

1. **Test** the job to verify the workflow
2. Check that conditions evaluate correctly
3. **Save** the job

## Result

You'll receive Slack alerts only when error count exceeds your threshold, with at most one notification per hour.

## Next Steps

- [Conditional Report](./conditional-report) - More complex conditions
