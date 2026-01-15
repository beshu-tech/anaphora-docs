---
sidebar_position: 2
description: Configure Anaphora with environment variables for production deployments. PUBLIC_URL, admin credentials, and license setup.
keywords: [Anaphora configuration, environment variables, PUBLIC_URL, setup guide, production deployment]
---

# Configuration Guide

Configure Anaphora for your environment and requirements.

## Environment Variables

Anaphora is configured via environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `PUBLIC_URL` | External URL where Anaphora is accessible | Yes (production) |
| `ADMIN_USERNAME` | Initial admin username | No (default: `admin`) |
| `ADMIN_PASSWORD` | Initial admin password | No (prompted on first login) |
| `ACTIVATION_KEY` | PRO/Enterprise activation key | No |
| `ANAPHORA_DATA_DIR` | Data storage path | No (default: `/data`) |

### PUBLIC_URL

The `PUBLIC_URL` environment variable defines the external URL where Anaphora is accessible. This is **required for production deployments** and used for:

- SSO callback URLs (SAML, OIDC)
- Links in email notifications
- Webhook response URLs

```bash
# Example: Production deployment
PUBLIC_URL=https://anaphora.company.com

# Example: Local development (optional)
PUBLIC_URL=http://localhost:3000
```

:::warning Required for SSO
If you're using SAML or OIDC authentication, `PUBLIC_URL` must be set correctly. The callback URLs registered with your identity provider must match this value.
:::

## Initial Setup

On first launch:

1. Navigate to `PUBLIC_URL` in your browser
2. Log in with admin credentials (set via environment variables or prompted)
3. Configure your license if using PRO/Enterprise features
4. Create your first job

## Next Steps

- [Features & Editions](./features) - Compare Free, PRO, and Enterprise
- [Basic Examples](../basic-examples/) - Create your first report job
