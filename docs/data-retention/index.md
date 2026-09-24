---
sidebar_position: 7
description: Manage Anaphora data retention - configure storage policies for report history, captured data, and audit logs. Automatic housekeeping and cleanup.
keywords: [ data retention, report storage, audit logs, retention policy, storage management, housekeeping ]
---

# Data retention: report history and storage management

Anaphora stores captured data and generated reports for reference and audits. This section tells you how Anaphora
stores and manages data, and how it deletes old data automatically.

## Overview

The Data Retention section has two pages:

- **Runs**: the execution history of your jobs, including successful captures, failures, and delivery status
- **Reports**: generated report documents and archives

## Housekeeping and automatic cleanup

Anaphora has automatic housekeeping that limits storage use over time. You set the retention of runs and reports
per job, in the job's [General](../jobs/general.md#housekeeping-data-retention) tab, under **Housekeeping** >
**Run Expire Time**.

- A new job keeps its runs for six months by default. Untick the retention to keep runs forever (**Never expire**).
- An hourly clean-up deletes the runs that are older than the job's retention.
- A job made from a built-in template also keeps its runs for six months.
- When a run is deleted, by the clean-up or by hand, Anaphora also deletes its report files from disk.
- When a job is deleted, Anaphora deletes its report files too.
- The hourly clean-up also removes report folders that no run owns. It removes only folders older than one day, and
  it removes nothing while the database holds no run.

## Next steps

- [Runs](./data-retention/runs): view execution history and job status
- [Reports](./data-retention/reports): open and manage generated reports
