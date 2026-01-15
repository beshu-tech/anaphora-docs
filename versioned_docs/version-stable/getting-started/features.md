---
sidebar_position: 3
description: Compare Anaphora Free, PRO, and Enterprise editions. See what's included in each tier and choose the right plan for your reporting needs.
keywords: [Anaphora features, free edition, pro license, enterprise edition, activation key, feature comparison, pricing tiers]
---

# Features & Editions

Choose the edition that fits your needs. All editions include the **full reporting engine** — higher tiers unlock team features and integrations.

## 🆓 Free Edition

**Perfect for evaluation and personal projects**

:::tip What you get
- ✅ Up to **2 scheduled jobs**
- ✅ Kibana, Grafana, and generic web capture
- ✅ PDF report composer with custom layouts
- ✅ Email (SMTP), Mailgun, Slack, and Webhook delivery
- ✅ Notification throttling and retry policies
- ✅ Local user authentication
:::

**Best for:** Trying Anaphora, personal dashboards, small-scale reporting

---

## ⭐ PRO Edition

**For production teams who need unlimited jobs and AI**

:::tip Everything in Free, plus
- ✅ **Unlimited jobs** — no restrictions
- ✅ **Spaces** — organize jobs into isolated workspaces
- ✅ **AI Analysis** — LLM-powered summaries and anomaly detection
- ✅ **Priority support** — faster response times
:::

**Best for:** Production workloads, growing teams, AI-enhanced reports

---

## 🏢 Enterprise Edition

**For organizations requiring SSO and compliance**

:::tip Everything in PRO, plus
- ✅ **LDAP / Active Directory** — enterprise directory auth
- ✅ **SAML SSO** — Okta, Azure AD, OneLogin, etc.
- ✅ **OpenID Connect** — Google, Auth0, Keycloak, etc.
- ✅ **S3 Archiving** — compliance-ready report storage
- ✅ **Self-Monitoring API** — health endpoints for external systems
:::

**Best for:** Corporate SSO requirements, compliance, large-scale deployments

---

## Feature Comparison

| Feature | 🆓 Free | ⭐ PRO | 🏢 Enterprise |
|---------|:-------:|:------:|:-------------:|
| **Jobs** | 2 | ∞ Unlimited | ∞ Unlimited |
| | | | |
| **Capture** | | | |
| Kibana Connector | ✅ | ✅ | ✅ |
| Grafana Connector | ✅ | ✅ | ✅ |
| Generic Web Capture | ✅ | ✅ | ✅ |
| PDF Composer | ✅ | ✅ | ✅ |
| | | | |
| **Delivery** | | | |
| Email (SMTP) | ✅ | ✅ | ✅ |
| Mailgun | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ |
| Webhook | ✅ | ✅ | ✅ |
| S3 Archiving | ❌ | ❌ | ✅ |
| | | | |
| **Team & Organization** | | | |
| Spaces (Multi-tenancy) | ❌ | ✅ | ✅ |
| AI Analysis | ❌ | ✅ | ✅ |
| | | | |
| **Authentication** | | | |
| Local Users | ✅ | ✅ | ✅ |
| LDAP / Active Directory | ❌ | ❌ | ✅ |
| SAML SSO | ❌ | ❌ | ✅ |
| OpenID Connect | ❌ | ❌ | ✅ |
| | | | |
| **Operations** | | | |
| Self-Monitoring API | ❌ | ❌ | ✅ |
| Priority Support | ❌ | ✅ | ✅ |

## Activation Keys

Anaphora runs in **Free mode by default**. Unlock PRO or Enterprise with an activation key.

### How to Activate

**Option 1: Environment Variable**

```bash
docker run -p 3000:3000 \
  -e PUBLIC_URL=http://localhost:3000 \
  -e ACTIVATION_KEY=your-activation-key \
  -d beshu/anaphora
```

**Option 2: Admin UI**

1. Go to **Settings** → **License**
2. Enter your activation key
3. Click **Activate**

### Key Benefits

- 🔒 **Offline Validation** — no internet required
- ♾️ **Perpetual Licenses** — keys don't expire
- 🔄 **Transferable** — move between deployments

## Get Started

1. [Install Anaphora](./installation) — runs in Free mode by default
2. Create up to 2 jobs to evaluate
3. [Contact Beshu Tech](https://beshu.tech) for PRO or Enterprise keys

## Next Steps

- [Installation](./installation) — Get Anaphora running
- [Configuration](./configuration) — Set up your environment
- [Basic Examples](../basic-examples/) — Create your first report job
