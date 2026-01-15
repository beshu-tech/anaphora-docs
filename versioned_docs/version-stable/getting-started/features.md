---
sidebar_position: 3
description: Anaphora features overview and comparison of Free, PRO, and Enterprise editions with activation key licensing.
keywords: [Anaphora features, free edition, pro license, enterprise edition, activation key, feature comparison]
---

# Features & Editions

Anaphora is available in three editions: **Free**, **PRO**, and **Enterprise**. All editions include the core reporting engine — higher tiers unlock additional features and remove limitations.

## Feature Overview

### Core Capabilities

| Feature | Description |
|---------|-------------|
| **Scheduled Jobs** | Automated report generation on CRON schedules |
| **Headless Browser Capture** | Chrome-based connector for any authenticated web application |
| **Kibana Connector** | Dashboard, Canvas, and Discover snapshots with auto-detection |
| **Grafana Connector** | Dashboard and panel captures via API |
| **Generic Web Connector** | Any web application with multi-step navigation |
| **PDF Report Composer** | Assemble snapshots with text, images, and custom layouts |
| **Notification Throttling** | Control notification frequency for high-frequency jobs |
| **Retry Policies** | Automatic retries with configurable delays and suspension |
| **Housekeeping** | Automatic cleanup of old runs, reports, and artifacts |

### Delivery Options

| Delivery Method | Description |
|-----------------|-------------|
| **Email (SMTP)** | Direct SMTP delivery with attachments |
| **Mailgun** | Mailgun API integration |
| **Webhook** | HTTP POST with customizable payloads |
| **Slack** | Native Slack integration |
| **S3 Archiving** | Amazon S3 and compatible storage (PRO/Enterprise) |

### Enterprise Features

| Feature | Description |
|---------|-------------|
| **Spaces** | Multi-tenant isolation with share-nothing containers |
| **LDAP/Active Directory** | Enterprise directory authentication |
| **SAML SSO** | Single Sign-On with Okta, Azure AD, OneLogin, etc. |
| **OpenID Connect** | OAuth 2.0 / OIDC with Google, Auth0, Keycloak, etc. |
| **AI Analysis** | LLM-powered report summaries and anomaly detection |
| **Self-Monitoring API** | Health endpoints for external monitoring systems |

## Edition Comparison

| Feature | Free | PRO | Enterprise |
|---------|:----:|:---:|:----------:|
| **Jobs** | 2 max | Unlimited | Unlimited |
| **Scheduled Reports** | ✅ | ✅ | ✅ |
| **Kibana Connector** | ✅ | ✅ | ✅ |
| **Grafana Connector** | ✅ | ✅ | ✅ |
| **Generic Web Connector** | ✅ | ✅ | ✅ |
| **PDF Composer** | ✅ | ✅ | ✅ |
| **Email Delivery** | ✅ | ✅ | ✅ |
| **Webhook Delivery** | ✅ | ✅ | ✅ |
| **Slack Delivery** | ✅ | ✅ | ✅ |
| **S3 Archiving** | ❌ | ❌ | ✅ |
| **Local Authentication** | ✅ | ✅ | ✅ |
| **LDAP/Active Directory** | ❌ | ❌ | ✅ |
| **SAML SSO** | ❌ | ❌ | ✅ |
| **OpenID Connect** | ❌ | ❌ | ✅ |
| **Spaces (Multi-tenancy)** | ❌ | ✅ | ✅ |
| **AI Analysis** | ❌ | ✅ | ✅ |
| **Priority Support** | ❌ | ✅ | ✅ |

## Activation Keys

Anaphora runs in Free mode by default. To unlock PRO or Enterprise features, obtain an activation key from [Beshu Tech](https://beshu.tech).

### Applying an Activation Key

**Option 1: Environment Variable**

```bash
docker run -p 3000:3000 \
  -e PUBLIC_URL=http://localhost:3000 \
  -e ACTIVATION_KEY=your-activation-key \
  -d beshu-tech/anaphora
```

**Option 2: Admin UI**

1. Log in as an administrator
2. Go to **Settings** > **License**
3. Enter your activation key
4. Click **Activate**

### Key Features

- **Offline Validation** — Keys are validated locally, no internet connection required
- **Perpetual Licenses** — Keys don't expire (unless time-limited by agreement)
- **Transferable** — Move your license between deployments

## Choosing an Edition

| Use Case | Recommended Edition |
|----------|---------------------|
| Personal projects, evaluation | Free |
| Small teams, production workloads | PRO |
| Enterprise SSO, compliance, multi-tenant | Enterprise |

### Free Edition

Perfect for:
- Evaluating Anaphora
- Personal dashboards
- Small-scale reporting (up to 2 jobs)

### PRO Edition

Best for:
- Production workloads with unlimited jobs
- Teams using Spaces for organization
- AI-powered report analysis

### Enterprise Edition

Required for:
- Corporate SSO (LDAP, SAML, OIDC)
- S3 archiving for compliance
- Large-scale multi-tenant deployments

## Getting Started

1. [Install Anaphora](./installation) using Docker
2. Try the Free edition with up to 2 jobs
3. [Contact Beshu Tech](https://beshu.tech) for PRO or Enterprise activation keys

## Next Steps

- [Installation](./installation) - Get Anaphora running
- [Configuration](./configuration) - Set up your environment
- [Basic Examples](../basic-examples/) - Create your first report job
