---
sidebar_position: 4
description: Configure report delivery - email, webhooks, and S3 archiving. Multi-channel distribution and conditional routing.
keywords: [ report delivery, email reports, webhook, S3 archiving, report distribution ]
---

# Delivery Configuration

The **Deliver** tab configures where and how reports are sent. Anaphora supports multi-channel delivery via email,
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

Delivery Interfaces are reusable destination configurations. Configure them once under **Delivery Interfaces** in the
sidebar, then select them in any job. You can also select **Create new** in the job's **Delivery Interface** menu.

### Available Types

| Interface             | Best For             | Features                       |
|-----------------------|----------------------|--------------------------------|
| **SMTP**              | Corporate email      | SSL/TLS, attachments           |
| **Mailgun**           | Transactional email  | High volume, tracking          |
| **Webhook**           | Integrations         | Custom payloads, any endpoint  |
| **S3 Object Storage** | Archival, compliance | Historical records, versioning |

### Reusability

You can configure multiple interfaces of each type:

- Different SMTP servers for different teams
- Separate S3 buckets for different retention periods
- Various webhooks for different integrations

## S3 Archiving

S3 is particularly valuable for historical archives and compliance workflows.

In the job, set **File type** to **PDF Report**, **HTML Report**, or **PDF & HTML Report**.

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

| Field            | Description                                                     |
|------------------|-----------------------------------------------------------------|
| Attachments      | Select **Report as PDF** to attach the PDF report to the email. |
| Message template | Customizable email body with variables.                         |
| Recipients       | List of email addresses to send the report to.                  |

:::tip Recipients
Mark each recipient address as an **Individual mailbox** or a **Group address**. Click a recipient to change its type.
Emails sent to individual mailboxes include a snooze and unsubscribe link in the footer. Group addresses do not include
these links.
:::

## Webhook Delivery

Webhooks enable custom integrations with any HTTP endpoint.

### Webhook Configuration

| Field              | Description                                                                                                                                             |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| Message template   | Customizable message body with variables.                                                                                                               |
| JSON body template | Define the JSON payload with variables. Shown instead of **Message template** when **Define body in job instead** is selected in the Webhook interface. |

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

1. Click **Delivery Interface**
2. Select an existing interface, or **Create new**
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

## Testing Delivery

Every delivery config includes a test button: **Run with test email** for SMTP and Mailgun, **Test run** for Webhook
and S3 Object Storage. Use it to verify configuration before saving the job. **Test run without delivery** runs the job
and shows the output without notifying any recipients.
All steps during the capture and delivery process are logged for troubleshooting.
Select **Debug test run** in the button menu to also receive a video of the capture process.

## Next Steps

- [Delivery Interfaces](../delivery-interfaces/) - Configure global interface settings
- [Basic Examples](../basic-examples/) - See complete job examples
