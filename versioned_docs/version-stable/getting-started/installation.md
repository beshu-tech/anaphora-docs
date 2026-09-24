---
sidebar_position: 1
description: Install Anaphora with Docker or Docker Compose. Quick setup guide for automated Kibana and Grafana report generation.
keywords: [ Anaphora installation, Docker setup, Kibana reporting tool, Grafana reporting tool, automated reports installation ]
---

# Installation Guide

Get Anaphora up and running in your environment.

## Requirements

- Docker and Docker Compose (recommended)
- Network access to your Kibana/Grafana instances

## Quick Start with Docker

The fastest way to get started is using Docker:

```bash
docker run -p 3000:3000 \
  -e PUBLIC_URL=http://localhost:3000 \
  -e DB_ENCRYPTION_KEY=your-encryption-key \
  -d beshultd/anaphora
```

Then open [http://localhost:3000](http://localhost:3000) in your browser and log in with `admin` / `admin`.

### Environment Variables

| Variable            | Description                                                                                  | Required    | Example                            |
|---------------------|----------------------------------------------------------------------------------------------|-------------|------------------------------------|
| `PUBLIC_URL`        | External URL where Anaphora is accessible                                                    | Yes         | `http://anaphora.example.com:3000` |
| `DB_ENCRYPTION_KEY` | Key that encrypts the database. Without it, a published default key is used.                 | Recommended | `your-encryption-key`              |
| `ADMIN_USERNAME`    | Initial admin username (default `admin`)                                                     | No          | `admin`                            |
| `ADMIN_PASSWORD`    | Initial admin password (default `admin`)                                                     | No          | `your-secure-password`             |
| `ACTIVATION_KEY`    | License / activation key for Anaphora                                                        | No          | `xxxx-xxxx-xxxx-xxxx`              |
| `ANAPHORA_TAG`      | The image version that `docker-compose.yaml` runs. The upgrade script sets it in `.env`.      | No          | `latest`                           |
| `DEBUG`             | Enable debug logging                                                                         | No          | `false`                            |
| `WORKER_COUNT`      | How many captures run at the same time (browser instances)                                   | No          | `2`                                |
| `SKIP_NOTIFIER`     | Set to `true` to send no report, mail or webhook. Every delivery is skipped, as in a test run. | No        | `false`                            |

More variables configure [OpenID Connect](../administration/authentication/oidc.md#configure-from-the-environment),
an [AI provider](#ai-provider-from-the-environment) and [demo data](#demo-data).

:::tip Production Deployment
For production, use a strong `DB_ENCRYPTION_KEY` and set `PUBLIC_URL` to your actual external URL (this is used for
callback URLs in SSO configurations).
:::

:::warning Keep the database key
Set `DB_ENCRYPTION_KEY` before the first start and keep it. The database does not open with another key, and the
automatic database backups use the same key. Without the variable, Anaphora uses a default key that is in the public
source, and it says so in the log at start. Anaphora has no command to change the key of an existing database.
:::

`WORKER_COUNT` also limits report rendering: at most two report templates or equations per worker run at the same
time. Each one runs in a separate process with 256 MB of memory.

### AI Provider from the Environment

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

### Demo Data

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

:::tip 🎁 Get a Free Trial Key
The `ACTIVATION_KEY` unlocks PRO or Enterprise features.
**[Request your free trial key →](https://portal.anaphora.it/trial)** — instant activation, no credit card required.
:::

## Upgrading Anaphora

Use the upgrade script that comes in every image. It tests the new version on a copy of your database first, and it can
roll back. See [Upgrading](./upgrading.md).

## Need Help?

:::note 💬 Join the Community
Having trouble? **[Ask on the Anaphora Forum →](https://forum.anaphora.it)** — Get help from the team and other users.
:::

## Next Steps

- [Upgrading](./upgrading.md) - Move to a new version safely
- [Features & Editions](./features) - Compare Free, PRO, and Enterprise editions
- [Configuration](./configuration) - Configure Anaphora settings
- [Basic Examples](../basic-examples/) - Create your first report job
