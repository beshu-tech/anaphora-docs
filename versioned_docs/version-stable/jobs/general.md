---
sidebar_position: 1
---

# General

The General tab configures basic job properties: name, description, scheduling, and throttling.

## Configuration Fields

| Field | Description | Required |
|-------|-------------|----------|
| Name | Job identifier shown in lists and reports | Yes |
| Description | Notes about the job's purpose | No |
| Frequency | How often to run | Yes |
| Max Notify Freq | Minimum time between notifications | No |

## Scheduling

### Simple Frequency

Set how often the job should run:
- Every X minutes
- Every X hours
- Every X days

### Advanced (CRON)

Toggle **Advanced** to use CRON expressions:

| CRON Expression | Description |
|-----------------|-------------|
| `0 9 * * *` | Every day at 9:00 AM |
| `0 */2 * * *` | Every 2 hours |
| `0 9 * * 1-5` | Weekdays at 9:00 AM |
| `0 0 1 * *` | First day of every month |

## Throttling

**Max Notify Frequency** controls the maximum notification rate regardless of job frequency.

:::tip Why Throttling?
Throttling lets you keep a high sampling rate while avoiding notification fatigue. For example:
- Job runs every 5 minutes to check for errors
- Throttling set to 3 hours
- Recipients get at most one notification every 3 hours, even if errors persist
:::

## Next Steps

- [Capture](./capture) - Configure what to capture
