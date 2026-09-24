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
| `DB_ENCRYPTION_KEY` | Key that encrypts the database. Without it, a built-in default key is used.                  | Recommended | `your-encryption-key`              |
| `ADMIN_USERNAME`    | Initial admin username                                                                       | No          | `admin`                            |
| `ADMIN_PASSWORD`    | Initial admin password                                                                       | No          | `your-secure-password`             |
| `ACTIVATION_KEY`    | License / activation key for Anaphora                                                        | No          | `xxxx-xxxx-xxxx-xxxx`              |
| `DEBUG`             | Enable debug logging                                                                         | No          | `false`                            |
| `WORKER_COUNT`      | Number of concurrent Puppeteer worker instances                                              | No          | `2`                                |
| `SKIP_NOTIFIER`     | Set to `true` to send no notifications at all. Every delivery is skipped, as in a test run.  | No          | `false`                            |
| `AI_PROVIDER`       | Adds an AI provider when the database is created: `openai`, `deepseek` or `custom`           | No          | `deepseek`                         |
| `AI_MODEL`          | Model of that AI provider                                                                    | No          | `deepseek-chat`                    |
| `AI_API_KEY`        | API key of that AI provider                                                                  | No          | `sk-...`                           |

:::tip Production Deployment
For production, use a strong `DB_ENCRYPTION_KEY` and set `PUBLIC_URL` to your actual external URL (this is used for
callback URLs in SSO configurations).
:::

:::warning Keep the database key
Set `DB_ENCRYPTION_KEY` before the first start and keep it. The database does not open with another key.
:::

### AI Provider from the Environment

`AI_PROVIDER`, `AI_MODEL` and `AI_API_KEY` add one AI provider, named **Default Provider**, to the default space.
Anaphora reads them once, when it creates the database. Set all three, or none. After that, manage the provider on the
[AI Providers](../administration/ai-providers.md) page.

### Demo Data

For a preview or evaluation instance, Anaphora can fill an empty database with demo content:

| Variable     | Description                                                                                                                                      | Example                                |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| `SEED_DEMO`  | Set to `1` to add demo jobs, runs, delivery interfaces and settings at start. Anaphora does this only when the database holds no job.            | `1`                                    |
| `DEMO_USERS` | Extra local users next to the admin, as `name:password:role`, separated by commas. The role is `admin` (a system user) or `user` (read-only). | `alice:Welcome:admin,bob:Welcome:user` |

`DEMO_USERS` works without `SEED_DEMO`. An entry with an error is skipped and logged.

### Docker Compose

For production deployments, use Docker Compose with persistent storage:

```yaml
version: '3.8'
services:
  anaphora:
    image: beshultd/anaphora
    init: true # reaps finished browser processes
    ports:
      - "3000:3000"
    volumes:
      - anaphora-storage:/usr/src/app/storage
      - anaphora-content:/usr/src/app/content
    environment:
      - PUBLIC_URL=https://anaphora.example.com
      - DB_ENCRYPTION_KEY=${DB_ENCRYPTION_KEY}
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
      - ACTIVATION_KEY=${ACTIVATION_KEY}
      - DEBUG=false
      - WORKER_COUNT=2

volumes:
  anaphora-storage:
  anaphora-content:
```

:::tip 🎁 Get a Free Trial Key
The `ACTIVATION_KEY` unlocks PRO or Enterprise features.
**[Request your free trial key →](https://portal.anaphora.it/trial)** — instant activation, no credit card required.
:::

## Updating Anaphora

Before you update, [back up](../administration/backup.md) your data. Then pull the new image and start the container
again:

```bash
docker compose pull
docker compose up -d
```

If you use `docker run`, run `docker pull beshultd/anaphora:latest`, then remove the old container and start a new one
with the same options.

## Need Help?

:::note 💬 Join the Community
Having trouble? **[Ask on the Anaphora Forum →](https://forum.anaphora.it)** — Get help from the team and other users.
:::

## Next Steps

- [Features & Editions](./features) - Compare Free, PRO, and Enterprise editions
- [Configuration](./configuration) - Configure Anaphora settings
- [Basic Examples](../basic-examples/) - Create your first report job
