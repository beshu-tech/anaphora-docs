---
sidebar_position: 3
description: Compare Anaphora Free, PRO, and Enterprise editions. See what's included in each tier and choose the right plan for your reporting needs.
keywords: [Anaphora features, free edition, pro license, enterprise edition, activation key, feature comparison, pricing tiers]
---

# Features & Editions

Choose the edition that fits your needs. All editions include the **full reporting engine** — higher tiers unlock team features and integrations.

:::info 🚀 Ready to try PRO or Enterprise?
**[Get a free trial key →](https://portal.anaphora.it)** — No credit card required. Instant activation.
:::

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

1. Go to **Settings** → **System** → **Activation Key**
2. Click on Load another
3. Enter your activation key
4. Click **Activate**

![](images/activationkey.png)

### Key Benefits

- 🔒 **Offline Validation** — no internet required
- ♾️ **Perpetual Licenses** — keys don't expire
- 🔄 **Transferable** — move between deployments

## Get Your Trial Key

:::tip 🎁 Try PRO or Enterprise Free
**[Request a trial activation key →](https://portal.anaphora.it)**

- Instant delivery — no waiting
- Full access to all features
- No credit card required
:::

## Need Help?

:::note 💬 Join the Community
**[Visit the Anaphora Forum →](https://forum.anaphora.it)**

Ask questions, share your workflows, and connect with other users and the Anaphora team.
:::

## Next Steps

- [Installation](./installation) — Get Anaphora running
- [Configuration](./configuration) — Set up your environment
- [Basic Examples](../basic-examples/) — Create your first report job
