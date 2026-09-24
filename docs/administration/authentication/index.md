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

:::note
LDAP, SAML and OIDC need the Enterprise edition. The Free and Pro editions use Local authentication only. In the Free
edition, all local users are system users.
:::

## Roles and Permissions

Anaphora uses role-based access control (RBAC).

### User types

Anaphora has two main user types: system users and normal users. System users have global access and manage the
Anaphora instance. Normal users get access to specific spaces, with permissions for those spaces only.

| User Type       | Description                                | Methods |
|-----------------|--------------------------------------------|---------|
| **System user** | Full global access, manage system settings | Local   |
| **Normal user** | Access and manage resources within spaces  | All     |

### Space Permissions

Users are assigned permissions within specific spaces:

| Permission     | Description                        |
|----------------|------------------------------------|
| **Admin**      | Full access within assigned spaces |
| **Read Write** | Create and edit jobs, run reports  |
| **Read Only**  | View reports and job status only   |

### Permission Details

| Rights                     | System User | Space Admin | Space Read Write | Space Read Only |
|----------------------------|-------------|-------------|-----------------|----------------|
| View reports               | Yes         | Yes         | Yes             | Yes            |
| View runs                  | Yes         | Yes         | Yes             | Yes            |
| Manage jobs                | Yes         | Yes         | Yes             | No             |
| Manage delivery interfaces | Yes         | Yes         | No              | No             |
| Manage AI providers        | Yes         | Yes         | No              | No             |
| Manage users               | Yes         | No          | No              | No             |
| Manage spaces              | Yes         | No          | No              | No             |
| Global settings            | Yes         | No          | No              | No             |
| Export and import data     | Yes         | No          | No              | No             |
| Read authentication config | Yes         | No          | No              | No             |
| List and end sessions      | Yes         | No          | No              | No             |
| Read capture passwords     | Yes         | Yes         | Yes             | No             |

Every action on jobs, templates, delivery interfaces and AI providers checks your access to the space that holds them.

- Only a system user can read the authentication configuration (it holds the session secret and the LDAP, SAML and
  OIDC credentials), list and end sessions, and use the password and secret tools of the settings.
- A user with Readonly access sees the jobs and templates without the login passwords of their captures.

:::note Free edition
In the Free edition, every account has the System role.
:::

### Add User Permissions

Assign users and roles to spaces in **Settings** > **System** > **Permissions**. See the
[Spaces](/administration/spaces) documentation for details.

## Next Steps

- [Local Authentication](/administration/authentication/local) - Built-in user management
- [LDAP](/administration/authentication/ldap) - Active Directory integration
- [SAML](/administration/authentication/saml) - Single Sign-On configuration
- [OIDC](/administration/authentication/oidc) - OpenID Connect setup
- [Spaces](/administration/spaces) - Configure multi-tenant workspaces
