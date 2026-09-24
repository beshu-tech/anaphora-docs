---
sidebar_position: 4
description: Configure report delivery - email, webhooks, and S3 archiving. Multi-channel distribution and conditional routing.
keywords: [ report delivery, email reports, webhook, S3 archiving, report distribution ]
---

# Delivery Configuration

The Delivery tab configures where and how reports are sent. Anaphora supports multi-channel delivery via email,
webhooks, and S3 archiving.

## Overview

After composition, the report is delivered via your configured interfaces:

```mermaid
flowchart LR
    report["Composed Report (PDF)"]

    subgraph channels["Delivery Channels"]
        email["Email"]
        s3["S3"]
        webhook["Webhook"]
    end

    report --> channels
```

## Delivery Interfaces

Delivery Interfaces are reusable destination configurations. Configure them once in Settings, then select them in any
job.

### Available Types

| Interface   | Best For             | Features                       |
|-------------|----------------------|--------------------------------|
| **SMTP**    | Corporate email      | SSL/TLS, attachments           |
| **Mailgun** | Transactional email  | High volume, tracking          |
| **Webhook** | Integrations         | Custom payloads, any endpoint  |
| **S3**      | Archival, compliance | Historical records, versioning |

### Reusability

You can configure multiple interfaces of each type:

- Different SMTP servers for different teams
- Separate S3 buckets for different retention periods
- Various webhooks for different integrations

## S3 Archiving

S3 is particularly valuable for historical archives and compliance workflows.

### Use Cases

| Scenario                     | Benefit                                        |
|------------------------------|------------------------------------------------|
| **Historical reference**     | "What did this dashboard look like on date X?" |
| **Compliance evidence**      | Immutable records for audit requirements       |
| **Long-term retention**      | Store reports beyond housekeeping limits       |
| **Cross-system integration** | Other tools can access archived reports        |

## Email Delivery

Anaphora supports sending reports via SMTP or Mailgun.

### Email Options

| Field            | Description                                    |
|------------------|------------------------------------------------|
| Attachments      | Whether to attach the PDF report to the email. |
| Message template | Customizable email body with variables.        |
| Recipients       | List of email addresses to send the report to. |

:::tip Recipients
Recipient email addresses can be either marked as single user or as group address. Emails sent to single user addresses
will include a snooze and unsubscribe link in the footer. Group addresses will not include these links.
:::

A snooze pauses the job's emails to that recipient for 5 minutes to 8 days. The recipient must pick a duration. The
unsubscribe link stops the emails.

## Webhook Delivery

Webhooks enable custom integrations with any HTTP endpoint.

### Webhook Configuration

| Field              | Description                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|
| Message template   | Customizable message body with variables.                                                     |
| JSON body template | Define the JSON payload with variables. Only available when enabled in the Webhook interface. |

### Webhook Use Cases

| Integration           | Description                            |
|-----------------------|----------------------------------------|
| **Ticketing systems** | Create tickets for alerts              |
| **Chat platforms**    | Create messages in collaboration tools |
| **Data pipelines**    | Feed report data to analytics          |
| **Custom dashboards** | Update external status pages           |

## Multi-Channel Delivery

Send the same report to multiple destinations:

### Configuration

1. Click **Add Delivery**
2. Select interface type
3. Configure destination
4. Repeat for additional channels

### Example: Alert with Archive

```
Delivery 1: Webhook e.g. Slack (immediate notification)
Delivery 2: Email (stakeholder distribution)
Delivery 3: S3 (permanent archive)
```

### Partial Success

With multi-channel delivery:

- Each channel is attempted independently
- Partial success (some channels succeed, others fail) is logged
- The run and the Jobs list show **Delivery issue**. Job health counts a report that reached nobody as failed, and a
  report that reached some destinations as partly delivered.

## Report Links

The links in a delivered email, Slack message or webhook are private. Each run has a secret token, and the links carry
it. The report files (PDF, HTML, images) open for a link with that token, or for a signed-in member of the run's space.
Anyone else gets "not found".

## Withheld Reports

When a text block of the report fails, or the report cannot be built, Anaphora does not deliver it. No recipient, bucket
or webhook gets it. The Jobs list shows the job as **Not delivered**, and job health counts the run as failed. The run
does not count as sent, so a throttled job sends the next run. See [Composer](./composer.md#errors-in-a-text-block).

With the S3 file type **PDF & HTML Report**, nothing is uploaded when the HTML copy cannot be built.

## Testing Delivery

Every delivery config includes a **Test** button. Use it to verify configuration before saving the job. A test
withholds a report with a broken text block in the same way, and says so.
All steps during the capture and delivery process are logged for troubleshooting.
Use debug mode to also receive a video of the capture process.

## Next Steps

- [Delivery Interfaces](../delivery-interfaces/) - Configure global interface settings
- [Basic Examples](../basic-examples/) - See complete job examples
