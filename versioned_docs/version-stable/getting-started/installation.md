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

## Docker Installation (Recommended)

The fastest way to get started is using Docker:

```bash
docker pull beshutech/anaphora:latest
docker run -d -p 8080:8080 beshutech/anaphora:latest
```

### Docker Compose

For production deployments, use Docker Compose:

```yaml
version: '3.8'
services:
  anaphora:
    image: beshutech/anaphora:latest
    ports:
      - "8080:8080"
    volumes:
      - anaphora-data:/data
    environment:
      - ANAPHORA_LICENSE_KEY=${LICENSE_KEY}

volumes:
  anaphora-data:
```

## Accessing the UI

Once running, access Anaphora at:

```
http://localhost:8080
```

Default credentials will be displayed in the console on first startup.

## Next Steps

- [Configuration](./configuration) - Configure Anaphora settings
