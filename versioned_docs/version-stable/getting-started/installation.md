---
sidebar_position: 1
description: Install Anaphora with Docker or Docker Compose. Quick setup guide for automated Kibana and Grafana report generation.
keywords: [Anaphora installation, Docker setup, Kibana reporting tool, Grafana reporting tool, automated reports installation]
---

# Installation Guide

Get Anaphora up and running in your environment.

## Requirements

- Docker and Docker Compose (recommended)
- Or: Java 17+ runtime environment
- Network access to your Kibana/Grafana instances

## Quick Start with Docker

The fastest way to get started is using Docker:

```bash
docker run -p 3000:3000 \
  -e PUBLIC_URL=http://localhost:3000 \
  -e ADMIN_USERNAME=admin \
  -e ADMIN_PASSWORD=admin \
  -d beshu-tech/anaphora
```

Then open [http://localhost:3000](http://localhost:3000) in your browser and log in with `admin` / `admin`.

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_URL` | External URL where Anaphora is accessible | `http://anaphora.example.com:3000` |
| `ADMIN_USERNAME` | Initial admin username | `admin` |
| `ADMIN_PASSWORD` | Initial admin password | `your-secure-password` |

:::tip Production Deployment
For production, use a strong password and set `PUBLIC_URL` to your actual external URL (this is used for callback URLs in SSO configurations).
:::

### Docker Compose

For production deployments, use Docker Compose with persistent storage:

```yaml
version: '3.8'
services:
  anaphora:
    image: beshu-tech/anaphora
    ports:
      - "3000:3000"
    volumes:
      - anaphora-data:/data
    environment:
      - PUBLIC_URL=https://anaphora.example.com
      - ADMIN_USERNAME=admin
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
      - ACTIVATION_KEY=${ACTIVATION_KEY}

volumes:
  anaphora-data:
```

:::tip 🎁 Get a Free Trial Key
The `ACTIVATION_KEY` unlocks PRO or Enterprise features. **[Request your free trial key →](https://portal.anaphora.it)** — instant activation, no credit card required.
:::

## Need Help?

:::note 💬 Join the Community
Having trouble? **[Ask on the Anaphora Forum →](https://forum.anaphora.it)** — Get help from the team and other users.
:::

## Next Steps

- [Features & Editions](./features) - Compare Free, PRO, and Enterprise editions
- [Configuration](./configuration) - Configure Anaphora settings
- [Basic Examples](../basic-examples/) - Create your first report job
