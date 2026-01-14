---
sidebar_position: 4
---

# Grafana Dashboard Report

Capture and deliver Grafana dashboards on a schedule.

## Goal

Send a daily infrastructure health report from Grafana to your ops team.

## Steps

### 1. Create a New Job

1. Navigate to **Jobs** > **Create New Job**
2. Name it: "Infrastructure Health Report"

### 2. Configure General Settings

- **Frequency**: Daily at 7:00 AM
- **Description**: "Daily infrastructure metrics from Grafana"

### 3. Set Up Capture

1. Select **Grafana** as the connector (or Generic URL)
2. Enter your Grafana dashboard URL:
   ```
   https://grafana.example.com/d/abc123/infrastructure?orgId=1
   ```
3. Configure authentication (API key or basic auth)
4. Set time range parameters in the URL if needed

### 4. Configure Composition

1. Choose how to arrange captured panels
2. Select PDF or image output format
3. Add custom header with date/time

### 5. Set Up Delivery

1. Choose delivery interface (Email, Slack, etc.)
2. Configure recipients
3. Set appropriate subject/message

### 6. Test and Save

Verify the capture looks correct and save.

## Tips for Grafana

- Use the `kiosk=tv` URL parameter for cleaner captures
- Set explicit time ranges in URL for consistent reports
- Consider capturing individual panels for more control

## Next Steps

- [Advanced Examples](../advanced-examples/) - Complex multi-source reports
