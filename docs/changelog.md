---
sidebar_position: 8
description: Anaphora release notes and changelog. New features, enhancements, bug fixes, and security updates for Kibana/Grafana report automation.
keywords: [ Anaphora changelog, release notes, new features, updates, version history ]
---

# Changelog - Anaphora Release Notes

All notable changes to Anaphora are documented here.

## Legend

- 🚨 **Security Fix** - Security vulnerability patches
- 🚀 **New Feature** - New functionality
- 🧐 **Enhancement** - Improvements to existing features
- 🐞 **Fix** - Bug fixes

---

## [0.10.0] - 2026-03-04

### 🚀 Enhancement: Create Delivery Interfaces Directly from Job Configuration

<details>  
<summary>Enables creating delivery interfaces inside job configuration without navigation</summary>

When setting up a job's delivery configuration, you can now create new delivery interfaces directly within the job
configuration flow. This eliminates the need to navigate to the separate Delivery Interfaces page, streamlining
the setup process.

</details>  

### 🚀 Feature: License Expiration Warning

<details>  
<summary>Display warning when license is close to expiration and send notification</summary>  

When the Anaphora license is nearing its expiration date, a warning message is now displayed in the Anaphora Web UI.

If health alerts are configured, a notification will also be sent to the defined channel. This enables administrators to
renew the license in time and prevent any potential service interruption.

</details>  

### 🐞 Fix: Kibana Discover Hits Variable Could Not Be Used in Reports

<details>  
<summary>Fixed issue where Kibana Discover hits variable was not available in report composition</summary>  

The Kibana Discover hits variable, which returns the number of results from a Discover query, was not available during
report composition. This issue has been resolved, and the variable can now be used to dynamically include hit counts
within reports.

</details>  

### 🚨 Security Fix: Removal of YAML Import/Export for System Settings

<details>  
<summary>Removed YAML import/export of system settings to prevent corrupted data</summary>  

The YAML import/export functionality for system settings has been removed. This capability is no longer required due to
the new Import/Export feature available under `/settings/data`.

The updated approach supports exporting and importing all relevant data at once (including settings, jobs, delivery
interfaces, and more). It also properly handles version changes, preventing data corruption and ensuring that exports
created in older versions remain compatible with newer versions of Anaphora.

</details>

### 🧐 Enhancement: Storage Optimization

<details>
<summary>Optimized database to reduce storage usage</summary>

We implemented storage optimizations in the Anaphora database, resulting in reduced disk usage for large datasets.

- Deletions will now free up space more effectively
- Removement of unnecessary internal data will immediately reduce storage usage

</details>

### 🧐 Enhancement: Performance Improvements

<details>
<summary>Optimized loading and saving times for Anaphora instances with large numbers of runs</summary>

We improved the Anaphora database to handle large datasets more efficiently. This results in faster loading and saving
times.

</details>

---

## [0.9.0] - 2026-01-15

### 🚀 New Feature: Grafana Connector

<details>
<summary>Capture and report on Grafana dashboards</summary>

With the new Grafana connector, Anaphora supports an out-of-the-box experience for capturing Grafana dashboards.
Features include:

- Configurable authentication using the Grafana credentials
- Capture entire dashboards with automatic waiting for panels to load
- Capture individual panels for granular reporting

</details>
