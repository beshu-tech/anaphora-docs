---
sidebar_position: 1
description: Configure local authentication with Anaphora's built-in user database for username and password login.
keywords: [local authentication, user management, password policy, built-in users]
---

# Local Authentication
![](images/local.png)
Default authentication using Anaphora's built-in user database. Ideal for small teams, testing environments, or deployments without enterprise identity providers.

## Overview

Local authentication provides:

- **Built-in user database** — No external dependencies
- **Password policies** — Configurable security requirements
- **User management UI** — Easy administration
- **Quick setup** — Works out of the box

## User Management

### Adding Users

1. Navigate to **Settings** > **Users**
2. Click **Add User**
3. Enter username, email, and password
4. Assign roles and Space memberships
5. Save

### User Properties

| Field | Description | Required |
|-------|-------------|----------|
| Username | Unique login identifier | Yes |
| Email | User email address | Yes |
| Display Name | Friendly name shown in UI | No |
| Password | Initial password | Yes |
| Roles | Assigned permissions | Yes |
| Spaces | Space memberships | No |

### Editing Users

1. Go to **Settings** > **Users**
2. Click on the user to edit
3. Update properties as needed
4. Save changes

### Removing Users

1. Go to **Settings** > **Users**
2. Select the user to remove
3. Click **Delete**
4. Confirm deletion

:::warning
Deleting a user removes their access immediately. Jobs created by the user will remain.
:::

## Password Policy

Configure password requirements for local users:

| Setting | Description | Recommended |
|---------|-------------|-------------|
| Minimum length | Required character count | 12+ characters |
| Complexity | Uppercase, lowercase, numbers, symbols | Enable all |
| Expiration | Force password change after X days | 90 days |
| History | Prevent reuse of recent passwords | Last 5 passwords |

### Configuring Password Policy

1. Go to **Settings** > **Security**
2. Navigate to **Password Policy**
3. Set requirements
4. Save

### Password Change

Users can change their own password:

1. Click user menu (top right)
2. Select **Change Password**
3. Enter current and new password
4. Confirm

Administrators can reset passwords:

1. Go to **Settings** > **Users**
2. Select the user
3. Click **Reset Password**
4. Send reset link or set temporary password

## When to Use Local Auth

| Scenario | Recommendation |
|----------|----------------|
| Small team (under 10 users) | Local auth is sufficient |
| Testing/development | Local auth for simplicity |
| No corporate IdP available | Local auth as primary method |
| Enterprise environment | Consider LDAP, SAML, or OIDC |
| Compliance requirements | Use enterprise SSO |

## Best Practices

- Use strong, unique passwords
- Enable password complexity requirements
- Set reasonable expiration periods
- Review user list regularly
- Remove inactive accounts promptly

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Forgot password | Admin can reset via Settings > Users |
| Account locked | Admin unlocks via Settings > Users |
| Login fails | Verify username and password case sensitivity |

## Next Steps

- [LDAP](./ldap) - Connect to Active Directory
- [SAML](./saml) - Enable Single Sign-On
- [OIDC](./oidc) - Use OpenID Connect providers
