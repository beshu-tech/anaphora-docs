---
sidebar_position: 4
description: Capture and deliver scheduled Grafana dashboard reports with Anaphora for infrastructure monitoring.
keywords: [ Grafana report, dashboard capture, infrastructure monitoring, scheduled report, Anaphora Grafana ]
---

# Grafana Dashboard Report

Capture and deliver Grafana dashboards on a schedule.

## Goal

Send a daily infrastructure health report from Grafana to your ops team.

## Steps

### 1. Create a New Job

1. Navigate to **Jobs**
2. Click **Create New Job**

### 2. Configure General Settings

- **Frequency**: Daily at 7:00 AM

### 3. Set Up Capture

1. Select **Grafana** as the connector
2. Enter your Grafana dashboard URL:
	  ```
		https://grafana.example.com/d/abc123/infrastructure?orgId=1
		```
3. Set **Authentication** to `Grafana` and add credentials

### 4. Configure Composition

1. Choose how to arrange captured panels
2. Add texts or headers as needed

### 5. Set Up Delivery

1. Choose delivery interface (Email, Slack, etc.)
2. Configure recipients

### 6. Test and Save

Verify the capture looks correct and save.

## Next Steps

- [Advanced Examples](../advanced-examples/) - Unlock more complex report scenarios
