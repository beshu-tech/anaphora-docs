---
sidebar_position: 1
description: Configure Anaphora authentication - local users, LDAP, SAML SSO, OpenID Connect, and session management.
keywords: [ authentication, LDAP, SAML, SSO, OpenID Connect, OIDC, session management, RBAC ]
---

# Authentication

Configure user authentication and access control for Anaphora. The platform supports enterprise-standard authentication
methods for secure access.

## Authentication Methods

| Method                                        | Description                  | Best For                        |
|-----------------------------------------------|------------------------------|---------------------------------|
| [Local](/administration/authentication/local) | Built-in username/password   | Small teams, testing            |
| [LDAP](/administration/authentication/ldap)   | Active Directory integration | Enterprise Windows environments |
| [SAML](/administration/authentication/saml)   | Single Sign-On via SAML 2.0  | Okta, Azure AD, OneLogin        |
| [OIDC](/administration/authentication/oidc)   | OpenID Connect providers     | Google, Auth0, Keycloak         |

## Roles and Permissions

Anaphora uses role-based access control (RBAC).

### User types

Anaphora has two main user types: System users and normal users. System users will have global access and can manage the
Anaphora instance. While normal users will be assigned to specific spaces with permissions scoped to those spaces.

| User Type       | Description                                | Methods |
|-----------------|--------------------------------------------|---------|
| **System user** | Full global access, manage system settings | Local   |
| **Normal user** | Access and manage resources within spaces  | All     |

### Space Permissions

Users are assigned permissions within specific spaces:

| Permission    | Description                        |
|---------------|------------------------------------|
| **Admin**     | Full access within assigned spaces |
| **ReadWrite** | Create and edit jobs, run reports  |
| **Readonly**  | View reports and job status only   |

### Permission Details

| Rights                     | System User | Space Admin | Space ReadWrite | Space Readonly |
|----------------------------|-------------|-------------|-----------------|----------------|
| View reports               | Yes         | Yes         | Yes             | Yes            |
| View runs                  | Yes         | Yes         | Yes             | Yes            |
| Manage jobs                | Yes         | Yes         | Yes             | No             |
| Manage delivery interfaces | Yes         | Yes         | No              | No             |
| Manage AI providers        | Yes         | Yes         | No              | No             |
| Manage users               | Yes         | No          | No              | No             |
| Manage spaces              | Yes         | No          | No              | No             |
| Global settings            | Yes         | No          | No              | No             |

### Add User Permissions

See the [Spaces](/administration/spaces) documentation for details on assigning users to spaces with specific
permissions.

## Next Steps

- [Local Authentication](/administration/authentication/local) - Built-in user management
- [LDAP](/administration/authentication/ldap) - Active Directory integration
- [SAML](/administration/authentication/saml) - Single Sign-On configuration
- [OIDC](/administration/authentication/oidc) - OpenID Connect setup
- [Spaces](/administration/spaces) - Configure multi-tenant workspaces
