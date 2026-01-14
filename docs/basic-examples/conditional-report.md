---
sidebar_position: 3
---

# Conditional Report

Create reports that only send when specific criteria are met.

## Goal

Send a weekly report, but only if there were significant events during the week.

## Use Cases

- Weekly summaries only when there's data worth reporting
- Monthly reports only if thresholds were exceeded
- On-demand reports triggered by data patterns

## Steps

### 1. Create a New Job

1. Navigate to **Jobs** > **Create New Job**
2. Name it: "Weekly Summary (Conditional)"

### 2. Configure General Settings

- **Frequency**: Weekly on Monday at 8:00 AM (`0 8 * * 1`)

### 3. Set Up Advanced Capture

1. Toggle **Advanced** mode
2. Build your condition workflow:

```
Navigate → Your metrics dashboard
Capture value → Total events element → $eventCount
Conditional block → $eventCount > 10:
  ├── Capture snapshot → Full dashboard
  └── (Continue to Compose/Deliver)
Break → (If condition not met, stop here)
```

### 4. Configure Composition

Design your report template:
- Include the captured dashboard
- Add dynamic text: `{{$eventCount}} events this week`

### 5. Set Up Delivery

Configure your preferred delivery method.

### 6. Test and Save

Test with different scenarios to ensure conditions work correctly.

## How It Works

The **Break** action stops execution without sending a report. Combined with conditional blocks, you control exactly when reports are delivered.

## Next Steps

- [Grafana Dashboard Report](./grafana-dashboard-report) - Work with Grafana
