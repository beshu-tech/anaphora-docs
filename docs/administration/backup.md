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

Make the backup before an upgrade, with the version that you run now. See
[Upgrading](../getting-started/upgrading.md).

:::note System role required
Only a system user can export or import data, in the UI and through the API. An import replaces the current data.
:::

:::tip
A UI export or an API export backs up only the configuration and data stored in Anaphora. These backups do not
include report files. For complete data protection, we recommend a Docker volume backup.
:::

### What an export holds

The `.ana` file holds the whole database of the instance, encrypted as it is stored. The users, the spaces, the jobs and
templates, the delivery interfaces, the AI providers and the runs travel with it. So do the AI traces of the runs, and
the notebooks of the AI steps with their history.

It does not hold the files under `content/`: the reports, the snapshots, and the page text that a trial of an AI step
reads from a run. After an import, a trial on a run from before the import gets the variables of that run, but no page
text. Run a Test capture, or let the job run again.

## UI backup

**Settings** > **Data** has five tabs. Each tab shows a few short lines. Longer explanations are under **More details**.

| Tab                | What it does                                                          |
|--------------------|-----------------------------------------------------------------------|
| **Export**         | Downloads the whole database as one `.ana` file                       |
| **Import**         | Replaces the database with the data of a file, in three steps         |
| **Move the files** | Shows how to copy the database files, for a large database or a slow link |
| **API**            | Shows the addresses of the export and import API                      |
| **Legacy (JSON)**  | Reads and writes the older `.json` format                             |

A link with `?tab=` opens a tab, for example `?tab=import`.

### UI export

1. Go to **Settings** > **Data** > **Export**.
2. Click **Export to file**. Anaphora makes a copy of the database first, then the download starts. The database keeps
   running.
3. Keep the `DB_ENCRYPTION_KEY` with the file. Without the key, the file does not open.

The `.ana` file is the encrypted database itself, not a zip file. It has no size limit, and it takes little memory.
Only this version of Anaphora, or a later one, can import it. An earlier version cannot, and a script that unzips the
file to get `authfish.sqlite` does not work: use the file as it is.

The volume of `storage/` needs free space for the database and its log, and for the reserve of an import (see below).
The Export tab says when the free space is low. A copy that does not fit is refused before Anaphora writes anything.

:::note A slow link
A download that reads at least about 10 KB/s, with no pause longer than 5 minutes, is not cut. Any other download is
stopped: a browser shows "Failed - network error", and the file is incomplete. Start the export again. On a slower
link, copy the files (see [Move the files](#move-the-files)).
:::

### UI import

An import replaces the database. **The old database is not kept.** Export it first, or copy its files.

1. Go to **Settings** > **Data** > **Import**.
2. **Choose file.** Pick an `.ana` file. Anaphora also reads the `.ana` files of every earlier version, and the raw
   database file `authfish.sqlite`.
3. **Check.** The page shows the file, the disk space that the import needs against the free space, and the link
   speed that the file needs when the file is large. A file that does not fit the disk cannot be replaced from the
   page. The page then points to **Move the files**. Anaphora checks the file while the database keeps running.
   A file that is not an export, is damaged, was made with another `DB_ENCRYPTION_KEY` or comes from a newer version
   is refused here. The answer says the reason, and nothing changes.
4. **Replace the database.** Confirm. The database stops only for this step.

An import has no size limit. Two things limit it:

- **Time.** The upload must end within 5 minutes. A link of 10 MB/s carries about 3 GB in that time.
- **Disk.** The volume of `storage/` needs free space for the file, plus the larger of the file and the current
  database. Anaphora also keeps a reserve free for the running database: a tenth of the volume, at least 64 MB and at
  most 1 GB.

An import also brings back the secret that signs the snooze and unsubscribe links. When you import onto another
install, the links in emails from the install that made the backup work, and the links that this install sent before
the import stop working.

### When an import fails

The page shows one next step and the full message under **Show the full message**. The common ones:

- **No room on the disk, a slow upload, or too little memory.** Nothing changed. Free some disk space, or use
  [Move the files](#move-the-files).
- **A proxy in front of Anaphora refused the file.** A `413` means that the proxy refused the size: raise its body
  limit (`client_max_body_size` in nginx). A `502`, `503` or `504` can mean that the proxy cut a long upload or
  restore. The import may still be running: read the log of Anaphora before you try again.
- **The upload gets `411`.** The request must state the size of the file. A script sends the file with
  `curl -X POST -T file`. A chunked upload is refused.
- **The file is not an export.** A `.json` file belongs to the **Legacy (JSON)** tab.
- **The connection ended in the middle, or Anaphora cannot write in `storage/`.** Read the log of Anaphora.
  **Do not delete the folder `storage/backups`.** A copy of your data from before the import can be there.

### The copy from before an import

While an import runs, the old database is in `storage/backups/restore-<id>/`. After a good import, Anaphora removes
that folder. It stays only when an import did not end well, and Anaphora never deletes it.

Anaphora never replaces the database with an older copy unless the file in `storage/` is proven bad by its own bytes
and the copy belongs to an import that was running. In every other case, it refuses to start, moves nothing, and
prints the steps. If it does restore the old database by itself, a banner shows to users with the System role, and the
log says so at each start until someone confirms it.

After the first good start of this version, a missing or empty `storage/authfish.sqlite` is a stop, not a new empty
install. To start a new empty install, delete `storage/DATABASE-EXPECTED`. A container whose `storage/` is not a mounted
volume logs a warning at start. Set `REQUIRE_EXISTING_DATABASE=true` to stop the start when the database is missing.

### Move the files

For a large database or a slow link, copy the files:

1. Stop Anaphora.
2. Copy every file named `authfish.sqlite*` from the folder `storage/`: `authfish.sqlite`, and `authfish.sqlite-wal` and
   `authfish.sqlite-shm` when they exist. The `-wal` file can hold rows that the main file does not.
3. Keep the same `DB_ENCRYPTION_KEY`. Without it, the copy does not open.
4. To restore, stop the other install and delete its own `authfish.sqlite-wal` and `authfish.sqlite-shm` files. Put the
   copy in its `storage/` and start it.

An `.ana` file of an earlier version is a zip file. Its entry `authfish.sqlite` is the main file.

### Legacy import and export

The **Legacy** tab under **Settings** > **Data** reads and writes the older `.json` format. This tab will be removed in
the future. A legacy import has three modes:

| Option                                                          | Behavior                                    |
|-----------------------------------------------------------------|---------------------------------------------|
| Validate the imported file to ensure correct data (recommended) | Refuses a file with errors. The default.    |
| Validate the imported file but autofix when possible            | Repairs what it can                         |
| Do not validate the imported file (Use at own risk)             | Imports the file as it is                   |

The legacy file is not a backup of the instance. It holds blueprints, delivery interfaces, snoozes, background images,
health statuses and application settings. It does not hold jobs, runs, AI providers, notebooks, users or spaces. An
import replaces everything the file holds, in every space. A job that uses an interface that the file does not hold loses it. To
back up the instance, use **Export to file** on the **Data** tab.

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

The response is the backup file `anaphora_<date>.ana`, with the type `application/octet-stream`. It is the encrypted
database itself, not a zip file, and it has no size limit. A `HEAD` request answers with the headers only and makes no
copy.

### API import

Use basic auth headers with a system user.

To upload the backup file, call this endpoint:

```
POST /guest/api/import
```

The request body is the `.ana` backup file as binary data. The request must state the size of the file
(`Content-Length`). Without it, Anaphora answers `411`. With `curl`, send the file with `-X POST -T`:

```bash
curl -u <system user>:<password> -X POST -T anaphora.ana https://<host>/guest/api/import
```

`--data-binary @file` reads the whole file into memory first, so it is not a good choice for a large file. The API has
the same limits as the page: the upload must end within 5 minutes, and the disk needs room for the file.

## Next steps

- [Data retention](../data-retention/): manage stored data
