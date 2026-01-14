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

## Next Steps

- [Backup](./backup) - Configure backups
