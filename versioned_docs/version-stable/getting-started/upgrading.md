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

The previous version stops with the error "Database schema is ahead of application code". Update to the newer version, or
restore the copy from before the upgrade (`storage/backups/`, or `anaphora-upgrade.sh rollback <backup dir>`).
:::

## Requirements

- A Docker Compose installation, as in [Installation](./installation.md#docker-compose)
- The image named as `beshultd/anaphora:${ANAPHORA_TAG}` in `docker-compose.yaml`. If your file names a version
  directly, the script prints the one line to change.
- A host folder mounted on `/usr/src/app/storage`. The script cannot back up a database that lives inside the container
  or in a named volume.
- Docker Compose v2 and `python3` on the host

## Get the script

Take the script from the version you upgrade to. Run this in the folder of your `docker-compose.yaml`, and replace
`<version>` with the new version:

```bash
docker run --rm --entrypoint cat beshultd/anaphora:<version> /usr/local/bin/anaphora-upgrade.sh > anaphora-upgrade.sh
```

## Upgrade step by step

1. **Check.** Try the new version on a copy of your database. Anaphora keeps running. The copy has no network and sends
   nothing.

   ```bash
   bash anaphora-upgrade.sh check <version>
   ```

   The script shows what it found (service, image, folders), the database changes that the new version applies, the
   jobs it reads, and what the log said. If it says that the check failed, or that it cannot read some jobs, do not
   upgrade. Read the lines that it prints. The log stays on your host. Support can ask for the lines that the script
   printed. Support never needs your database or the log file.

2. **Dry run.** See every step and command, without running any:

   ```bash
   bash anaphora-upgrade.sh apply <version> --dry-run
   ```

3. **Apply.** The script checks again and asks before it stops Anaphora: type `yes` and press Enter. Then it copies
   `storage/` to `anaphora-backups/<date>/` (not `storage/backups/`: copy a `restore-*` folder out yourself), sets `ANAPHORA_TAG` in `.env` (the old file stays as `.env.bak`), starts
   the new version and waits until it answers. If the new version does not start, the script puts the backup back and
   starts the old version.

   ```bash
   bash anaphora-upgrade.sh apply <version>
   ```

   Add `--yes` to stop Anaphora without a question, for example in an unattended run.

   When the new version runs, the script shows the log lines that need your attention, for example
   `OIDC issuer discovery failed:`. Its last line is `Upgrade complete: Anaphora runs <image>.`

4. **Roll back** (if necessary). The script prints the command at the end of `apply`, for example:

   ```bash
   bash anaphora-upgrade.sh rollback anaphora-backups/20260924-071500
   ```

Every docker command is printed before it runs, and the whole session goes to a log file.

### Script options

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

## Automatic database backups

Anaphora also backs up its database by itself. Before it applies a migration, it writes a copy to `storage/backups/`,
encrypted with the same `DB_ENCRYPTION_KEY`. It keeps the three newest copies. The log names the file and says how to
restore it:

1. Stop Anaphora.
2. Restore the copy as `storage/authfish.sqlite`, and remove `authfish.sqlite-wal` and `authfish.sqlite-shm`.
3. Start the previous version.

If Anaphora cannot write the copy, it applies no migration, and the database stays as it was.

## The check lists what an upgrade changes for your jobs

`anaphora-upgrade.sh check` reads your stored jobs, templates, delivery interfaces and settings on the copy of your
database, with no network. It prints `NOTE` lines. Each note names a job, a template or the settings, says what happens
now, and says what to do. The last lines give the number of errors and of warnings.

- An **error** means that a job does not run, does not deliver its report, or was not checked, on the new version until
  you fix it.
- A **warning** means that the job runs, and something changes. Read the `Now:` line.
- The upgrade does not stop for a note. Fix the jobs before the upgrade, or right after it. The check fails for two
  causes that the upgrade itself makes: a job that the new version cannot read, and a cron over 1024 characters.
- The notes hold names, ids and field paths. They hold no pattern, template, address or password. The log stays on your
  host. Support can ask for the lines that the script printed. Support never needs your database or the log file.
- "Nothing was checked" is not the same as "nothing found". If the check says that the scan did not run, or that regular
  expressions were not checked, run the check again.

### The Upgrade notes page

The notes are also in the app, so you can read them after the upgrade. They do not need the script.

- The **Upgrade notes** page is in the side menu for the System role and for the admin of a space. The System role sees
  the notes of every space. An admin sees the notes of the jobs and templates of that space. A writer or a reader sees
  none.
- Each note has a link to the job and to the tab of the field.
- A banner shows the number of notes. You can close it. It comes back when the notes change.
- The Jobs list has a tag on each job that has a note, and a **Needs attention** filter.
- A note goes away when its cause goes, not when someone reads it. Changes that you save show on the page within a few
  seconds.

The start log has the same notes, one line each, marked `[compat-scan]`.

## After the upgrade from 0.18.0

The next version after 0.18.0 changes the database. So 0.18.0 refuses to start on the upgraded database, and a rollback
needs the backup from before the upgrade. The upgrade script keeps it for you. You lose what Anaphora wrote after the
upgrade. Run `anaphora-upgrade.sh check` first, and read its notes.

The list starts with the changes that can stop a job or a delivery.

1. **A custom AI provider with no endpoint fails all its AI actions.** Check each AI provider of the type "Custom
   (OpenAI API compatible)". Set its endpoint, or change its provider to OpenAI. The form now refuses to save one with
   no endpoint. A stored AI key also goes only to the endpoint that it was saved with: when you change the provider or
   the endpoint, enter the key again. **Rotate the `AI_API_KEY` of the environment** if users that you do not fully
   trust had access to your instance.
2. **The jobs of a removed space do not run.** A job whose space is not in the space list of the settings has no
   scheduled run, retry or catch-up run. Nothing is deleted. Look at the `[spaces]` lines of the check.
3. **A webhook that answers with a redirect fails.** Anaphora does not follow redirects. Press **Test** on each webhook
   interface, and enter the final URL where the answer names a host.
4. **A capture or a delivery aimed at a cloud metadata address, a link-local address or a port of Anaphora is
   refused.** Loopback, private networks and internal names stay open by default. See
   [What a capture and a delivery may reach](./installation.md#what-a-capture-and-a-delivery-may-reach).
5. **A webhook that sets a forwarding header no longer sends it.** The delivery goes on. The next save of that interface
   is refused until you remove the header.
6. **A delivery that does not finish is stopped.** A webhook stops after 60 seconds, a Mailgun message after 5 minutes,
   one SMTP mail after 5 minutes and an S3 upload after 10 minutes. Before, a delivery that did not finish held its
   worker for ever. The capture step, page navigation and run limits keep their values, and four variables raise them.
   See [Time limits](./installation.md#time-limits). If your pages or your mail relay are slow, set them now.
7. **A cron over 1024 characters never runs**, and a save refuses one. The Jobs list shows **Never runs**, and
   **Run now** still works.
8. **In a time zone with a clock change, some firings move.** See
   [Clock changes](../jobs/general.md#clock-changes). A server in UTC is not affected.
9. **A regular expression that RE2 does not support is skipped.** A "Process text" replacement with a backreference or a
   lookaround is skipped, and the text stays as it was. Rewrite the pattern. The report is sent, and the editor warns while you type. See
   [Process text and regular expressions](../jobs/capture.md#process-text-and-regular-expressions).
10. **A text block or a delivery template over 1,000,000 characters is refused on save.** A template that is already
    saved still renders. A template that fails to render already held back the report in 0.18.0. The check now lists
    such templates.
11. **Retries run at other times.** The number of retries is the number that you set, and each delay counts from the end
    of the attempt before it. A job whose attempts take longer retries more often. See
    [Retry policy](../jobs/general.md#retry-policy).
12. **The throttle counts the time between two firings.** A report that the old rule held back by mistake is sent, and a
    report that it sent too soon is held back. A report that reached nobody no longer starts the throttle time, so its
    retry sends. A Mailgun message that the run limit cut can then be sent twice.
13. **Runs show other states, and the counts fall.** A run inside the throttle time says **Throttled**, and a run whose
    recipients all snoozed says **Skipped**. The Reports page and the Overview count fewer runs. See
    [Run statuses](../data-retention/runs.md#run-statuses).
14. **A script that calls the JSON API can get a 400 or fail to read a schema.** The `issues` of a 400 answer use other
    codes, the JSON Schemas are 2020-12, and a date and time without seconds is refused on a write. A write can answer
    503 with `Retry-After` when the server is busy: retry it. `links.report` and `links.pdf` of a run are `null` for a run
    with no report.
15. **The S3 object key has a new form.** New reports go to `<job name>/<date>/<time>-<run ID>/report.pdf` (or `.html`),
    with the date and time in UTC. Change any tool that reads the old path.
16. **Anaphora refuses to start on a missing database, and an interrupted import leaves a folder in `storage/backups/`.**
    After the first good start, a missing or empty `storage/authfish.sqlite` is a stop, not a new install. The upgrade
    script does not copy `storage/backups/`: copy a `restore-*` folder out before you upgrade. See
    [Backup](../administration/backup.md#the-copy-from-before-an-import).
17. **The export is now the database file, not a zip file**, and an import with no `Content-Length` gets `411`. No
    earlier version can import a new export. Make the export that you keep for a rollback **before** the upgrade, with
    the old version: 0.18.0 cannot export a database over 2 GiB and refuses an import file over 100 MiB. See
    [Backup](../administration/backup.md#ui-export).
18. **Every observer key now reads the Prometheus metrics.** If a monitor must not see captured values, revoke its key.
    See [Prometheus metrics](../administration/self-monitoring.md#prometheus-metrics).
19. **Snooze and unsubscribe links.** Links in emails sent before the upgrade keep working for 90 days. See
    [Email delivery](../jobs/delivery.md#email-delivery). After a rollback, the links in emails that the new version
    sent do not work. The links from before the upgrade work again.
20. **You see more.** A run stores its warnings, a run close to a limit warns, the Upgrade notes page lists what the
    check finds, and the health monitoring mails once for each job and warning. Nothing is mailed at the upgrade for a
    warning that is already there. See [Run warnings](../data-retention/runs.md#run-warnings). A capture of a Metabase
    dashboard now waits for the queries of its cards. See [Metabase dashboards](../jobs/capture.md#metabase-dashboards).

### A large history: the first start waits

The first start builds a table for the Runs, Home and Reports pages, and waits for it. It takes about 12 seconds at
1,000,000 runs on a fast host, and longer on a slow disk. After that, the pages open in milliseconds on a large history.
With more than 100,000 runs, the start log says `Filling the run list table` before it starts, and the check prints the
same line.

If you run Anaphora under an orchestrator that restarts a container that reports unhealthy, set the start period of the
health check before you upgrade. The health check of the image waits 30 seconds before it counts a failure. A restart
during the build rolls it back, and the next start begins again, so an install whose build takes longer than the
orchestrator lets a start take never upgrades. Allow 5 minutes plus 5 minutes for each million runs, and more on a
slow disk:

- Docker Compose: add `healthcheck: { start_period: 10m }` under the service.
- `docker run`: add `--health-start-period=10m`.
- Kubernetes: give the container a `startupProbe` with `failureThreshold` times `periodSeconds` of at least 600 seconds.

Plain Docker and Compose restart a container that exits, not one that is unhealthy, so they are not concerned.
`anaphora-upgrade.sh` waits 600 seconds for a start. For a large history, set `START_TIMEOUT_S` to 600 seconds, and 250 more for each million runs, or higher on a slow disk.

## After the upgrade from 0.16.0

0.17.0 changes the database. `AddApiKeys` adds a table. `SamlClockSkewChecked` and `OidcSettingsExplicit` come with
Authfish, the sign-in service, and change the saved SAML and OIDC settings. Some licence, LDAP and sign-in changes
change what an existing install does, or stop a login or a logout that worked before:

- **A licence that ends.** An install that ran on PRO or Enterprise lets only its administrators in when it goes to
  Free. The other users are signed out. Renew the licence, or give the System role to the users who must keep working.
- **Roles after Free.** An install that ran on Free before 0.17.0 has every local user saved as System. After the move
  to PRO or Enterprise, set the role of each user in **Settings**.
- **LDAP settings that cannot work.** Anaphora refuses them at start, and LDAP login stops: a user filter without
  `{{username}}`, a filter that does not parse, a group filter with no user in it, a CA certificate that Node cannot
  read. Check the LDAP settings before you upgrade.
- **Regex space permissions.** A permission saved before 0.17.0 keeps matching any part of the name, and the log names
  it at each start. After you change its mode, do not roll back to an older Anaphora: older versions drop the mode. See
  [How a permission matches](../administration/spaces.md#how-a-permission-matches).

- **OIDC with a private CA.** Anaphora now checks the TLS certificate of an `https` issuer at every address, also on an IPv4
  address, on `localhost`, on a `*.localhost` name or on `[::1]`. If OIDC from the
  environment uses such an issuer with a certificate from a private CA or a self-signed one, OIDC sign-in stops, and
  the log says `OIDC issuer discovery failed:`. Local users can still sign in. See
  [The TLS certificate of the issuer](../administration/authentication/oidc.md#the-tls-certificate-of-the-issuer).
  OIDC that you set up in the settings page needs no action: the upgrade turns on **Tls insecure skip verify** in
  **Settings** > **System** > **Auth** > **OIDC** where the old rule skipped the check, and the start log warns about
  it. Set **Tls CA cert** on the same page instead.
- **SAML Audience.** SAML checks the Audience of each assertion. An identity provider that sends another Audience, or
  none, fails every login. Set `extraConfig.audience` to the value that the provider sends.
- **SAML login from the portal of the identity provider.** Such a login is refused. Set
  `extraConfig.validateInResponseTo: never` to accept it again.
- **SAML logout from the identity provider.** The provider must sign it. An unsigned one leaves the Anaphora session
  open. In Keycloak, turn on **Sign documents** in the client.
- **SAML clock skew.** A saved **Accepted clock skew ms** (in **Settings** > **System** > **Auth** > **SAML**) of `-1`
  (no time check, the old default) becomes `0`. If the clock of the server is behind the clock of the provider, the
  login fails with "SAML assertion not yet valid". Sync the clocks, or set **Accepted clock skew ms**, for example to
  `60000`.
- **Logins in progress.** A SAML login that started before the upgrade fails once. The user signs in again.
- **Extra config.** The **Extra config** in **Settings** > **System** > **Auth** > **SAML** and **OIDC** can no longer
  change a setting that has a field of its own, for example the SAML `issuer` or the OIDC `client_secret`. The upgrade
  moves such a value to its field.
- **More roles.** A user whose provider sends exactly one group now gets that role. A SAML provider that sends one
  attribute per role now gives every role, not only the first. An LDAP group with more than one name gives one role
  per name. Check the [space permissions](../administration/spaces.md#how-a-permission-matches) that match these
  roles, mainly the admin ones.
- **Username.** A SAML assertion or an OIDC profile without the username attribute is refused.
- **OIDC logout.** The logout goes to the logout endpoint that the provider publishes. See
  [Logout](../administration/authentication/oidc.md#logout).
- **Health monitors.** A monitor can read the job names with an observer key, instead of the password of a system
  user. See [Self-monitoring](../administration/self-monitoring.md#observer-keys).

## After the upgrade from 0.15 or older

Version 0.16.0 changes the database. After the upgrade from an older version:

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
  [Self-monitoring](../administration/self-monitoring.md).
- If accounts that you do not trust can sign in, change the session secret and the identity-provider secrets.

## Next steps

- [Installation](./installation.md): environment variables and Docker Compose
- [Backup](../administration/backup.md): export data and back up volumes
