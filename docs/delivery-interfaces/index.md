---
sidebar_position: 5
description: Configure Anaphora delivery channels - send reports via SMTP email, Mailgun, Slack, webhooks, or S3 archiving. PDF export and multi-channel distribution.
keywords: [ email reports, Slack reports, webhook delivery, SMTP configuration, Mailgun integration, S3 archiving, PDF export, report distribution ]
---

# Delivery Interfaces - Email, Slack, S3 & Webhook

Delivery Interfaces define how reports reach your recipients. After Anaphora makes a report, it sends it
through one or more channels at the same time.

## Available Interfaces

| Interface                               | Description                  | Best For                  |
|-----------------------------------------|------------------------------|---------------------------|
| [SMTP](/delivery-interfaces/smtp)       | Direct email via SMTP server | Corporate email systems   |
| [Mailgun](/delivery-interfaces/mailgun) | Email via Mailgun API        | High-volume delivery      |
| [S3 Object Storage](/delivery-interfaces/s3) | S3-compatible object storage | Archiving & compliance    |
| [Webhook](/delivery-interfaces/webhook) | Custom HTTP endpoints        | Integrations & automation |

## Configuration

1. In the sidebar, click **Delivery Interfaces**
2. Click **Create Delivery Interface**
3. Enter a **Name**, select the **Type** and fill in the fields of that type
4. Click **Test**
5. Click **Save**

## Using in Jobs

After you save an interface, it shows in the job's **Delivery** tab:

- Select one or multiple delivery channels
- Configure per-channel settings (recipients, notification body, etc.)

## Next Steps

- [SMTP](/delivery-interfaces/smtp) - Configure direct email delivery
- [Mailgun](/delivery-interfaces/mailgun) - Set up Mailgun API integration
- [Slack](/delivery-interfaces/slack) - Connect Slack workspaces
- [S3](/delivery-interfaces/s3) - Archive reports to S3 storage
- [Webhook](/delivery-interfaces/webhook) - Configure custom endpoints
