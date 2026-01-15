---
sidebar_position: 2
description: Configure Mailgun API integration for reliable email delivery with built-in analytics and better deliverability.
keywords: [Mailgun integration, email API, transactional email, Anaphora Mailgun, email delivery]
---

# Mailgun

Send reports via the Mailgun email API.

![Mailgun delivery interface configuration showing sender email, sender name, and API key fields](images/mailgun.png)

## Why Mailgun?

- No SMTP server to manage
- Better deliverability tracking
- Built-in analytics
- Higher sending limits

## Configuration

| Field | Description | Required |
|-------|-------------|----------|
| Name | Interface identifier | Yes |
| API Key | Mailgun API key | Yes |
| Domain | Your Mailgun domain | Yes |
| From Address | Sender email | Yes |
| Region | US or EU | Yes |

## Setup Steps

### 1. Get API Credentials

1. Log in to Mailgun
2. Navigate to **Settings** > **API Keys**
3. Copy your Private API Key
4. Note your sending domain

### 2. Configure in Anaphora

1. Go to **Settings** > **Delivery Interfaces**
2. Add new **Mailgun** interface
3. Enter API key and domain
4. Select region (US or EU)
5. Set from address
6. Test and save

## Domain Verification

Ensure your Mailgun domain is verified for best deliverability:
- Add DNS records as instructed by Mailgun
- Verify SPF and DKIM are configured

## Testing

Send a test email to verify configuration before using in jobs.
