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

1. In the sidebar, click **Delivery Interfaces**
2. Click **Create Delivery Interface** and select the **Webhook** type
3. Paste the webhook URL into **URL**
4. Set **Method** to `POST` and **Body type** to `json`
5. Add the **JSON body**:
   ```json
    {
      "text": "$MESSAGE"
    }
   ```
6. Click **Test**, then click **Save**
