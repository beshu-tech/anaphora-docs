---
sidebar_position: 2
description: Create sophisticated Kibana alerts based on statistical analysis and trend detection with Anaphora.
keywords: [statistical alert, trend detection, Kibana analytics, anomaly detection, Anaphora statistics]
---

# Kibana Statistical Alert

Create alerts based on statistical analysis and trend detection.

## Goal

Alert when metrics deviate significantly from their normal baseline.

## Use Cases

- Anomaly detection for response times
- Traffic spike alerts
- Resource utilization warnings

## Steps

### 1. Create the Job

Name it: "Response Time Anomaly Alert"

### 2. Configure Advanced Capture

```
# Capture current value
Navigate → Kibana dashboard with avg response time
Capture value → [data-test-subj="avgResponseTime"] → $current

# Capture baseline (you might get this from a saved search)
Navigate → Kibana baseline metrics
Capture value → [data-test-subj="baselineAvg"] → $baseline

# Calculate deviation
Calculate → (($current - $baseline) / $baseline) * 100 → $deviation

# Alert if deviation exceeds threshold
Conditional block → $deviation > 50:
  ├── Capture snapshot → Full dashboard
  └── Continue to delivery
Break
```

### 3. Configure Delivery

- **Channel**: Slack or PagerDuty webhook
- **Message**: `Response time anomaly: {{$current}}ms ({{$deviation}}% above baseline)`

### 4. Set Throttling

Set appropriate throttling to avoid alert fatigue during prolonged incidents.

## Advanced: Rolling Averages

For more sophisticated analysis, consider:
- Capturing multiple time periods
- Calculating standard deviation
- Using percentile-based thresholds

## Next Steps

- [AI News Collation](./ai-news-collation) - AI-powered content processing
