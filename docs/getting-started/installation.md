---
sidebar_position: 1
description: Install Anaphora with Docker or Docker Compose. Quick setup guide for automated Kibana and Grafana report generation.
keywords: [ Anaphora installation, Docker setup, Kibana reporting tool, Grafana reporting tool, automated reports installation ]
---

# Installation guide

Install and start Anaphora in your environment.

## Requirements

- Docker and Docker Compose (recommended)
- Network access to your Kibana/Grafana instances

## Quick start with Docker

The fastest way to start is with Docker:

```bash
docker run -p 3000:3000 \
  -e PUBLIC_URL=http://localhost:3000 \
  -e DB_ENCRYPTION_KEY=your-encryption-key \
  -d beshultd/anaphora
```

Then open [http://localhost:3000](http://localhost:3000) in your browser and log in with `admin` / `admin`.

### Environment variables

| Variable            | Description                                                                                  | Required    | Example                            |
|---------------------|----------------------------------------------------------------------------------------------|-------------|------------------------------------|
| `PUBLIC_URL`        | External URL where you can reach Anaphora                                                    | Yes         | `http://anaphora.example.com:3000` |
| `DB_ENCRYPTION_KEY` | Key that encrypts the database. Without it, a published default key is used.                 | Recommended | `your-encryption-key`              |
| `ADMIN_USERNAME`    | Initial admin username (default `admin`)                                                     | No          | `admin`                            |
| `ADMIN_PASSWORD`    | Initial admin password (default `admin`)                                                     | No          | `your-secure-password`             |
| `ACTIVATION_KEY`    | License / activation key for Anaphora                                                        | No          | `xxxx-xxxx-xxxx-xxxx`              |
| `ANAPHORA_TAG`      | The image version that `docker-compose.yaml` runs. The upgrade script sets it in `.env`.      | No          | `latest`                           |
| `DEBUG`             | Enable debug logging                                                                         | No          | `false`                            |
| `WORKER_COUNT`      | How many captures run at the same time (browser instances)                                   | No          | `2`                                |
| `SKIP_NOTIFIER`     | Set to `true` to send no report, mail or webhook. Each delivery is recorded as skipped: the run shows Skipped, not Success, a skipped delivery does not start the job's throttle window, and `prev` and `delta` in templates stay empty because no run counts as sent. | No        | `false`                            |
| `REPORT_ALLOWED_HOSTS` | Host names, separated by commas, that a report can load an image or a frame from although they have an internal address. See [Report images from internal hosts](#report-images-from-internal-hosts). | No | `intranet.example.com` |
| `REQUIRE_EXISTING_DATABASE` | Set to `true` to stop the start when the database file is missing. See [Backup](../administration/backup.md#the-copy-from-before-an-import). | No | `true` |

More variables configure [OpenID Connect](../administration/authentication/oidc.md#configure-from-the-environment),
an [AI provider](#ai-provider-from-the-environment), [failed sign-in limits](#failed-sign-in-limits) and
[demo data](#demo-data).

:::tip Production deployment
For production, use a strong `DB_ENCRYPTION_KEY` and set `PUBLIC_URL` to your external URL. SSO configurations use it
for callback URLs.
:::

:::warning Keep the database key
Set `DB_ENCRYPTION_KEY` before the first start and keep it. The database does not open with another key, and the
automatic database backups use the same key. Without the variable, Anaphora uses a default key that is in the public
source, and it says so in the log at start. Anaphora has no command to change the key of an existing database.
:::

`WORKER_COUNT` also limits report rendering: at most two report templates or equations per worker run at the same
time. Each one runs in a separate process with 256 MB of memory.

### Report images from internal hosts

The PDF renderer does not load a report image or frame from an internal address: loopback, private networks and cloud
metadata (`169.254.169.254`). A report that shows a logo from an intranet server needs that host in
`REPORT_ALLOWED_HOSTS`. Captures and deliveries follow the [outbound policy](#what-a-capture-and-a-delivery-may-reach).
A capture can still open an internal dashboard.

Behind an HTTP proxy (`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`), the proxy resolves the host names. Anaphora then leaves
a name that does not resolve in the container to the proxy, and it does not check the address that a response comes
from. Configure the proxy to refuse internal addresses.

### Time limits

Four variables set how long a step, a page, a run and a mail may take. Each default is the value that Anaphora used
before, so an install that sets nothing sees no change.

| Variable                        | Default | Allowed               | What it limits                                         | At the limit                                         |
|---------------------------------|---------|-----------------------|--------------------------------------------------------|------------------------------------------------------|
| `CAPTURE_STEP_TIMEOUT_SECONDS`  | 60 s    | 10 to 600 seconds     | One step of a capture: a wait for an element, a click  | The step fails, and so does the run                  |
| `NAVIGATION_TIMEOUT_SECONDS`    | 2 min   | 30 to 600 seconds     | Opening a page                                         | A warning: the capture goes on with the page it has  |
| `RUN_DEADLINE_SECONDS`          | 30 min  | 900 to 21600 seconds  | A whole run: capture, report and delivery              | The run stops, and its deliveries stop               |
| `SMTP_DELIVERY_TIMEOUT_SECONDS` | 5 min   | 60 to 600 seconds     | One SMTP mail                                          | The delivery of that mail fails                      |

- Write whole seconds. Text that is not a whole number (`abc`, `1.5`, `90s`) is ignored, and the default stays. A
  number outside the range becomes the nearest allowed value. The start log has one warning that gives the value that
  you asked for and the value in force. Each process logs a `Time limits in force` line.
- Set them in the environment of the container (`environment:` in the compose file), or in `.env.local`.
- A run that fails at a limit says which one: its value, its variable and its range, in the error of the run and in the
  log.
- A wait or a delivery that succeeds but takes more than 80% of its limit adds a warning to the run. See
  [Run warnings](../data-retention/runs.md#run-warnings). Raise the variable before the next slow day makes the run fail.
- When the step limit and the navigation limit together are longer than the run limit, the start log has a
  `Time limit advice` line. It is advice, not an error.
- A slow Grafana dashboard whose loading bars outlast the step limit fails the step, in every language of the Grafana
  interface. Raise `CAPTURE_STEP_TIMEOUT_SECONDS` for such a dashboard.

The SMTP limit also sets the silence timer of a mail connection: a fifth of the limit, and at least 60 seconds. A relay
that stays silent after the message data for longer than that needs a higher value.

These limits are fixed. No variable changes them:

| Limit           | Value  | What it stops                                                                   |
|-----------------|--------|---------------------------------------------------------------------------------|
| Report build    | 30 s   | The build of the report: the page load and the PDF                              |
| Webhook call    | 60 s   | One webhook call                                                                |
| Mailgun message | 5 min  | One Mailgun message                                                             |
| S3 upload       | 10 min | One S3 upload                                                                   |
| Operator alerts | 45 s   | One whole alert: licence, health report, AI budget, run warnings, Test button   |

A delivery that does not finish within its limit ends with "The delivery did not finish within … and was stopped." and
frees its worker. A Mailgun request that Anaphora gave up on can still run for up to 5 minutes. If Mailgun accepts it
late, the retry of the run can send the same message twice.

### What a capture and a delivery may reach

Two variables say which addresses a capture and a delivery may reach.

| Variable                 | Values                                  | Meaning                                                                          |
|--------------------------|-----------------------------------------|----------------------------------------------------------------------------------|
| `OUTBOUND_POLICY`        | `metadata` (default) or `strict`        | `metadata` refuses cloud metadata addresses, link-local addresses and special ranges. `strict` also refuses loopback and private addresses |
| `OUTBOUND_ALLOWED_HOSTS` | `host` or `host:port`, separated by commas | Hosts that a capture and a delivery may reach whatever their address, in both modes. A host with no port means any port. The ports of Anaphora stay refused |

- The default keeps loopback, private networks and internal names open. A capture of an internal Kibana, Grafana or
  Metabase, an SMTP relay on a private address, MinIO and an intranet webhook work as before.
- **The ports of Anaphora itself** (`SERVER_PORT` and the port of the application behind it) are refused in every mode,
  on loopback and on every address of the host. No setting allows them.
- The policy covers the pages that a capture opens (also frames, scripts and images of the page), webhooks, S3
  endpoints, SMTP hosts and custom AI endpoints. A refused capture or delivery fails with one sentence that names the
  rule and the variables, never the address. A run does not retry a refusal that repeats. A refused frame, image or
  script of a page does not fail the capture: the run stores a warning.
- A webhook never sends a forwarding header (`X-Forwarded-For`, `Forwarded`, `X-Real-IP` and the like). Anaphora drops
  the header and the delivery goes on without it. The next save of that webhook interface is refused until you remove
  the header.
- An unknown value of `OUTBOUND_POLICY`, or a bad entry of `OUTBOUND_ALLOWED_HOSTS`, stops the start. The log has one
  `Outbound policy in force` line for each process.
- The default mode protects less than `strict`. For full protection, use `strict` and a network rule in your cloud.

The [Upgrade notes](./upgrading.md#the-upgrade-notes-page) page lists the stored jobs and interfaces that the policy
refuses.

### Behind a reverse proxy

When a reverse proxy (nginx, Traefik, Coolify) ends TLS in front of Anaphora:

- Set `PUBLIC_URL` to the `https` address that the browsers use.
- Make sure that the proxy sends `X-Forwarded-For` and `X-Forwarded-Proto`.
- Set `AF_TRUSTED_PROXIES` to the address of the proxy. See [Failed sign-in limits](#failed-sign-in-limits).
- Publish only port 3000. A caller that reaches the Next.js port (3001) directly chooses its own client address.

When `X-Forwarded-Proto` says `https`, the session cookie is `Secure`. Over plain http, the cookie is not `Secure`. You
do not set anything for this.

### Failed sign-in limits

Anaphora stops trying a password after too many failures, and answers 429 with `Retry-After`. It counts the failures
per user name and client address, and per client address. The counters are in memory: a restart clears them. The
basic-auth API routes (`/guest/api/export`, `/guest/api/import`) pass the limit on as 429. The health API answers its
anonymous summary instead.

Anaphora must know the address of the client. Behind a reverse proxy, the proxy must send `X-Forwarded-For`, and
`AF_TRUSTED_PROXIES` must list the address of the proxy. Without it, every browser seems to come from the proxy: the
start log warns, the limit per address is off, and one guesser can lock a user name out for everyone behind that proxy.

| Variable                            | Default | Description                                                                                                    |
|-------------------------------------|---------|----------------------------------------------------------------------------------------------------------------|
| `AF_TRUSTED_PROXIES`                |         | Proxy addresses or CIDR ranges, separated by commas. `linklocal` and `uniquelocal` work too. Loopback is always trusted. |
| `AF_LOGIN_WINDOW_SECONDS`           | `900`   | The time window in which the failures count. `0` turns every limit off.                                       |
| `AF_LOGIN_MAX_FAILURES_PER_USER`    | `10`    | Failures for one user name from one address. `0` turns this limit off.                                         |
| `AF_LOGIN_MAX_FAILURES_PER_ADDRESS` | `100`   | Failures from one address, for any user name. `0` turns this limit off.                                        |

List only the proxies themselves, not whole networks: each trusted proxy can name any client address.

### AI provider from the environment

The environment can own one AI provider. Anaphora creates it at the first start, in the default space, and updates it
at every start to match the environment.

| Variable      | Required     | Description                                          |
|---------------|--------------|------------------------------------------------------|
| `AI_PROVIDER` | Yes          | `openai`, `deepseek` or `custom` (OpenAI-compatible) |
| `AI_MODEL`    | Yes          | The model name                                       |
| `AI_API_KEY`  | Yes          | The API key                                          |
| `AI_ENDPOINT` | For `custom` | The base URL of the OpenAI-compatible service        |
| `AI_NAME`     | No           | The name in the AI Providers list. Default: **Default Provider** |

A partial or invalid set logs a warning and creates nothing. See [AI Providers](../administration/ai-providers.md).

### Demo data

For a preview or evaluation instance, Anaphora can fill an empty database with demo content:

| Variable     | Description                                                                                                                                      | Example                                |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| `SEED_DEMO`  | Set to `1` to add demo jobs, runs, delivery interfaces and settings at start. Anaphora does this only when the database holds no job.            | `1`                                    |
| `DEMO_USERS` | Extra local users next to the admin, as `name:password:role`, separated by commas. The role is `admin` (a system user) or `user` (read-only). | `alice:Welcome:admin,bob:Welcome:user` |

`DEMO_USERS` works without `SEED_DEMO`. An entry with an error is skipped and logged.

## Docker Compose

For production deployments, use Docker Compose with folders on the host for persistent storage.

1. Create a folder for Anaphora, and the folders it writes to. They must belong to user id `996`, the user that runs
   Anaphora in the container:

   ```bash
   mkdir -p ~/anaphora/content ~/anaphora/storage ~/anaphora/tmp
   cd ~/anaphora
   sudo chown 996:996 content storage tmp
   ```

2. Create a `.env` file in that folder:

   ```dotenv
   ADMIN_PASSWORD=your-secure-password
   DB_ENCRYPTION_KEY=your-encryption-key
   ACTIVATION_KEY=your-activation-key
   ANAPHORA_TAG=latest
   ```

3. Create `docker-compose.yaml` in the same folder:

   ```yaml
   services:
     anaphora:
       container_name: anaphora
       restart: always
       # the version lives in .env (ANAPHORA_TAG), where the upgrade script sets it
       image: beshultd/anaphora:${ANAPHORA_TAG:-latest}
       init: true
       env_file: '.env'
       environment:
         - ADMIN_USERNAME=admin
         - PUBLIC_URL=https://anaphora.example.com
       volumes:
         - ./content/:/usr/src/app/content/:rw
         - ./storage/:/usr/src/app/storage/:rw
         - ./tmp/:/tmp/:rw
       ports:
         - '3000:3000'
       user: '996'
   ```

4. Start Anaphora:

   ```bash
   docker compose up -d
   ```

The `storage/` folder holds the database. The `content/` folder holds the report files.

:::info Container user
Without a `user:` setting, the container starts as root, makes `storage/` and `content/` writable for its own user
(`pptruser`, uid 996), and then drops all privileges. With `user:` set, the container skips that step. If a folder is not
writable, the container stops and prints the `chown` command to run.
:::

:::tip Get a free trial key
The `ACTIVATION_KEY` unlocks PRO or Enterprise features.
[Request your free trial key](https://portal.anaphora.it/trial). Activation is instant, and you do not need a credit card.
:::

## Upgrading Anaphora

Use the upgrade script that comes in every image. It tests the new version on a copy of your database first, and it can
roll back. See [Upgrading](./upgrading.md).

## Need help?

:::note Join the community
If you have a problem, [ask on the Anaphora Forum](https://forum.anaphora.it). The team and other users can help.
:::

## Next steps

- [Upgrading](./upgrading.md): move to a new version safely
- [Features & Editions](./features): compare Free, PRO, and Enterprise editions
- [Configuration](./configuration): configure Anaphora settings
- [Basic Examples](../basic-examples/): create your first report job
