---
sidebar_position: 7
description: Manage Anaphora data retention - configure storage policies for report history, captured data, and audit logs. Automatic housekeeping and cleanup.
keywords: [data retention, report storage, audit logs, retention policy, storage management, housekeeping]
---

# Data Retention - Report History & Storage Management

Anaphora stores captured data and generated reports for reference and auditing purposes. This section covers how data is stored, managed, and automatically cleaned up.

## Overview

The Data Retention section provides access to:

- **Runs** - Execution history of your jobs, including successful captures, failures, and delivery status
- **Reports** - Generated report documents and archives

## Data Types

| Type | Description | Storage Impact |
|------|-------------|----------------|
| **Captures** | Raw screenshots and extracted data | High |
| **Reports** | Generated PDF and image documents | High |
| **Run History** | Execution logs and status records | Medium |
| **Variables** | Extracted values from capture workflows | Low |
| **Audit Logs** | User actions and system events | Low |

## Housekeeping & Automatic Cleanup

Anaphora includes automatic housekeeping to manage storage usage over time.

### Retention Rules

Configure rules to automatically delete old data:

```
Example: Keep only the last 30 days of reports
┌──────────────────────────────────────────────────┐
│  Day 1    Day 15    Day 30    Day 31 (deleted)  │
│    ●────────●────────●────────✗                 │
│                       ↑                          │
│              Retention window                    │
└──────────────────────────────────────────────────┘
```

### Configuration Options

| Setting | Description | Example |
|---------|-------------|---------|
| **Time-based** | Delete data older than X days | Keep last 30 days |
| **Count-based** | Keep only the last X reports | Keep last 100 reports |
| **Size-based** | Delete when storage exceeds limit | Max 10 GB per space |
| **Per-job rules** | Different retention per job type | Critical jobs: 90 days |

### Housekeeping Schedule

- Automatic cleanup runs on a configurable schedule
- Default: Daily at midnight (configurable)
- Manual trigger available for immediate cleanup
- Dry-run mode to preview what will be deleted

## Storage Management

### Per-Space Isolation

Each Space maintains its own storage quota and retention policies:

- Independent retention rules per space
- Storage usage tracking per space
- Alerts when approaching quota limits

### Storage Metrics

Monitor storage usage through:

- Dashboard widgets showing current usage
- Historical trends of storage growth
- Breakdown by data type (captures, reports, logs)
- Projections based on current growth rate

## Data Lifecycle

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Capture │ -> │  Store  │ -> │ Archive │ -> │ Delete  │
│         │    │         │    │         │    │         │
│ Fresh   │    │ Active  │    │ Aged    │    │ Expired │
│ data    │    │ access  │    │ storage │    │ cleanup │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
```

1. **Capture** - New data is captured and stored
2. **Active** - Data is readily available for viewing and export
3. **Archive** - Older data may be compressed or moved to cold storage
4. **Cleanup** - Data exceeding retention policy is permanently deleted

## Compliance Considerations

For regulated environments:

- **Audit trails** - Maintain logs of who accessed what data and when
- **Immutable logs** - System events cannot be modified or deleted
- **Export before delete** - Option to export data before automatic cleanup
- **Legal hold** - Suspend deletion for specific data sets

## Best Practices

### Recommended Retention Policies

| Data Type | Recommended Retention |
|-----------|----------------------|
| Production reports | 90 days |
| Development/test reports | 7-14 days |
| Audit logs | 1 year |
| Run history | 30 days |

### Storage Optimization

- Use element-level capture instead of full-page when possible
- Configure appropriate image quality/compression
- Archive important reports externally before cleanup
- Review and adjust retention policies quarterly

## Next Steps

- [Runs](./data-retention/runs) - View execution history and job status
- [Reports](./data-retention/reports) - Access and manage generated reports
