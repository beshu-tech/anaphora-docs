---
sidebar_position: 1
---

# Authentication

Configure user authentication and access control for Anaphora.

## Authentication Methods

| Method | Description |
|--------|-------------|
| Local | Built-in username/password |
| LDAP | Enterprise directory integration |
| SAML | Single Sign-On via SAML 2.0 |
| OIDC | OpenID Connect providers |

## Local Authentication

Default authentication using Anaphora's built-in user database.

### User Management

1. Navigate to **Settings** > **Users**
2. Add, edit, or remove users
3. Assign roles and permissions

### Password Policy

Configure password requirements:
- Minimum length
- Complexity requirements
- Expiration policy

## LDAP Integration

Connect to your enterprise directory:

| Field | Description |
|-------|-------------|
| Server URL | LDAP server address |
| Base DN | Search base |
| Bind DN | Service account DN |
| User Filter | LDAP search filter |

## SAML / SSO

Integrate with identity providers:
- Okta
- Azure AD
- OneLogin
- Custom SAML providers

### Configuration

1. Download Anaphora's SP metadata
2. Configure your IdP with the metadata
3. Enter IdP metadata URL in Anaphora
4. Map user attributes

## Roles and Permissions

| Role | Permissions |
|------|-------------|
| Admin | Full access |
| Editor | Create and edit jobs |
| Viewer | View reports only |

## Next Steps

- [Spaces](./spaces) - Configure multi-tenancy
