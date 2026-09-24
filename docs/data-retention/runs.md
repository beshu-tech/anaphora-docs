---
sidebar_position: 2
description: View and debug job execution history in Anaphora. Track run statuses, identify failures, and review captured content.
keywords: [ job runs, execution history, run status, debugging, job monitoring, Anaphora runs ]
---

# Runs

![Runs page showing job execution history with job name, type, timestamp, duration, status, and attempts columns](images/runs.png)

The Runs section shows the execution history of your jobs, including successful captures, failures, and delivery status.

## Overview

Each time a job runs, Anaphora makes a **run** record. Use it to:

- Track job execution history
- Identify and debug failures
- Review captured content
- Verify delivery success

## Run Statuses

| Status         | Description                                                             |
|----------------|-------------------------------------------------------------------------|
| Success        | Job completed and report delivered                                      |
| Delivery issue | Anaphora made the report but could not deliver it to all destinations   |
| Error          | Job execution failed                                                    |
| Cancelled      | Conditions not met, no report sent                                      |
