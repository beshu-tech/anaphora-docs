---
sidebar_position: 1
description: Combine data from multiple sources like Kibana and Grafana into a single unified report using Anaphora.
keywords: [ multi-source report, combined dashboard, Kibana Grafana, unified report, Anaphora advanced ]
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

1. Navigate to **Jobs**
2. Click **Create New Job**

### 2. Configure General Settings

- **Frequency**: Weekly on Mondays at 8:00 AM

### 3. Set Up Advanced Capture

1. Enable **Advanced** mode to build a multi-capture workflow
2. Edit the preexisting **Navigate**-action:
	- Select **Kibana** as the connector
	- Enter your Kibana dashboard URL:
		 ```
		 https://kibana.example.com/app/dashboards#/view/application-metrics
		 ```
	- Choose authentication method: **ReadonlyREST** and add credentials
	- Ensure **Take Snapshot** is checked
3. Add a second **Navigate** action:
	- Select **Grafana** as the connector
	- Enter your Grafana dashboard URL:
		 ```
		 https://grafana.example.com/d/xyz789/infrastructure-health?orgId=1
		 ```
	- Set **Authentication** to `Grafana` and add credentials
	- Ensure **Take Snapshot** is checked
4. Add a third **Navigate** action:
	- Select **Web Page** as the connector
	- Enter your service status page URL:
		 ```
		 https://status.example.com
		 ```
	- No authentication needed
	- Ensure **Take Snapshot** is checked

### 4. Configure Composition

1. Add all three captured snapshots to the report
2. Arrange them in the desired order
3. Add headers and explanatory text as needed

### 4. Configure Delivery

- Add delivery interface and configure recipients
