---
sidebar_position: 3
---

# Self Monitoring

Monitor Anaphora's health, performance, and operational metrics.

## Dashboard

Access the monitoring dashboard at **Settings** > **Monitoring**.

## Key Metrics

### System Health

| Metric | Description |
|--------|-------------|
| Uptime | Time since last restart |
| Memory | Current memory usage |
| CPU | Processor utilization |
| Disk | Storage consumption |

### Job Metrics

| Metric | Description |
|--------|-------------|
| Jobs Active | Currently running jobs |
| Jobs Scheduled | Total scheduled jobs |
| Success Rate | Percentage of successful runs |
| Avg Duration | Average job execution time |

### Delivery Metrics

| Metric | Description |
|--------|-------------|
| Deliveries/Hour | Reports sent per hour |
| Delivery Success | Successful delivery rate |
| Queue Depth | Pending deliveries |

## Alerts

Configure alerts for system issues:

1. Go to **Monitoring** > **Alerts**
2. Set thresholds for key metrics
3. Configure notification channel
4. Enable the alert

### Recommended Alerts

- Job failure rate > 10%
- Memory usage > 85%
- Disk usage > 90%
- Delivery queue > 100

## Logs

Access system logs:
- Application logs
- Job execution logs
- Error logs
- Audit logs

### Log Levels

| Level | Description |
|-------|-------------|
| ERROR | Failures requiring attention |
| WARN | Potential issues |
| INFO | Normal operations |
| DEBUG | Detailed troubleshooting |

## Prometheus Endpoint

Export metrics to Prometheus:

```
GET /metrics
```

## Health API

Query Anaphora's health status programmatically:

```
GET /api/health
```

### Response Format

```json
{
  "jobs": [
    {
      "id": "533aeb70-efcc-43cc-8953-78f9c8fdc728",
      "name": "Kibana Dashboard Snapshot",
      "description": "Takes a snapshot of a dashboard",
      "cron": "5 4 * * *",
      "healthStatus": "green",
      "recentRuns": [
        { "runAt": "2026-01-15T04:05:00.050Z", "state": "success" },
        { "runAt": "2026-01-14T04:05:00.040Z", "state": "success" },
        { "runAt": "2026-01-13T04:05:00.043Z", "state": "success" },
        { "runAt": "2026-01-12T04:05:00.049Z", "state": "success" },
        { "runAt": "2026-01-11T04:05:00.044Z", "state": "success" }
      ]
    },
    {
      "id": "79cf54b6-df32-4b09-84f4-708ecc72b7bc",
      "name": "Kibana Dashboard Snapshot",
      "description": "Takes a snapshot of a dashboard",
      "cron": "5 4 * * *",
      "healthStatus": "green",
      "recentRuns": [
        { "runAt": "2026-01-15T04:05:00.041Z", "state": "success" },
        { "runAt": "2026-01-14T04:05:00.051Z", "state": "success" },
        { "runAt": "2026-01-13T04:05:00.034Z", "state": "success" },
        { "runAt": "2026-01-12T04:05:00.040Z", "state": "success" },
        { "runAt": "2026-01-11T04:05:00.034Z", "state": "success" }
      ]
    }
  ],
  "deliveryInterfaces": [
    {
      "id": "4d5fba03-561e-4503-bf4d-c41817133aca",
      "name": "My Delivery Interface",
      "type": "webhook",
      "healthStatus": "gray",
      "summary24Hours": {
        "totalCount": 0,
        "errorCount": 0,
        "errors": []
      }
    }
  ]
}
```

### Health Status Values

| Status | Meaning |
|--------|---------|
| **green** | All recent runs successful |
| **yellow** | Some recent failures |
| **red** | Most recent runs failed |
| **gray** | No recent activity |

## Next Steps

- [Backup](./backup) - Configure backups
