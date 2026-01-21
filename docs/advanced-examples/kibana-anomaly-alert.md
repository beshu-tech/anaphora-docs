---
sidebar_position: 2
description: Create sophisticated Kibana alerts based on statistical analysis and trend detection with Anaphora.
keywords: [ statistical alert, trend detection, Kibana analytics, anomaly detection, Anaphora statistics ]
---

# Kibana Anomaly Alert

Create alerts based on deviation from previous data.

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
	 - Enter your Kibana dashboard URL:
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
	 - Select **Kibana** as the connector
	 - Enter your Kibana dashboard URL:
		 ```
		 https://kibana.example.com/app/discover#/view/your-view-id
		 ```
	 - Ensure time range is set to last 15 minutes
5. Add another **Capture value** action to extract the current metric:
	 - Set the **variable name** to something like `current_value`
	 - Set **capture template** to `Kibana discover hits`
   - Set **Variable type** to `Number`
6. Add a **Calculate** action to compute the percentage change:
	 - Set **Operation** to `Percentage Change`

### 4. Configure Delivery

- Add delivery interface and configure recipients

## Next Steps

- [AI News Collation](./ai-news-collation) - AI-powered content processing
