---
sidebar_position: 4
description: Back up Anaphora configuration, jobs, and reports. Schedule automatic backups and restore from backup files.
keywords: [Anaphora backup, configuration backup, disaster recovery, data protection, scheduled backup]
---

# Backup

Protect your Anaphora configuration and data with regular backups.

## What to Back Up

| Component | Description | Priority |
|-----------|-------------|----------|
| Configuration | Jobs, templates, settings | Critical |
| Reports | Generated report files | Important |
| Database | User data, history | Critical |
| Credentials | Encrypted secrets | Critical |

## Backup Methods

### Built-in Backup

1. Navigate to **Settings** > **Backup**
2. Click **Create Backup**
3. Download the backup file
4. Store securely

### Scheduled Backups

Configure automatic backups:

| Setting | Description |
|---------|-------------|
| Frequency | Daily, weekly, monthly |
| Retention | Number of backups to keep |
| Location | Local or remote storage |
| Encryption | Encrypt backup files |

### Docker Volume Backup

For Docker deployments, back up the data volume:

```bash
docker run --rm \
  -v anaphora-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/anaphora-backup.tar.gz /data
```

## Restore

### From UI

1. Go to **Settings** > **Backup**
2. Click **Restore**
3. Upload backup file
4. Confirm restoration

### From Command Line

```bash
docker run --rm \
  -v anaphora-data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/anaphora-backup.tar.gz -C /
```

## Best Practices

- Back up before upgrades
- Test restores regularly
- Store backups off-site
- Encrypt sensitive backups
- Document recovery procedures

## Disaster Recovery

Plan for disaster recovery:

1. Identify critical data
2. Define recovery objectives (RTO/RPO)
3. Document procedures
4. Test recovery regularly

## Next Steps

- [Data Retention](../data-retention/) - Manage stored data
