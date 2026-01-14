---
sidebar_position: 5
---

# Delivery Interfaces

Delivery Interfaces define how reports reach your recipients. Configure them globally in Settings, then select per-job.

## Available Interfaces

| Interface | Description |
|-----------|-------------|
| [SMTP](./delivery-interfaces/smtp) | Direct email via SMTP server |
| [Mailgun](./delivery-interfaces/mailgun) | Email via Mailgun API |
| [Slack](./delivery-interfaces/slack) | Slack workspace integration |
| [WebHook](./delivery-interfaces/webhook) | Custom HTTP endpoints |

## Configuration

1. Navigate to **Settings** > **Delivery Interfaces**
2. Click **Add Interface**
3. Select type and configure
4. Test the connection
5. Save

## Using in Jobs

Once configured, interfaces appear in the job's Delivery tab for selection.

## Multiple Interfaces

You can configure multiple interfaces of the same type (e.g., different Slack workspaces or email servers).
