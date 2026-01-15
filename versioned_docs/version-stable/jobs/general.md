---
sidebar_position: 1
description: Configure job scheduling, notification throttling, retry policies, and data retention settings in Anaphora.
keywords: [job scheduling, CRON, notification throttling, retry policy, housekeeping, data retention]
---

# General Settings

The General tab defines how often a job runs, how noisy it is allowed to be, and how it behaves on failures.

## Configuration Fields

| Field | Description | Required |
|-------|-------------|----------|
| Name | Job identifier shown in lists and reports | Yes |
| Description | Notes about the job's purpose | No |
| Frequency | How often to run (simple or CRON) | Yes |
| Max Notify Frequency | Minimum time between notifications | No |
| Retry Policy | Behavior on capture failures | No |
| Housekeeping | Automatic cleanup of old runs/reports | No |

## Scheduling

### Simple Frequency

Set how often the job should run using natural intervals:

| Interval | Example Use Case |
|----------|------------------|
| Every X minutes | High-frequency alerting (5-10 min) |
| Every X hours | Regular status checks |
| Every X days | Daily reports |
| Every X weeks | Weekly summaries |

### Advanced (CRON)

Toggle **Advanced** to use CRON expressions for precise scheduling:

| CRON Expression | Description |
|-----------------|-------------|
| `0 9 * * *` | Every day at 9:00 AM |
| `0 */2 * * *` | Every 2 hours |
| `0 9 * * 1-5` | Weekdays at 9:00 AM |
| `0 0 1 * *` | First day of every month |
| `*/10 * * * *` | Every 10 minutes |
| `0 9,17 * * *` | At 9:00 AM and 5:00 PM |

## Notification Throttling

**Max Notify Frequency** controls the maximum notification rate regardless of how often the job runs. This is especially important for high-frequency alerting jobs.

### Why Throttling Matters

```
Without throttling:                  With throttling (3 hours):
┌─────────────────────────┐          ┌─────────────────────────┐
│ Run 1: Error → Notify   │          │ Run 1: Error → Notify   │
│ Run 2: Error → Notify   │          │ Run 2: Error → Suppressed│
│ Run 3: Error → Notify   │          │ Run 3: Error → Suppressed│
│ ...100 emails/day       │          │ ...8 emails/day max     │
└─────────────────────────┘          └─────────────────────────┘
```

### Example Configuration

| Job Frequency | Throttling | Result |
|---------------|------------|--------|
| Every 5 minutes | 3 hours | Max 8 notifications/day |
| Every 10 minutes | 1 hour | Max 24 notifications/day |
| Every hour | 6 hours | Max 4 notifications/day |
| Daily | None | 1 notification/day |

:::tip Alerting Pattern
High-frequency sampling + throttling creates an alerting-style workflow:
- Job runs every 5 minutes to detect issues quickly
- Throttling prevents notification fatigue
- Recipients get timely alerts without spam
:::

## Retry Policy

Configure how Anaphora handles failed captures:

| Setting | Description |
|---------|-------------|
| **Retry Count** | Number of retry attempts before giving up |
| **Retry Delay** | Wait time between retries |
| **Suspend on Failure** | Disable job after X consecutive failures |

### Example: Resilient Configuration

```
Retry Count: 3
Retry Delay: 30 seconds
Suspend After: 5 consecutive failures
```

This configuration:
1. Retries a failed capture up to 3 times
2. Waits 30 seconds between attempts
3. Suspends the job if 5 runs in a row fail (prevents endless failures)

### Failure Notifications

When failures occur:
- Admin receives notification based on retry/suspend settings
- Failed runs are logged with error details
- Job can be manually re-enabled after fixing issues

## Housekeeping (Data Retention)

Control automatic deletion of old data to manage storage:

| Setting | Description | Example |
|---------|-------------|---------|
| **Run History** | How long to keep execution logs | 30 days |
| **Reports** | How long to keep generated PDFs | 90 days |
| **Artifacts** | How long to keep captures/snapshots | 7 days |

### Retention Strategies

| Job Type | Recommended Retention |
|----------|----------------------|
| Alerting (high-frequency) | Short: 7-14 days |
| Daily reports | Medium: 30-60 days |
| Compliance reports | Long: 1+ year |
| Development/testing | Minimal: 1-7 days |

:::warning Storage Impact
High-frequency jobs generate more data. Without housekeeping:
- 10-minute job = 144 runs/day = 4,320 runs/month
- Each run may include snapshots and reports
- Storage can grow rapidly without retention limits
:::

### Per-Job vs Global Housekeeping

- **Per-Job**: Configure in the General tab for job-specific retention
- **Global**: Set system-wide defaults in Administration settings
- Per-job settings override global defaults

## Best Practices

### For Scheduled Reports

```yaml
Frequency: Daily at 9 AM (0 9 * * *)
Throttling: None (reports always deliver)
Retry: 3 attempts
Housekeeping: 90 days
```

### For Alerting Jobs

```yaml
Frequency: Every 5-10 minutes
Throttling: 1-3 hours (balance speed vs. noise)
Retry: 2 attempts (fail fast)
Housekeeping: 14 days (less storage needed)
```

### For Compliance/Archival

```yaml
Frequency: Weekly or monthly
Throttling: None
Retry: 5 attempts (ensure success)
Housekeeping: 365+ days (or use S3 archiving)
```

## Next Steps

- [Capture](./capture) - Configure what to capture
- [Composer](./composer) - Design your report layout
- [Delivery](./delivery) - Set up delivery destinations
