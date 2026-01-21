---
sidebar_position: 3
description: Create intelligent alerts that trigger when conditions are met, with AI-powered root cause analysis and detailed PDF reports.
keywords: [ Anaphora alerts, conditional alerting, AI root cause analysis, multi-system monitoring, intelligent notifications ]
---

# Conditional Report

Create reports that will only be built and delivered when specific conditions are met.

## Goal

In this example, we will check the Kibana discover page for error logs. Then we will capture a snapshot of a dashboard.
The report with the captured dashboard will only be delivered if the number of errors exceeds a defined threshold.

## Steps

### 1. Create a new job

1. Navigate to **Jobs**
2. Click **Create New Job**

### 2. Configure General Settings

- **Frequency**: Every hour
- **Max Notify Frequency**: 12 hours

### 3. Set Up Capture

1. Enable **Advanced** mode to build a conditional workflow
2. In the preexisting **Navigate**-action:
	- select **Kibana** as the connector
	- Enter your Kibana discover URL:
		```
		https://kibana.example.com/app/discover#/view/your-view-id
		```
	- Choose authentication method: **ReadonlyREST** and add credentials
3. Add a **Capture value** action to extract the number of error logs:
	- Set the **variable name** to something like `error_count`
	- Set **capture template** to `Kibana discover hits`
	- Set **Variable type** to `Number`
4. Add a **Conditional block** to check if the error count is smaller than the threshold:
	- Choose **Variable**: `error_count`
	- Set **Condition operation** to `Lesser than`
	- Set **Condition value** to `100`
5. Inside the conditional block, add a **Break** action to stop execution if the condition is met (i.e., error count is
	 below threshold)
6. Add another **Navigate** action
	- Select **Kibana** as the connector
	- Enter your Kibana dashboard URL:
		```
		https://kibana.example.com/app/dashboards#/view/your-dashboard-id
		```
	- Ensure that **Take Snapshot** is checked and set the configuration properly

### 4. Compose the Report

1. Add the captured snapshot
2. If desired, add a text block with the `{{error_count}}` variable to show the number of errors
3. Add headers and other text as needed

### 5. Set Up Delivery

1. Select **Email** as delivery interface (needs to be configured first in **Delivery Interfaces**)
2. Add recipient email addresses

## Next Steps

- [Grafana Dashboard Report](./grafana-dashboard-report) - Add Grafana to your monitoring
- [AI Analysis](../advanced-examples/ai-news-collation) - More AI-powered workflows
