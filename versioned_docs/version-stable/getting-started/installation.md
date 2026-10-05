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
| `SKIP_NOTIFIER`     | Set to `true` to send no report, mail or webhook. Every delivery is skipped, as in a test run. | No        | `false`                            |
| `REPORT_ALLOWED_HOSTS` | Host names, separated by commas, that a report can load an image or a frame from although they have an internal address. See [Report images from internal hosts](#report-images-from-internal-hosts). | No | `intranet.example.com` |

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
`REPORT_ALLOWED_HOSTS`. Captures are not affected: a capture can still open an internal dashboard.

Behind an HTTP proxy (`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`), the proxy resolves the host names. Anaphora then leaves
a name that does not resolve in the container to the proxy, and it does not check the address that a response comes
from. Configure the proxy to refuse internal addresses.

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
