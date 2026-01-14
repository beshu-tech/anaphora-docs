---
sidebar_position: 2
description: Configure Anaphora connections to Kibana and Grafana. Environment variables, credentials setup, and initial configuration guide.
keywords: [Anaphora configuration, Kibana connection, Grafana connection, environment variables, setup guide]
---

# Configuration Guide

Configure Anaphora for your environment and requirements.

## Initial Setup

On first launch, Anaphora will guide you through initial configuration:

1. Set admin credentials
2. Configure license (if applicable)
3. Set up your first connection to Kibana or Grafana

## Environment Variables

Anaphora can be configured via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `ANAPHORA_PORT` | HTTP port | `8080` |
| `ANAPHORA_DATA_DIR` | Data storage path | `/data` |
| `ANAPHORA_LICENSE_KEY` | License key | - |

## Connection Setup

### Adding a Kibana Connection

1. Navigate to **Settings** > **Connections**
2. Click **Add Connection**
3. Select **Kibana** as the type
4. Enter your Kibana URL and credentials
5. Test the connection
6. Save

### Adding a Grafana Connection

1. Navigate to **Settings** > **Connections**
2. Click **Add Connection**
3. Select **Grafana** as the type
4. Enter your Grafana URL and API key
5. Test the connection
6. Save

## Next Steps

- [Basic Examples](../basic-examples/) - See Anaphora in action
