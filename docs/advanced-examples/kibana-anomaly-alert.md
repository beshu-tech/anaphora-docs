---
sidebar_position: 2
description: Create sophisticated Kibana alerts based on statistical analysis and trend detection with Anaphora.
keywords: [ statistical alert, trend detection, Kibana analytics, anomaly detection, Anaphora statistics ]
---

# Kibana Anomaly Alert

Create alerts based on deviation from previous data.

:::tip Kibana Anomaly Detection Template
The **Kibana Anomaly Alert** Template demonstrates this example for the Kibana demo instance. You can use it as a
starting point for your own anomaly detection jobs.
:::

## Goal

Alert when metrics deviate significantly from the previous time window.

## Use Cases

- Anomaly detection for response times
- Traffic spike alerts
- Resource utilization warnings

## Steps

### 1. Create the Job

1. Navigate to **Jobs**
2. Click **Create New Job**

### 2. Configure General Settings

- **Frequency**: Every 15 minutes
- **Max Notify Frequency**: 3 hours

### 3. Configure Advanced Capture

1. Enable **Advanced** mode
2. In the preexisting **Navigate**-action:
    - select **Kibana** as the connector
    - Enter your Kibana discover URL:
       ```
       https://kibana.example.com/app/discover#/view/your-view-id
       ```
    - Choose authentication method: **ReadonlyREST** and add credentials
    - Set time range to 30 minutes to 15 minutes ago
3. Add a **Capture value** action to extract the metric to monitor:
    - Set the **variable name** to something like `previous_value`
    - Set **capture template** to `Kibana discover hits`
    - Set **Variable type** to `Number`
4. Add another **Navigate** action to get the current value:
    - select **Kibana** as the connector
    - Enter your Kibana discover URL:
       ```
       https://kibana.example.com/app/discover#/view/your-view-id
       ```
    - Set time range to last 15 minutes
5. Add another **Capture value** action to extract the current metric:
    - Set the **variable name** to something like `current_value`
    - Set **capture template** to `Kibana discover hits`
    - Set **Variable type** to `Number`
6. Add a **Calculate** action to compute the percentage change:
    - Set **Variable name** to something like `percent_change`
    - Set **Operation** to `round(abs((current_value - previous_value) / previous_value) * 100)`
7. Add a **Conditional block** to check if the percentage change is below the threshold:
    - Choose **Variable**: `percent_change`
    - Set **Condition operation** to `Lesser than`
    - Set **Condition value** to `20` (for 20% change)
8. Inside the conditional block, add a **Break** action to stop execution if the condition is met (i.e., change is below
   threshold)

### 4. Configure Delivery

- Add delivery interface and configure recipients

## Next Steps

- [AI News Collation](./ai-news-collation) - AI-powered content processing
