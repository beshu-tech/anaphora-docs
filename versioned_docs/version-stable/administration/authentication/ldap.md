---
sidebar_position: 2
description: Configure LDAP and Active Directory authentication for Anaphora enterprise deployments.
keywords: [LDAP, Active Directory, AD, directory integration, enterprise authentication]
---

# LDAP / Active Directory

Connect to your enterprise directory for centralized user management. Supports Microsoft Active Directory, OpenLDAP, and other LDAP-compliant directories.

## Overview

LDAP integration provides:

- **Centralized user management** — Users managed in corporate directory
- **Group-based roles** — Map AD groups to Anaphora roles
- **No password storage** — Passwords validated against directory
- **Automatic provisioning** — Users created on first login

## Configuration

Navigate to **Settings** > **Authentication** > **LDAP** to configure.

### Connection Settings

| Field | Description | Example |
|-------|-------------|---------|
| Server URL | LDAP server address | `ldaps://ldap.company.com:636` |
| Base DN | Search base for users | `dc=company,dc=com` |
| Bind DN | Service account for queries | `cn=anaphora,ou=service,dc=company,dc=com` |
| Bind Password | Service account password | (stored encrypted) |
| Connection Timeout | Max connection wait time | `10` seconds |
| Read Timeout | Max response wait time | `30` seconds |

### User Search Settings

| Field | Description | Example |
|-------|-------------|---------|
| User Base DN | Where to search for users | `ou=users,dc=company,dc=com` |
| User Filter | LDAP query for users | `(&(objectClass=user)(sAMAccountName={0}))` |
| Username Attribute | Attribute for login | `sAMAccountName` |

### Group Settings (Optional)

| Field | Description | Example |
|-------|-------------|---------|
| Group Base DN | Where to search for groups | `ou=groups,dc=company,dc=com` |
| Group Filter | Query for user's groups | `(&(objectClass=group)(member={0}))` |
| Group Name Attribute | Attribute for group name | `cn` |

## Attribute Mapping

Map LDAP attributes to Anaphora user properties:

| Anaphora Field | Active Directory | OpenLDAP |
|----------------|------------------|----------|
| Username | `sAMAccountName` | `uid` |
| Email | `mail` | `mail` |
| Display Name | `displayName` | `cn` |
| Groups | `memberOf` | `memberOf` |

### Mapping Configuration

```
Username Attribute: sAMAccountName
Email Attribute: mail
Display Name Attribute: displayName
Group Membership Attribute: memberOf
```

## Group-Based Roles

Map LDAP groups to Anaphora roles for automatic permission assignment.

### Example Mappings

```
LDAP Group: CN=Anaphora-Admins,OU=Groups,DC=company,DC=com
  → Anaphora Role: Admin

LDAP Group: CN=Anaphora-Editors,OU=Groups,DC=company,DC=com
  → Anaphora Role: Editor

LDAP Group: CN=Anaphora-Viewers,OU=Groups,DC=company,DC=com
  → Anaphora Role: Viewer
```

### Space Membership

Map groups to Space access:

```
LDAP Group: CN=Team-Alpha,OU=Teams,DC=company,DC=com
  → Space: Alpha Team Reports
  → Role: Editor

LDAP Group: CN=Team-Beta,OU=Teams,DC=company,DC=com
  → Space: Beta Team Reports
  → Role: Viewer
```

## Active Directory Specifics

### Service Account

Create a dedicated service account for Anaphora:

1. Create user in AD: `anaphora-svc`
2. Set password to never expire (or manage rotation)
3. Grant "Read all user information" permission
4. No need for admin privileges

### Common User Filters

| Scenario | Filter |
|----------|--------|
| All users | `(&(objectClass=user)(sAMAccountName={0}))` |
| Enabled users only | `(&(objectClass=user)(sAMAccountName={0})(!(userAccountControl:1.2.840.113556.1.4.803:=2)))` |
| Specific OU | `(&(objectClass=user)(sAMAccountName={0})(memberOf=CN=Anaphora-Users,OU=Groups,DC=company,DC=com))` |

### SSL/TLS Configuration

Always use LDAPS (port 636) for secure connections:

| Protocol | Port | Security |
|----------|------|----------|
| LDAP | 389 | Unencrypted (not recommended) |
| LDAPS | 636 | SSL/TLS encrypted |
| StartTLS | 389 | Upgraded to TLS |

## Testing

### Test Connection

1. Click **Test Connection** to verify server connectivity
2. Verify "Connection successful" message
3. Check bind credentials are working

### Test User Search

1. Enter a known username
2. Click **Test User Search**
3. Verify user attributes are returned correctly

### Test Authentication

1. Enter test username and password
2. Click **Test Login**
3. Verify authentication succeeds and groups are retrieved

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection refused | Check server URL and port, verify firewall rules |
| Bind failed | Verify bind DN and password, check account is not locked |
| User not found | Check base DN and user filter, verify user exists |
| Groups not mapped | Verify group filter and group DN, check membership attribute |
| SSL certificate error | Import CA certificate or use trusted certificate |

### Debug Mode

Enable LDAP debug logging:

1. Go to **Settings** > **System** > **Logging**
2. Set LDAP log level to DEBUG
3. Reproduce the issue
4. Review logs for detailed LDAP communication

## Best Practices

- Use dedicated service account with minimal permissions
- Always use LDAPS for encrypted connections
- Test configuration changes in staging first
- Map groups to roles rather than individual user assignments
- Monitor service account for lockouts or password expiration

## Next Steps

- [SAML](./saml) - Add SAML SSO alongside LDAP
- [Spaces](../spaces) - Configure Space-based access control
