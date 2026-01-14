---
sidebar_position: 6
description: Anaphora administration guide - configure authentication (LDAP, SAML, SSO), manage multi-tenant spaces, monitor system health, and backup data.
keywords: [Anaphora admin, LDAP authentication, SAML SSO, multi-tenant reporting, system monitoring, backup, RBAC]
---

# Administration - Security, Multi-Tenancy & Operations

Manage Anaphora's security, multi-tenancy, monitoring, and backups. This section covers enterprise features for managing users, permissions, and system health.

## Topics

| Topic | Description |
|-------|-------------|
| [Authentication](./administration/authentication) | User authentication and access control |
| [Spaces](./administration/spaces) | Multi-tenant workspace management |
| [Self Monitoring](./administration/self-monitoring) | System health and metrics |
| [Backup](./administration/backup) | Data backup and recovery |

## Spaces: Multi-Tenant Isolation

Anaphora uses a **Spaces** concept to manage multi-tenancy and permissions effectively.

### Shared-Nothing Architecture

Spaces act as isolated containers with complete separation:

```
┌─────────────────────────────────────────────────────────┐
│                      Anaphora                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Space A    │  │  Space B    │  │  Space C    │     │
│  │             │  │             │  │             │     │
│  │  - Jobs     │  │  - Jobs     │  │  - Jobs     │     │
│  │  - Reports  │  │  - Reports  │  │  - Reports  │     │
│  │  - Delivery │  │  - Delivery │  │  - Delivery │     │
│  │  - Users    │  │  - Users    │  │  - Users    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
```

- **Complete isolation** - Jobs, Delivery Interfaces, AI Providers, and reports cannot be shared between spaces
- **Copy support** - Items can be copied between spaces when needed
- **Independent configuration** - Each space has its own settings and retention policies

### Use Cases for Spaces

| Scenario | Implementation |
|----------|----------------|
| **Team separation** | Each team gets their own space with dedicated jobs |
| **Client isolation** | MSPs create separate spaces per client |
| **Environment separation** | Dev, staging, and production spaces |
| **Department boundaries** | Finance, Engineering, Marketing each have isolated spaces |

## Role-Based Access Control (RBAC)

Anaphora provides granular permissions through roles.

### Permission Levels

| Level | Capabilities |
|-------|-------------|
| **Read-only** | View jobs, reports, and settings |
| **Read-write** | Create and modify jobs, run reports |
| **Admin** | Full control including user management and space settings |

### Assignment Options

Permissions can be assigned to:

- **Individual users** - Direct permission grants
- **Groups** - Permissions inherited by all group members
- **Roles** - Reusable permission sets

## Authentication Methods

Anaphora supports enterprise-standard authentication:

| Method | Description |
|--------|-------------|
| **Local** | Built-in username/password authentication |
| **LDAP** | Active Directory and other LDAP directories |
| **SAML** | SSO with Okta, Azure AD, OneLogin, etc. |
| **OpenID Connect** | OAuth 2.0 based authentication |

### Session Management

Administrators can:

- View all active sessions
- Force logout of specific users
- Set session timeout policies
- Monitor login history

## System Monitoring

Monitor Anaphora's health and performance:

### Health Endpoint

A dedicated endpoint for monitoring tools (Prometheus, Nagios, etc.):

- System status and uptime
- Job execution statistics
- Error rates and failures
- Resource utilization

### Alerting

Configure alerts when:

- Job execution error rates become too high
- System resources are constrained
- Authentication failures spike
- Delivery channels fail

## Backup & Recovery

Protect your Anaphora configuration and data:

- **Full system backup** - Export all jobs, settings, and configurations
- **Scheduled backups** - Automate regular backup creation
- **Point-in-time recovery** - Restore to a specific backup
- **Migration support** - Move between Anaphora instances

## Next Steps

- [Authentication](./administration/authentication) - Configure identity providers
- [Spaces](./administration/spaces) - Set up multi-tenant workspaces
- [Self Monitoring](./administration/self-monitoring) - Monitor system health
- [Backup](./administration/backup) - Configure backup and recovery
