---
sidebar_position: 1
description: Configure job scheduling, notification throttling, retry policies, and data retention settings in Anaphora.
keywords: [ job scheduling, CRON, notification throttling, send at most, retry policy, delete old runs, data retention ]
---

# General settings

The General tab has four sections: **Name**, **Schedule**, **If a run fails** and **Storage**. They define how often a job runs, how many reports it may send, and what happens when a run fails.

## Configuration fields

| Section         | Field            | Description                                                             | Required |
|-----------------|------------------|-------------------------------------------------------------------------|----------|
| Name            | Name             | Job identifier shown in lists and reports                               | Yes      |
| Name            | Description      | Notes about the job's purpose                                           | No       |
| Schedule        | Run              | How often to run (simple or CRON)                                       | Yes      |
| Schedule        | Send at most     | **Every run**, or **Once every** a time you set                         | No       |
| If a run fails  | Retry            | Number of retries after a failed run, from 0 to 10 (default: 3)         | No       |
| Storage         | Delete old runs  | A switch. When it is on, the age at which old runs and reports are deleted (default: 6 months) | No       |

## Scheduling

### Simple frequency

Set how often the job runs, in natural intervals, in the **Run** field.

### Advanced (CRON)

Turn on the **Advanced** switch to type a CRON expression in the **Cron** field:

| CRON expression | Description              |
|-----------------|--------------------------|
| `0 9 * * *`     | Every day at 9:00 AM     |
| `0 */2 * * *`   | Every 2 hours            |
| `0 9 * * 1-5`   | Weekdays at 9:00 AM      |
| `0 0 1 * *`     | First day of every month |
| `*/10 * * * *`  | Every 10 minutes         |
| `0 9,17 * * *`  | At 9:00 AM and 5:00 PM   |

Anaphora refuses to save a CRON expression that the scheduler cannot run, for example `0 */25 * * *`. A stored job with
such an expression shows **Never runs** on the Jobs list.

A CRON expression can have at most 1024 characters. A longer one is refused when you save. A longer one that is
already stored stays in the job, but it does not run: the Jobs list shows **Never runs**. **Run now** still works. Write
a shorter expression. No real schedule needs that length.

### How runs are scheduled

- **One run at a time for each job.** A scheduled time that comes while the job still runs is skipped, and the job runs
  once more when the first run ends. A run that hangs holds its job until the container restarts. **Run now** does not
  wait for this lock.
- **A save during a run does not start a second run.** A save, a bulk switch or a database import during a run leaves
  the run alone.
- **A job in a removed space does not run.** A job whose space is not in the space list of the settings has no
  scheduled run, retry or catch-up run. Nothing is deleted. When you add the space again with the same id, its jobs run
  again. The log has one `[spaces]` line for each missing space.

### Clock changes

A job runs in the time zone of the server. If the server is in UTC, the default of the image, no firing time changes.
In a zone with a clock change (for example `Europe/Luxembourg`), the two days of the year when the clock moves are
different:

- A job at fixed times has no `*` or `?` at the start of its second, minute or hour field, for example `30 2 * * *` or
  `0 0-6/2 * * *`. In spring it runs once, at the first valid time after the gap (03:00). In autumn it runs once, in the
  first pass of the repeated hour.
- Any other job is an interval job, for example `0 * * * *` or `*/10 2 * * *`. In spring it skips the missing hour. In
  autumn it runs in both passes of the repeated hour.

If the clock of the host steps back over a firing (a time sync, a restored virtual machine), the job does not run again
for that firing. The log has a warning for each firing that it skipped.

If Anaphora is down when a job should run, it does not run the job late. The job runs at its next scheduled time. At
startup, the log names the runs that were missed.

## Notification throttling

**Send at most** sets the minimum time between two delivered reports, whatever the job frequency. Choose **Every run**
to send a report at each run, or **Once every** and a time to limit how often the job sends. A run inside this time
still runs, but sends no report. Use it for high-frequency alerting jobs.

A report counts as delivered when it reached at least one delivery. A run whose every delivery failed (for example, a
mail server that refused every address), was skipped, or was withheld does not start the time, so its retry, or the
next run, still sends. A run that an older version stored with every delivery failed does not count either, so a
retry that was waiting at the upgrade sends. A test run (the Test button) belongs to no job, so it never starts the
time.

A new job sends at every run. The default time for **Once every** is 3 hours. If the job runs more often than once a day
and **Send at most** is on **Every run**, the General tab asks "This job runs more than once a day. Limit how often it
sends?" and shows the button **Limit to once every 3 hours**. The button sets that default.

### Why throttling matters

```mermaid
flowchart TD
    subgraph without["❌ Without Throttling"]
        w1["Run 1: Error"]
        w1 -->|"Notify"| wn1["📧 Email sent"]
        w2["Run 2: Error"]
        w2 -->|"Notify"| wn2["📧 Email sent"]
        w3["Run 3: Error"]
        w3 -->|"Notify"| wn3["📧 Email sent"]
        wn3 --> wr["...100 emails/day"]
    end

    subgraph with["✅ With Throttling (3 hours)"]
        t1["Run 1: Error"]
        t1 -->|"Notify"| tn1["📧 Email sent"]
        t2["Run 2: Error"]
        t2 -->|"Suppressed"| ts2["🔇 Skipped"]
        t3["Run 3: Error"]
        t3 -->|"Suppressed"| ts3["🔇 Skipped"]
        ts3 --> tr["Max 8 emails/day"]
    end

    without ~~~ with
```

### Example configuration

| Job frequency    | Throttling | Result                   |
|------------------|------------|--------------------------|
| Every 5 minutes  | 3 hours    | Max 8 notifications/day  |
| Every 10 minutes | 1 hour     | Max 24 notifications/day |
| Every hour       | 6 hours    | Max 4 notifications/day  |
| Daily            | None       | 1 notification/day       |

The time between two reports counts from the moment the schedule fired each run, not from the start of the capture. So
the time that a run waits in the queue, or takes to capture, does not move the window. Two runs that fired exactly one
throttle time apart both send.

:::tip Alerting pattern
High-frequency sampling with throttling gives an alerting-style workflow:

- Job runs every 5 minutes to detect issues quickly
- Throttling prevents notification fatigue
- Recipients get timely alerts without spam
  :::

## Retry policy

In the **If a run fails** section, the **Retry** field reads "Retry [number] times". Set the number of retries, from 1
to 10, to retry a failed run automatically. New jobs use 3 retries. With 0, the tab says "A failed run is not tried
again." Under the field, a line lists the waits for the number you set. **More about retries** opens the rules below in
short form.

Anaphora retries in increasing intervals: 5 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours, 4 hours, 12 hours,
1 day, 2 days, and 3 days. The first delay counts from the end of the failed capture, and each later delay counts from
the end of the capture before it.

- A run is retried when its capture fails, or when its report reached no destination. A report that reached some
  destinations is not sent again.
- The number of retries is the number that you set. The first run is not a retry.
- A retry never starts before 1 minute has passed. A job whose attempts take longer retries more often, and the load on
  a slow source can grow.
- A retry that would start at or after the next scheduled run is not planned: the next scheduled run tries anyway. A
  scheduled time that comes during a retry gets no extra run.
- A run is not retried when the [outbound policy](../getting-started/installation.md#what-a-capture-and-a-delivery-may-reach)
  refused its capture, or when every failed delivery was refused by the policy or got a redirect from a webhook. The
  retry would fail in the same way.
- A capture that runs longer than the [run limit](../getting-started/installation.md#time-limits) (30 minutes by
  default) is stopped, stored as failed, and retried.
- Retries are listed under the run that failed first, in its **Attempts**.
- If you start a manual run after a scheduled run failed, the pending retries of the scheduled run still happen.

## Storage (data retention)

Turn on the **Delete old runs** switch in the **Storage** section to delete old runs and their reports automatically
after the time you set (months, days, and hours). New jobs use 6 months. The line under the switch says "Deletes the
runs and their reports." Turn the switch off to keep runs until you delete them yourself: the line then says "Runs and
reports are kept until you delete them." An hourly clean-up deletes the expired runs and their report files.

:::warning Storage impact
High-frequency jobs make more data. Without a time limit for old runs:

- 10-minute job = 144 runs/day = 4,320 runs/month
- Each run may include snapshots and reports
- Without retention limits, storage can grow fast
:::

## Best practices

### For scheduled reports

```yaml
Frequency: Daily at 9 AM (0 9 * * *)
Send at most: Every run (reports always deliver)
Retry: 3 times
Delete old runs: after 90 days
```

### For alerting jobs

```yaml
Frequency: Every 5-10 minutes
Send at most: once every 1-3 hours (balance speed vs. noise)
Retry: Job runs often enough; retries usually not needed
Delete old runs: after 14 days (less storage needed)
```

### For compliance/archival

```yaml
Frequency: Weekly or monthly
Send at most: Every run
Retry: 5 times (make sure it succeeds)
Delete old runs: off
```

## Next steps

- [Capture](./capture): configure what to capture
- [Composer](./composer): design your report layout
- [Delivery](./delivery): set up delivery destinations
