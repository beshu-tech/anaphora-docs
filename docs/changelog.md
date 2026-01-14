---
sidebar_position: 8
---

# Changelog

All notable changes to Anaphora are documented here.

## Legend

- 🚨 **Security Fix** - Security vulnerability patches
- 🚀 **New Feature** - New functionality
- 🧐 **Enhancement** - Improvements to existing features
- 🐞 **Fix** - Bug fixes

---

## [Unreleased]

### 🚀 New Feature: Documentation restructure

<details>
<summary>Complete reorganization of documentation structure</summary>

The documentation has been restructured for better navigation and discoverability:
- New "Basic Examples" and "Advanced Examples" sections
- Dedicated "Jobs" section with detailed component documentation
- Expanded "Delivery Interfaces" with per-interface guides
- New "Administration" section for security and operations
- Added changelog page

</details>

---

## [1.0.0] - 2024-XX-XX

### 🚀 New Feature: Kibana dashboard capture

<details>
<summary>Automated screenshot capture from Kibana dashboards</summary>

Anaphora can now capture screenshots from Kibana dashboards, Canvas workpads, and Discover pages. Features include:
- Automatic detection of Kibana page types
- Time range configuration
- Multiple authentication methods
- Full page or viewport capture modes

</details>

### 🚀 New Feature: Grafana support

<details>
<summary>Capture and report on Grafana dashboards</summary>

Full support for Grafana dashboard capture:
- API key authentication
- Panel-level capture
- Time range parameter support
- Kiosk mode for cleaner captures

</details>

### 🚀 New Feature: Conditional alerts

<details>
<summary>Send reports only when conditions are met</summary>

Create alerts that only trigger when specific criteria match:
- Extract values from pages into variables
- Perform calculations on captured data
- Conditional execution blocks
- Break action to skip report delivery

</details>

### 🚀 New Feature: Multi-channel delivery

<details>
<summary>Deliver reports via email, Slack, or webhooks</summary>

Multiple delivery options:
- SMTP email with attachment support
- Mailgun API integration
- Slack workspace integration with rich formatting
- Webhook delivery for custom integrations

</details>

### 🚀 New Feature: Multi-tenant spaces

<details>
<summary>Isolate jobs and reports by team or project</summary>

Workspace isolation for enterprise deployments:
- Separate jobs and reports per space
- Role-based access control
- Independent retention policies
- User assignment to multiple spaces

</details>

### 🚀 New Feature: Authentication providers

<details>
<summary>Support for LDAP, SAML, and local authentication</summary>

Enterprise authentication options:
- Local username/password authentication
- LDAP/Active Directory integration
- SAML 2.0 SSO (Okta, Azure AD, OneLogin)
- Role mapping from identity providers

</details>

### 🚀 New Feature: Report templates and branding

<details>
<summary>Custom branded reports for professional delivery</summary>

Brand your reports:
- Custom logo placement
- Color scheme configuration
- Template variables for personalization
- PDF and image output formats

</details>
