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

## [Unreleased]

### 🧐 Enhancement: Performance Improvements

<details>
<summary>Optimized loading and saving times for Anaphora instances with large numbers of runs</summary>

We improved the Anaphora database to handle large datasets more efficiently. This results in faster loading and saving times.

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
