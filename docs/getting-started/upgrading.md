---
sidebar_position: 2
description: Upgrade a Docker Compose installation of Anaphora safely with the upgrade script - check on a copy of the database, apply with automatic backup, and roll back.
keywords: [ Anaphora upgrade, upgrade script, rollback, database backup, database migration, Docker Compose upgrade ]
---

# Upgrading Anaphora

Every Anaphora image carries `anaphora-upgrade.sh`, a script that upgrades a Docker Compose installation to that image.
It tests the new version on a copy of your database before it changes anything, and it can roll back.

:::info Why a script?
A new version can change the database (a migration). The previous version refuses to start on a database that a newer
version changed. So a rollback needs the database from before the upgrade. The script keeps that copy for you.
:::

## Requirements

- A Docker Compose installation, as in [Installation](./installation.md#docker-compose)
- The image named as `beshultd/anaphora:${ANAPHORA_TAG}` in `docker-compose.yaml`. If your file names a version
  directly, the script prints the one line to change.
- A host folder mounted on `/usr/src/app/storage`. The script cannot back up a database that lives inside the container
  or in a named volume.
- Docker Compose v2 and `python3` on the host

## Get the Script

Take the script from the version you upgrade to. Run this in the folder of your `docker-compose.yaml`, and replace
`<version>` with the new version:

```bash
docker run --rm --entrypoint cat beshultd/anaphora:<version> /usr/local/bin/anaphora-upgrade.sh > anaphora-upgrade.sh
```

## Upgrade Step by Step

1. **Check.** Try the new version on a copy of your database. Anaphora keeps running. The copy has no network and sends
   nothing.

   ```bash
   bash anaphora-upgrade.sh check <version>
   ```

   The script shows what it found (service, image, folders), the database changes that the new version applies, the
   jobs it reads, and what the log said. If it says that the check failed, or that it cannot read some jobs, do not
   upgrade. Send the log file that it names to support.

2. **Dry run.** See every step and command, without running any:

   ```bash
   bash anaphora-upgrade.sh apply <version> --dry-run
   ```

3. **Apply.** The script checks again and asks before it stops Anaphora. Then it copies `storage/` to
   `anaphora-backups/<date>/`, sets `ANAPHORA_TAG` in `.env` (the old file stays as `.env.bak`), starts the new version
   and waits until it answers. If the new version does not start, the script puts the backup back and starts the old
   version.

   ```bash
   bash anaphora-upgrade.sh apply <version>
   ```

   Add `--yes` to stop Anaphora without a question, for example in an unattended run.

4. **Roll back** (if necessary). The script prints the command at the end of `apply`, for example:

   ```bash
   bash anaphora-upgrade.sh rollback anaphora-backups/20260924-071500
   ```

Every docker command is printed before it runs, and the whole session goes to a log file.

### Script Options

Set these in the environment of the script:

| Variable              | Default                         | Description                                      |
|-----------------------|---------------------------------|--------------------------------------------------|
| `START_TIMEOUT_S`     | `600`                           | How long to wait for a version to start          |
| `BACKUP_ROOT`         | `./anaphora-backups`            | Where `apply` puts its backups                   |
| `LOG_FILE`            | `./anaphora-upgrade-<date>.log` | The log of the run                               |
| `ANAPHORA_IMAGE_REPO` | `beshultd/anaphora`             | The image repository, for a mirror or a registry |

:::warning Reports are not in the backup
The script copies the database, not the reports folder (`content/`). A rollback in the first hour keeps every report.
After that, the hourly clean-up can remove the reports of runs that are past their retention.
:::

## Automatic Database Backups

Anaphora also backs up its database by itself. Before it applies a migration, it writes a copy to `storage/backups/`,
encrypted with the same `DB_ENCRYPTION_KEY`. It keeps the three newest copies. The log names the file and says how to
restore it:

1. Stop Anaphora.
2. Restore the copy as `storage/authfish.sqlite`, and remove `authfish.sqlite-wal` and `authfish.sqlite-shm`.
3. Start the previous version.

If Anaphora cannot write the copy, it applies no migration, and the database stays as it was.

## After the Upgrade to This Version

This version changes the database. After the upgrade:

- Every user is signed out once and logs in again.
- The log can say that some local users "still carry the legacy sha512 password hash". Their passwords still work.
  Save their passwords again under **Settings** to store the new kind of hash.
- Jobs that keep their runs forever still keep them. To free disk space, set a retention on the job. The hourly
  clean-up then removes the older runs and their report files.
- A job from a version older than 0.9.5 that never had a retention setting now keeps its runs for six months.
- The hourly clean-up also removes report folders that no run owns. It removes only folders older than one day, and it
  removes nothing while the database holds no run.
- Report links are private. Links that Anaphora sent before the upgrade keep working until their runs expire or are
  deleted. See [Reports](../data-retention/reports.md).
- The test route `/guest/api/test/webhook` is removed. If a webhook delivery interface points at it, point it at a real
  receiver.
- A report template with no page gets one default page. A template row that holds more cells than its column count
  loses the extra cells. This change cannot be reversed.
- The first health check rates the last five runs of each job with the new rules for failed deliveries. It can turn a
  job yellow or red, and send the health mail once, for a delivery that failed days ago. See
  [Self Monitoring](../administration/self-monitoring.md).
- If accounts that you do not trust can sign in, change the session secret and the identity-provider secrets. Before
  this version, any signed-in account could read them.

## Next Steps

- [Installation](./installation.md) - Environment variables and Docker Compose
- [Backup](../administration/backup.md) - Export data and back up volumes
