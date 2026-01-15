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
| [Local](/administration/authentication/local) | Built-in username/password | Small teams, testing |
| [LDAP](/administration/authentication/ldap) | Active Directory integration | Enterprise Windows environments |
| [SAML](/administration/authentication/saml) | Single Sign-On via SAML 2.0 | Okta, Azure AD, OneLogin |
| [OIDC](/administration/authentication/oidc) | OpenID Connect providers | Google, Auth0, Keycloak |

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

- [Local Authentication](/administration/authentication/local) - Built-in user management
- [LDAP](/administration/authentication/ldap) - Active Directory integration
- [SAML](/administration/authentication/saml) - Single Sign-On configuration
- [OIDC](/administration/authentication/oidc) - OpenID Connect setup
- [Spaces](/administration/spaces) - Configure multi-tenant workspaces
