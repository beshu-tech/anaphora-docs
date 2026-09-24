---
sidebar_position: 4
description: Back up Anaphora configuration, jobs, and reports. Schedule automatic backups and restore from backup files.
keywords: [ Anaphora backup, configuration backup, disaster recovery, data protection, scheduled backup ]
---

# Backup

There are three ways to back up an Anaphora instance:

1. UI export: create and download backup files in the UI.
2. API export: export the data through the API.
3. Docker volume backup: for Docker deployments, back up the data volume directly.

:::note System role required
Only a system user can export or import data, in the UI and through the API. An import replaces the current data.
:::

:::tip
A UI export or an API export backs up only the configuration and data stored in Anaphora. These backups do not
include report files. For complete data protection, we recommend a Docker volume backup.
:::

## UI backup

1. Go to **Settings** > **Data**.
2. Click **Export to file** to download a backup of the current configuration and data.
3. Store the backup file securely.

### UI import

1. Go to **Settings** > **Data**
2. Click **Import from file**
3. Upload the backup file

### Legacy import and export

The **Legacy** tab under **Settings** > **Data** reads and writes the older `.json` format. This tab will be removed in
the future. A legacy import has three modes:

| Option                                                          | Behavior                                    |
|-----------------------------------------------------------------|---------------------------------------------|
| Validate the imported file to ensure correct data (recommended) | Refuses a file with errors. The default.    |
| Validate the imported file but autofix when possible            | Repairs what it can                         |
| Do not validate the imported file (Use at own risk)             | Imports the file as it is                   |

The first option refuses a file with a template that has no page. To repair such a file during the import, pick the
autofix option. A refused import names the template and the field.

## Automatic database backup before an upgrade

Before a new version changes the database, Anaphora writes a copy of it to `storage/backups/`. It keeps the three
newest copies. See [Upgrading](../getting-started/upgrading.md#automatic-database-backups).

## Docker volume backup

If you mount host folders, as in the [Docker Compose](../getting-started/installation.md#docker-compose) example, back
up the `storage/` and `content/` folders. For named Docker volumes, back up the data volume:

```bash
docker run --rm \
  -v anaphora-content:/data/content \
  -v anaphora-storage:/data/storage \
  -v $(pwd):/backup \
  alpine tar czf /backup/anaphora-backup.tar.gz /data
```

### Docker volume import

```bash
docker run --rm \
  -v anaphora-content:/content \
  -v anaphora-storage:/storage \
  -v $(pwd):/backup \
  alpine tar xzf /backup/anaphora-backup.tar.gz -C /
```

## API backup

Use basic auth headers with a system user.

To get the backup, call this endpoint:

```
GET /guest/api/export
```

The response is a downloadable backup file in `.ana` format.

### API import

Use basic auth headers with a system user.

To upload the backup file, call this endpoint:

```
POST /guest/api/import
```

The request body is the `.ana` backup file as binary data.

## Next steps

- [Data retention](../data-retention/): manage stored data
