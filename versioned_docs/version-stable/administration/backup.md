---
sidebar_position: 4
description: Back up Anaphora configuration, jobs, and reports. Schedule automatic backups and restore from backup files.
keywords: [ Anaphora backup, configuration backup, disaster recovery, data protection, scheduled backup ]
---

# Backup

Protect your Anaphora configuration and data with backups. There are three ways to back up your Anaphora instance:

1. **UI Export** - Use the UI to create and download backup files.
2. **API Export** - Use the API to programmatically export data.
3. **Docker Volume Backup** - For Docker deployments, back up the data volume directly.

:::tip
**UI Export** and **API Export** will only back up the configuration and data stored within Anaphora.
Report files are not included in these backups. So having a docker volume backup is recommended for complete data
protection.
:::

## UI Backup

1. Access the **Settings** > **Data**.
2. Click **Export to file** to download a backup of the current configuration and data.
3. Store the backup file securely.

### UI Import

1. Go to **Settings** > **Data**
2. Click **Import from file**
3. Upload the backup file

## Docker Volume Backup

For Docker deployments, back up the data volume:

```bash
docker run --rm \
  -v anaphora-content:/data/content \
  -v anaphora-storage:/data/storage \
  -v $(pwd):/backup \
  alpine tar czf /backup/anaphora-backup.tar.gz /data
```

### Docker Volume Import

```bash
docker run --rm \
  -v anaphora-content:/content \
  -v anaphora-storage:/storage \
  -v $(pwd):/backup \
  alpine tar xzf /backup/anaphora-backup.tar.gz -C /
```

## API Backup

**Authentication**: Use basic auth headers with a system user.

Get the backup via the following endpoint:

```
GET /guest/api/export
```

**Response**: A downloadable backup file in `.ana` format.

### API Import

**Authentication**: Use basic auth headers with a system user.

Upload the backup file via the following endpoint:

```
POST /guest/api/import
```

**Request Body**: `.ana` backup file as binary data.

## Next Steps

- [Data Retention](../data-retention/) - Manage stored data
