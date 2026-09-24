---
sidebar_position: 4
description: Configure OpenID Connect (OIDC) authentication for Anaphora with Google, Auth0, Keycloak, and other OAuth 2.0 providers.
keywords: [ OpenID Connect, OIDC, OAuth, Google login, Auth0, Keycloak, OAuth 2.0 ]
---

# OpenID Connect (OIDC)

Integrate with OAuth 2.0 / OpenID Connect providers for modern authentication. OIDC provides a simpler setup than SAML while offering similar enterprise features.

![](images/oidc.png)
## Overview

OIDC integration provides:

- **Modern authentication** — Built on OAuth 2.0
- **Simple configuration** — Fewer settings than SAML
- **Automatic discovery** — Provider configuration via well-known endpoint
- **Token-based sessions** — Secure, stateless authentication

## Supported Providers

| Provider | Issuer URL | Notes |
|----------|------------|-------|
| **Google** | `https://accounts.google.com` | Google Workspace or personal |
| **Auth0** | `https://your-tenant.auth0.com` | Full-featured IdP |
| **Keycloak** | `https://keycloak.company.com/realms/your-realm` | Self-hosted option |
| **Okta** | `https://your-org.okta.com` | Enterprise IdP |
| **Azure AD** | `https://login.microsoftonline.com/{tenant}/v2.0` | Microsoft cloud |
| **OneLogin** | `https://your-domain.onelogin.com/oidc/2` | Enterprise SSO |
| **Ping Identity** | `https://auth.pingone.com/{env-id}/as` | Enterprise |
| **Custom** | Any OIDC-compliant issuer | Must support discovery |

## Configuration

### Step 1: Create OAuth Application

Create an OAuth/OIDC application in your identity provider.

#### Google

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services > Credentials > Create Credentials > OAuth Client ID
3. Application type: Web application
4. Authorized redirect URIs: `https://anaphora.company.com/auth/login-oidc/callback`
5. Copy Client ID and Client Secret

#### Auth0

1. Applications > Create Application
2. Choose "Regular Web Application"
3. Settings tab:
   - Allowed Callback URLs: `https://anaphora.company.com/auth/login-oidc/callback`
   - Allowed Logout URLs: `https://anaphora.company.com/auth/login`
4. Copy Domain, Client ID, and Client Secret

#### Keycloak

1. Clients > Create Client
2. Client ID: `anaphora`
3. Client Protocol: openid-connect
4. Access Type: confidential
5. Valid Redirect URIs: `https://anaphora.company.com/auth/login-oidc/callback`
6. Copy Client Secret from Credentials tab

#### Okta

1. Applications > Create App Integration
2. Sign-in method: OIDC
3. Application type: Web Application
4. Sign-in redirect URIs: `https://anaphora.company.com/auth/login-oidc/callback`
5. Copy Client ID and Client Secret

#### Azure AD

1. App registrations > New registration
2. Redirect URI: Web > `https://anaphora.company.com/auth/login-oidc/callback`
3. Certificates & secrets > New client secret
4. Copy Application (client) ID and secret value

### Step 2: Configure in Anaphora

1. Go to **Settings** > **System** > **Auth** > **OIDC**
2. Enter the configuration:

| Field | Description | Example |
|-------|-------------|---------|
| Issuer | URL of the provider. Other paths are relative to it. Required | `https://accounts.google.com` |
| Callback URL | Full callback URL. Empty uses the default (see below) | `https://anaphora.company.com/auth/login-oidc/callback` |
| Logout path | Path of the provider logout endpoint. Default: `/protocol/openid-connect/logout` | `/protocol/openid-connect/logout` |
| Client ID | OAuth client identifier. Required | `abc123def456` |
| Client secret | OAuth client secret (stored encrypted). Required | |
| Scope | Requested scopes. Default: `openid`, `profile`, `email` | `openid email profile` |
| Username parameter | Claim for the username. Default: `preferred_username` | `preferred_username` |
| Groups parameter | Claim for the groups/roles. Default: `groups` | `groups` |
| Proxy URL | Proxy for the requests to the provider | `http://proxy.company.com:3128` |
| Auth method | Token endpoint auth method (see below) | `client_secret_basic` |
| User info source | Source of the user profile (see below) | `user_info_endpoint` |
| Extra config | YAML object with more options (see below) | |

3. Click **Save**
4. To activate OIDC, add `oidc` to **Strategies** in **Settings** > **System** > **General**

:::note Settings from the environment
You can also set OIDC with the environment variables `OIDC_ISSUER`, `OIDC_CLIENT_ID` and `OIDC_CLIENT_SECRET`
(required), and `OIDC_INTERNAL_ISSUER`, `OIDC_SCOPES`, `OIDC_USERNAME_CLAIM` and `OIDC_GROUPS_CLAIM` (optional). Then the
environment owns the OIDC settings, and the settings page cannot change them. The client secret is never written to
the database. See the Anaphora Quick Start guide.
:::

### Callback URL

The **Callback URL** is where the IdP redirects users after authentication.

Default: `https://<anaphora-external-url>/auth/login-oidc/callback`

Register this URL in your IdP's allowed redirect URIs:

| Provider | Setting Location |
|----------|------------------|
| **Google** | Authorized redirect URIs |
| **Auth0** | Allowed Callback URLs |
| **Keycloak** | Client Settings → Valid Redirect URIs |
| **Okta** | Sign-in redirect URIs |
| **Azure AD** | Redirect URIs |

:::tip Keycloak
In Keycloak, go to **Clients** → your client → **Settings** → **Valid Redirect URIs** and add the callback URL.
:::

### Step 3: Configure Scopes

Set the **Scope** field to the scopes you need.

Default: `openid`, `profile`, `email`

| Scope | Data Returned |
|-------|---------------|
| `openid` | Required for OIDC |
| `email` | User email address |
| `profile` | Name, picture, etc. |
| `groups` | Group memberships (provider-specific) |

:::caution Custom Scopes
Be careful with custom scopes. Adding non-existing scopes may cause authentication errors, such as redirect loops back to the login URL after authorization.
:::

## Claim Mapping

Map OIDC claims to Anaphora user fields.

### Standard Claims

| Anaphora Field | OIDC Claim | Description |
|----------------|------------|-------------|
| Username | `preferred_username` (set in **Username parameter**) | Unique identifier |
| Email | `email` | User email |
| Display Name | `name` | Full name |

### Group Claims

Group claim names vary by provider:

| Provider | Groups Claim |
|----------|--------------|
| Google | `groups` (requires Workspace) |
| Auth0 | `https://your-app/roles` (custom) |
| Keycloak | `groups` or `realm_access.roles` |
| Okta | `groups` |
| Azure AD | `groups` |

### Custom Claim Mapping

1. Go to **Settings** > **System** > **Auth** > **OIDC**
2. Set the claim names:

```
Username parameter: preferred_username
Groups parameter: groups
```

## Group-Based Roles

Map IdP groups to Anaphora roles.

### Groups Parameter

The **Groups parameter** specifies the claim that contains group/role information. Default: `groups`.
The claim must be a list. Anaphora ignores a claim with a single string value.

:::warning Important: Add Roles to ID Token
You must configure your IdP to include roles/groups in the ID token.

**Keycloak setup:**
1. Go to **Client Scopes** → **profile**
2. Select **Mappers** → **Add mapper** → **From predefined...**
3. Add the **groups** mapping
:::

### Role Mapping

Each IdP group becomes an Anaphora role with the same name.

1. Go to **Settings** > **System** > **Permissions**
2. In a space, add a permission for the role, and set its access:

| IdP Group/Role | Access |
|----------------|--------|
| `anaphora-admins` | Admin |
| `anaphora-editors` | Read Write |
| `anaphora-viewers` | Read Only |

### Auth0 Roles Example

In Auth0, use Rules or Actions to add roles to tokens:

```javascript
// Auth0 Action
exports.onExecutePostLogin = async (event, api) => {
  const roles = event.authorization?.roles || [];
  api.idToken.setCustomClaim('roles', roles);
};
```

Then, in Anaphora:
- Set **Groups parameter** to `roles`
- In **Settings** > **System** > **Permissions**, give `admin` the Admin access and `editor` the Read Write access

## Advanced Settings

### Auth Method

The **Auth method** specifies how credentials are sent to the token endpoint.

Default: `client_secret_basic`

| Method | Description |
|--------|-------------|
| `client_secret_basic` | Client ID and secret sent in Authorization header (URL-encoded). Standard method for most providers. |
| `client_secret_post` | Client ID and secret sent in request body (not encoded). Use when your provider cannot decode encoded values (e.g., LemonLDAP). |

### User Info Source

The **User info source** specifies where Anaphora gets the user profile information.

Default: `user_info_endpoint`

| Source | Description |
|--------|-------------|
| `user_info_endpoint` | Makes an additional call to the userInfo endpoint for the most up-to-date profile data. |
| `access_token` | Extracts profile information directly from the access token. |
| `id_token` | Extracts profile information directly from the ID token. |

### Extra Configuration

The **Extra config** field accepts a YAML object with two optional sections:

| Section | Description |
|---------|-------------|
| `issuerAdditionalParameters` | Customize OIDC issuer discovery behavior |
| `clientAdditionalParameters` | Customize OIDC client configuration |

```yaml
issuerAdditionalParameters:
  metadata:
    jwks_uri: https://example.com/.well-known/jwks.json

clientAdditionalParameters:
  metadata:
    default_max_age: 0
```

See the documentation for available options:
- [Issuer parameters](https://github.com/panva/openid-client/tree/v5.x/docs#new-issuermetadata)
- [Client parameters](https://github.com/panva/openid-client/tree/v5.x/docs#client)

:::caution
Use extra configuration options with caution. Incorrect settings may break OIDC authentication.
:::

### Session Settings

| Setting | Where | Description |
|---------|-------|-------------|
| **Max age hours** | **Settings** > **System** > **Backend** | How long an Anaphora session lasts. Default: `60` |
| **Logout path** | **Settings** > **System** > **Auth** > **OIDC** | Logout from the IdP when you log out of Anaphora |

For Keycloak, also add `https://<anaphora-external-url>/auth/login` to **Valid post logout redirect URIs**.

### Discovery Settings

Anaphora reads the provider endpoints from `<Issuer>/.well-known/openid-configuration`. There are no separate fields
for them. To change an endpoint, for example `jwks_uri`, use `issuerAdditionalParameters.metadata` in **Extra config**.

## Testing

### Test OIDC Configuration

1. Log out, then click **Continue with OIDC** on the login page
2. Anaphora sends you to your IdP
3. Log in with IdP credentials
4. Make sure that the IdP sends you back to Anaphora
5. Make sure that the user gets the correct spaces

### Debug Mode

At each OIDC login, the Anaphora log shows the user profile at the `info` log level:

1. Make sure that **Log level** in **Settings** > **System** > **General** is `info`, `debug` or `trace`
2. Try to log in
3. Find the line `OIDC login from ...` in the Anaphora log
4. Make sure that the groups/roles are present

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid redirect URI | Make sure that the callback URL is the same in both systems |
| Invalid client | Verify Client ID and Secret |
| Discovery failed | Check **Issuer**, make sure that /.well-known/openid-configuration is accessible |
| Groups not received | Check **Scope**, **Groups parameter** and the IdP configuration |
| Token expired | Check clock synchronization (NTP) |

### Common Errors

**"invalid_client"**
- Client ID or Secret is incorrect
- Client Secret may have expired (regenerate)

**"redirect_uri_mismatch"**
- Callback URL in Anaphora doesn't match IdP configuration
- Check for trailing slashes, http vs https

**"invalid_scope"**
- Requested scope not allowed by IdP
- Remove unsupported scopes

## Provider-Specific Notes

### Google Workspace

To get group memberships:
1. Enable Directory API in Google Cloud Console
2. Configure domain-wide delegation
3. Add `https://www.googleapis.com/auth/admin.directory.group.readonly` scope

### Azure AD

For group claims:
1. App registration > Token configuration > Add groups claim
2. Choose "Groups assigned to the application" for large directories

### Keycloak

Groups are included by default. Configure client mappers for custom claims.

## Best Practices

- Use HTTPS for all endpoints
- Store Client Secret securely (Anaphora encrypts it)
- Request minimal scopes needed
- Map groups to roles for scalable access management
- Monitor token expiration and refresh behavior

## Next Steps

- [SAML](./saml) - Alternative: SAML 2.0 SSO
- [Spaces](../spaces) - Configure Space-based access
