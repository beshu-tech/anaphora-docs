---
sidebar_position: 5
description: Configure Anaphora delivery channels - send reports via SMTP email, Mailgun, Slack, webhooks, or S3 archiving. PDF export and multi-channel distribution.
keywords: [ email reports, Slack reports, webhook delivery, SMTP configuration, Mailgun integration, S3 archiving, PDF export, report distribution ]
---

# Delivery Interfaces - Email, Slack, S3 & Webhook

Delivery Interfaces define how reports reach your recipients. Once a report is generated, Anaphora handles distribution
through multiple channels simultaneously.

## Available Interfaces

| Interface                               | Description                  | Best For                  |
|-----------------------------------------|------------------------------|---------------------------|
| [SMTP](/delivery-interfaces/smtp)       | Direct email via SMTP server | Corporate email systems   |
| [Mailgun](/delivery-interfaces/mailgun) | Email via Mailgun API        | High-volume delivery      |
| [S3](/delivery-interfaces/s3)           | S3-compatible object storage | Archiving & compliance    |
| [WebHook](/delivery-interfaces/webhook) | Custom HTTP endpoints        | Integrations & automation |

## Configuration

1. Navigate to **Delivery Interfaces**
2. Click **Add Interface**
3. Select type and configure credentials
4. Test the connection
5. Save

## Using in Jobs

Once configured, interfaces appear in the job's **Delivery** tab:

- Select one or multiple delivery channels
- Configure per-channel settings (recipients, notification body, etc.)

## Next Steps

- [SMTP](/delivery-interfaces/smtp) - Configure direct email delivery
- [Mailgun](/delivery-interfaces/mailgun) - Set up Mailgun API integration
- [Slack](/delivery-interfaces/slack) - Connect Slack workspaces
- [S3](/delivery-interfaces/s3) - Archive reports to S3 storage
- [WebHook](/delivery-interfaces/webhook) - Configure custom endpoints
