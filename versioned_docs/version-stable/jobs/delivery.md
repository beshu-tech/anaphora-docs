---
sidebar_position: 4
---

# Delivery

The Delivery tab configures where and how reports are sent.

## Overview

After composition, the report is delivered via your configured interfaces.

## Delivery Configuration

### Select Interface

Choose from configured delivery interfaces:
- Email (SMTP/Mailgun)
- Slack
- Webhook
- Multiple (send to several)

### Recipients

Configure who receives the report:
- Email addresses
- Slack channels
- Webhook URLs

### Message Customization

| Field | Description |
|-------|-------------|
| Subject | Email subject line (supports variables) |
| Body | Message text |
| Attachment | Include report as attachment |

## Multiple Delivery

Send the same report to multiple destinations:
1. Click **Add Delivery**
2. Configure additional interface
3. Repeat as needed

## Conditional Delivery

Combine with Advanced Capture to:
- Send to different channels based on severity
- Include different recipients based on conditions
- Customize message per condition

## Testing Delivery

1. Click **Test** on the job
2. Verify delivery arrives correctly
3. Check formatting and attachments

## Next Steps

- [Delivery Interfaces](../delivery-interfaces/) - Configure global delivery settings
