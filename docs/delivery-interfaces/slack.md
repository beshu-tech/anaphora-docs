---
sidebar_position: 3
---

# Slack

Deliver reports directly to Slack channels.

## Configuration

| Field | Description | Required |
|-------|-------------|----------|
| Name | Interface identifier | Yes |
| Webhook URL | Slack Incoming Webhook | Yes |
| Default Channel | Fallback channel | No |

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

1. Go to **Settings** > **Delivery Interfaces**
2. Add new **Slack** interface
3. Paste the Webhook URL
4. Test and save

## Message Formatting

Reports sent to Slack include:
- Report title as header
- Thumbnail preview (if image)
- Download link for full PDF
- Key metrics (if extracted)

## Multiple Channels

Create separate interfaces for different channels, or override the channel per-job.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Webhook invalid | Regenerate webhook URL |
| Channel not found | Verify channel exists and bot has access |
| Message too large | Reduce captured content size |
