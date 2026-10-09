---
sidebar_position: 1
description: Configure Anaphora authentication - local users, LDAP, SAML SSO, OpenID Connect, and session management.
keywords: [ authentication, LDAP, SAML, SSO, OpenID Connect, OIDC, session management, RBAC ]
---

# Authentication

This section describes how to configure user authentication and access control for Anaphora. Anaphora supports the
authentication methods below.

## Authentication methods

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

## Roles and permissions

Anaphora uses role-based access control (RBAC).

### User types

Anaphora has two main user types: system users and normal users. System users have global access and manage the
Anaphora instance. Normal users get access to specific spaces, with permissions for those spaces only.

| User type       | Description                                | Methods |
|-----------------|--------------------------------------------|---------|
| **System user** | Full global access, manage system settings | Local, and LDAP, SAML and OIDC through [system groups](#system-groups) |
| **Normal user** | Access and manage resources within spaces  | All     |

### Space permissions

Each user gets permissions in specific spaces:

| Permission     | Description                        |
|----------------|------------------------------------|
| **Admin**      | Full access within assigned spaces |
| **Read Write** | Create and edit jobs, run reports  |
| **Read Only**  | View reports and job status only   |

### Permission details

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

### Add user permissions

Assign users and roles to spaces in **Settings** > **System** > **Permissions**. See the
[Spaces](/administration/spaces) documentation for details.

## System groups

A local user has the system role when its **System role** is `system`. An LDAP, SAML or OIDC user has the system role
when one of its roles is in the **System groups** of that method. Set **System groups** on the page of the method:
**Settings** > **System** > **Auth** > **LDAP**, **SAML** or **OIDC**. For OIDC from the environment, use
`OIDC_SYSTEM_GROUPS` (see
[OIDC](./oidc.md#system-role-from-the-environment)).

- The names are the roles that the method reads: the **Groups parameter** for SAML and OIDC, the
  **Group name property** for LDAP. They match whole and with case, never as a pattern, in the same way as space
  permissions match them.
- Use names that are unique at the identity provider. For LDAP, use the group DN (**Group name property** `dn`): a
  directory can hold a second `CN=Domain Admins` in another OU, and anyone who can make a group there gets the role.
  For Keycloak, use a realm role or the full group path, because Keycloak sends `admins` for `/a/admins` and
  `/b/admins` alike unless its group mapper sends the full path.
- Each method has its own list. A group with the same name at another identity provider gives nothing. A method that
  is not in **Strategies** gives nothing.
- A change of **System groups** applies at the next request of each session, with no new login. The roles come from
  the login: a user that you remove from a group at the identity provider keeps the role until the session ends.
- When **System groups** is empty (the default), no user of the method gets the system role.
- `/auth/userinfo` shows the `roles` and the `system_role` of the user that is logged in.

:::warning Keep a local system user
Keep at least one local user with the `system` role. It is the way in when the identity provider is down or the list
is wrong. Without one, the page that makes the first administrator opens again while single sign-on is off.
:::

## Next steps

- [Local Authentication](/administration/authentication/local): built-in user management
- [LDAP](/administration/authentication/ldap): Active Directory integration
- [SAML](/administration/authentication/saml): Single Sign-On configuration
- [OIDC](/administration/authentication/oidc): OpenID Connect setup
- [Spaces](/administration/spaces): configure multi-tenant workspaces
