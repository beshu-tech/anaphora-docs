---
sidebar_position: 7
description: Manage Anaphora data retention - configure storage policies for report history, captured data, and audit logs. Automatic cleanup.
keywords: [ data retention, report storage, audit logs, retention policy, storage management, delete old runs ]
---

# Data retention: report history and storage management

Anaphora stores captured data and generated reports for reference and audits. This section tells you how Anaphora
stores and manages data, and how it deletes old data automatically.

## Overview

The Data Retention section has two pages:

- **Runs**: the execution history of your jobs, including successful captures, failures, and delivery status
- **Reports**: generated report documents and archives

## Automatic cleanup

Anaphora deletes old runs automatically to limit storage use over time. You set the retention of runs and reports
per job, in the job's [General](../jobs/general.md#storage-data-retention) tab, in the **Storage** section, with the
**Delete old runs** switch.

- A new job keeps its runs for six months by default. Turn the **Delete old runs** switch off to keep runs until you delete them.
- An hourly clean-up deletes the runs that are older than the job's retention.
- A job made from a built-in template also keeps its runs for six months.
- When a run is deleted, by the clean-up or by hand, Anaphora also deletes its report files from disk.
- When a job is deleted, Anaphora deletes its report files too.
- The hourly clean-up also removes report folders that no run owns. It removes only folders older than one day, and
  it removes nothing while the database holds no run.

## Next steps

- [Runs](./data-retention/runs): view execution history and job status
- [Reports](./data-retention/reports): open and manage generated reports
