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

| Variable            | Description                                     | Required    | Example                            |
|---------------------|-------------------------------------------------|-------------|------------------------------------|
| `PUBLIC_URL`        | External URL where Anaphora is accessible       | Yes         | `http://anaphora.example.com:3000` |
| `DB_ENCRYPTION_KEY` | Key used to encrypt the DB.                     | Recommended | `your-encryption-key`              |
| `ADMIN_USERNAME`    | Initial admin username                          | No          | `admin`                            |
| `ADMIN_PASSWORD`    | Initial admin password                          | No          | `your-secure-password`             |
| `ACTIVATION_KEY`    | License / activation key for Anaphora           | No          | `xxxx-xxxx-xxxx-xxxx`              |
| `DEBUG`             | Enable debug logging                            | No          | `false`                            |
| `WORKER_COUNT`      | Number of concurrent Puppeteer worker instances | No          | `2`                                |

:::tip Production Deployment
For production, use a strong `DB_ENCRYPTION_KEY` and set `PUBLIC_URL` to your actual external URL (this is used for
callback URLs in SSO configurations).
:::

### Docker Compose

For production deployments, use Docker Compose with persistent storage:

```yaml
version: '3.8'
services:
  anaphora:
    image: beshultd/anaphora
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

## Need Help?

:::note 💬 Join the Community
Having trouble? **[Ask on the Anaphora Forum →](https://forum.anaphora.it)** — Get help from the team and other users.
:::

## Next Steps

- [Features & Editions](./features) - Compare Free, PRO, and Enterprise editions
- [Configuration](./configuration) - Configure Anaphora settings
- [Basic Examples](../basic-examples/) - Create your first report job
