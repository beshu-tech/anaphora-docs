---
sidebar_position: 3
description: Configure Slack webhook integration to deliver Anaphora reports directly to Slack channels with rich formatting.
keywords: [ Slack integration, webhook delivery, Slack notifications, report delivery, Anaphora Slack ]
---

# Slack

Deliver reports directly to Slack channels. Use the webhook delivery interface to send Slack messages.

## Setup Steps

### 1. Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App**
3. Choose **From scratch**
4. Name it "Anaphora" and select workspace

### 2. Enable Incoming Webhooks

1. In app settings, go to **Incoming Webhooks**
2. Toggle **Activate Incoming Webhooks** on
3. Click **Add New Webhook to Workspace**
4. Select the default channel
5. Copy the Webhook URL

### 3. Configure in Anaphora

1. Go to **Delivery Interfaces**
2. Add new **Webhook** interface
3. Paste the Webhook URL
4. Add the ```Authorization``` header with value ```Bearer xoxb-your-slack-bot-token```
5. Set the method to **POST** and body type to **JSON**
6. Add the JSON body:
```json
{
  "channel": "#your-channel",
  "text": "$MESSAGE"
}
```
7. Test and save
