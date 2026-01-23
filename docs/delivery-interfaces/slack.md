---
sidebar_position: 3
description: Configure Slack webhook integration to deliver Anaphora reports directly to Slack channels with rich formatting.
keywords: [ Slack integration, webhook delivery, Slack notifications, report delivery, Anaphora Slack ]
---

# Slack

Deliver reports directly to Slack channels. Use the webhook delivery interface to send Slack messages.

## Setup Steps

### 1. Create Slack Webhook

1. Go to [Slack Docs](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/)
2. Follow the instructions to create an **Incoming Webhook**

### 2. Configure in Anaphora

1. Go to **Delivery Interfaces**
2. Add new **Webhook** interface
3. Paste the Webhook URL
4. Set the method to **POST** and body type to **JSON**
5. Add the JSON body:
   ```json
    {
      "text": "Hello, world."
    }
   ```
6. Test and save
