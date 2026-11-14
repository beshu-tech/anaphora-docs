---
sidebar_position: 2
description: Configure Mailgun API integration for reliable email delivery with built-in analytics and better deliverability.
keywords: [ Mailgun integration, email API, transactional email, Anaphora Mailgun, email delivery ]
---

# Mailgun

Send reports via the Mailgun email API.

![Mailgun delivery interface configuration showing sender email, sender name, and API key fields](images/mailgun.png)

## Why Mailgun?

- No SMTP server to manage
- Better deliverability tracking
- Easy setup
- Higher sending limits

## Configuration

| Field           | Description                                                             | Required |
|-----------------|-------------------------------------------------------------------------|----------|
| Name            | Interface identifier                                                    | Yes      |
| Sender email    | Your Mailgun domain with any name, for example myname@my-mailgun-domain.com | Yes      |
| Sender name     | The name to show as the sender                                          | Yes      |
| Mailgun Api Key | Mailgun API key (at least 10 characters)                                | Yes      |

## Setup steps

### 1. Get API credentials

1. Log in to Mailgun
2. Navigate to **Settings** > **API Keys**
3. Copy your Private API Key
4. Note your Mailgun sender domain (to use in sender email)

## Domain verification

Make sure your Mailgun domain is verified for best deliverability:

- Add DNS records as instructed by Mailgun
- Verify SPF and DKIM are configured

## Sending behavior

Anaphora sends up to 3 messages at the same time, in the order of the recipients. One message may take at most 5 minutes.
This limit is fixed. When one message ends at that limit before any message of the delivery went through, Anaphora does
not start the others. Mailgun is not answering, and the run is retried. Once one message went through, the others still
go out.

A Mailgun request that Anaphora gave up on can still run for up to 5 minutes. If Mailgun accepts it late, the retry of
the run can send the same message twice.

## Testing

Click **Test**, enter a **Test email** address (and optionally a **Test subject** and **Test body**), then click
**Send test email**. Do this before you use the interface in jobs.
