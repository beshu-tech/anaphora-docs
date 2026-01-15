---
sidebar_position: 1
description: Configure Anaphora authentication - local users, LDAP, SAML SSO, OpenID Connect, and session management.
keywords: [authentication, LDAP, SAML, SSO, OpenID Connect, OIDC, session management, RBAC]
---

# Authentication

Configure user authentication and access control for Anaphora. The platform supports enterprise-standard authentication methods for secure access.

## Authentication Methods

| Method | Description | Best For |
|--------|-------------|----------|
| **Local** | Built-in username/password | Small teams, testing |
| **LDAP** | Active Directory integration | Enterprise Windows environments |
| **SAML** | Single Sign-On via SAML 2.0 | Okta, Azure AD, OneLogin |
| **OIDC** | OpenID Connect providers | Google, Auth0, Keycloak |

## Local Authentication

Default authentication using Anaphora's built-in user database.

### User Management

1. Navigate to **Settings** > **Users**
2. Add, edit, or remove users
3. Assign roles and Space memberships

### Password Policy

Configure password requirements:

| Setting | Description |
|---------|-------------|
| Minimum length | Required character count |
| Complexity | Uppercase, lowercase, numbers, symbols |
| Expiration | Force password change after X days |
| History | Prevent reuse of recent passwords |

## LDAP / Active Directory

Connect to your enterprise directory for centralized user management.

### Configuration

| Field | Description | Example |
|-------|-------------|---------|
| Server URL | LDAP server address | `ldaps://ldap.company.com:636` |
| Base DN | Search base for users | `dc=company,dc=com` |
| Bind DN | Service account for queries | `cn=anaphora,ou=service,dc=company,dc=com` |
| Bind Password | Service account password | (stored encrypted) |
| User Filter | LDAP query for users | `(&(objectClass=user)(sAMAccountName={0}))` |
| Group Filter | Optional group membership | `(&(objectClass=group)(member={0}))` |

### Attribute Mapping

Map LDAP attributes to Anaphora user properties:

| Anaphora Field | Common LDAP Attribute |
|----------------|----------------------|
| Username | `sAMAccountName` or `uid` |
| Email | `mail` |
| Display Name | `displayName` or `cn` |
| Groups | `memberOf` |

### Group-Based Roles

Map LDAP groups to Anaphora roles:

```
LDAP Group: CN=Anaphora-Admins,OU=Groups,DC=company,DC=com
  → Anaphora Role: Admin

LDAP Group: CN=Anaphora-Users,OU=Groups,DC=company,DC=com
  → Anaphora Role: Editor
```

## SAML / SSO

Integrate with SAML 2.0 identity providers for single sign-on.

### Supported Providers

- **Okta** — Enterprise identity management
- **Azure AD** — Microsoft cloud identity
- **OneLogin** — Cloud-based SSO
- **Google Workspace** — G Suite authentication
- **Custom SAML IdP** — Any SAML 2.0 compliant provider

### Configuration Steps

1. **Download SP Metadata**
   - Go to **Settings** > **Authentication** > **SAML**
   - Download Anaphora's Service Provider metadata XML

2. **Configure Identity Provider**
   - Create a new SAML application in your IdP
   - Upload Anaphora's SP metadata
   - Configure assertion attributes

3. **Enter IdP Metadata**
   - Enter your IdP's metadata URL in Anaphora
   - Or upload IdP metadata XML file

4. **Map Attributes**
   - Map IdP claims to Anaphora fields (username, email, groups)
   - Configure role mapping from IdP groups

### SAML Attribute Mapping

| Required Claim | Description |
|----------------|-------------|
| NameID | Unique user identifier |
| email | User email address |
| groups (optional) | Group memberships for role mapping |

## OpenID Connect (OIDC)

Integrate with OAuth 2.0 / OpenID Connect providers.

### Configuration

| Field | Description |
|-------|-------------|
| Client ID | OAuth client identifier |
| Client Secret | OAuth client secret |
| Issuer URL | OIDC discovery endpoint |
| Scopes | Requested OAuth scopes |

### Common Providers

| Provider | Issuer URL |
|----------|------------|
| Google | `https://accounts.google.com` |
| Auth0 | `https://your-tenant.auth0.com` |
| Keycloak | `https://keycloak.company.com/realms/your-realm` |
| Okta | `https://your-org.okta.com` |

## Roles and Permissions

Anaphora uses role-based access control (RBAC).

### Built-in Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: users, settings, all Spaces |
| **Editor** | Create and edit jobs, run reports |
| **Viewer** | View reports and job status only |

### Permission Details

| Permission | Admin | Editor | Viewer |
|------------|-------|--------|--------|
| View reports | Yes | Yes | Yes |
| Create jobs | Yes | Yes | No |
| Edit jobs | Yes | Yes | No |
| Delete jobs | Yes | No | No |
| Manage delivery interfaces | Yes | Yes | No |
| Manage users | Yes | No | No |
| Manage Spaces | Yes | No | No |
| System settings | Yes | No | No |

### Custom Roles

Create custom roles with specific permissions:

1. Go to **Settings** > **Roles**
2. Click **Create Role**
3. Select permissions to include
4. Save and assign to users

## Session Management

Administrators have visibility and control over user sessions.

### Active Sessions

View all active user sessions:

| Information | Description |
|-------------|-------------|
| User | Logged-in user |
| IP Address | Client IP |
| Login Time | When session started |
| Last Activity | Most recent action |
| Device/Browser | Client information |

### Session Controls

| Action | Description |
|--------|-------------|
| **View sessions** | See all active sessions |
| **Force logout** | Terminate specific session |
| **Logout all** | Terminate all sessions for a user |

### Session Policies

Configure session behavior:

| Setting | Description |
|---------|-------------|
| Session timeout | Auto-logout after inactivity |
| Maximum sessions | Limit concurrent sessions per user |
| Remember me duration | Extended session lifetime |

### Security Events

Audit log captures authentication events:

- Login success/failure
- Logout events
- Password changes
- Session terminations
- Permission changes

## Best Practices

### Security

- Use SSO when available for centralized access control
- Require strong passwords for local accounts
- Review active sessions regularly
- Set appropriate session timeouts

### Enterprise Integration

- Use dedicated service accounts for LDAP binding
- Map groups to roles for automated permission management
- Test authentication changes in staging first

## Next Steps

- [Spaces](./spaces) - Configure multi-tenant workspaces
- [Self Monitoring](./self-monitoring) - Monitor system health
