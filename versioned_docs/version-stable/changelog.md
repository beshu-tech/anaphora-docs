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
- 🧐 **Enhancement** - Improvements to existing features, platform and quality work
- 🐞 **Fix** - Bug fixes

---

## [0.15.0] - 2026-09-08: Dark mode

### 🚀 New

- A dark theme, in the note of Solarized Dark and tinted to match the navy
  sidebar. Choose Light, Dark or System under Theme, at the bottom of the
  sidebar; System follows your operating system and switches with it. The
  choice is stored per browser, in a cookie, once you make it.
- Reports stay on white paper in both themes: the template page, the text
  editor and the preview show what your recipients will read.
- The login page and the Authentication panel under Settings > System follow
  the same theme and the same palette as the rest of the app.
- A demo dataset for a fresh instance: with `SEED_DEMO=1` an empty database
  fills with jobs, runs, delivery interfaces and settings on start, and
  `DEMO_USERS` adds local users next to the admin. Meant for preview
  deployments; a database that holds a job is left alone.

### 🐞 Fixes

- Saving a form could answer "Error occurred while trying to proxy" with a 500. The auth layer forwarded a non-JSON request body as an empty
  placeholder object instead of the real body, and the app rejected it. It
  now forwards non-JSON bodies unchanged.
- Delete ALL on the runs page is disabled while the list is empty; it
  answered an error before.
- The footer background one step lighter than the page now applies; it was
  written in a place the page's own styles overrode.

---

## [0.14.0] - 2026-09-05: Provider keys and equation cost

### 🚨 Security

- Testing an AI provider could send another space's API key to an address of
  your choosing. The two buttons that reach an AI provider — the connection test
  and the model list — accepted a provider identifier and an endpoint from the
  browser, read the stored key for that identifier, and sent it to that endpoint.
  Neither checked who was asking. Both now check your access to the space that
  owns the stored provider, and answer an identifier you may not read the same
  way as one that does not exist.
- Sending a test message through a delivery interface now requires admin access
  to the space. Before, any signed-in account could make the install send mail
  through a mail server, or a request to an address, that the account chose.

### 🐞 Fixes

- Reading a job no longer runs its equations. The previous release moved one of
  the two checks that do this; a second one remained, because working out
  whether a step returns a number or text meant running the equation. The
  scheduler reads every job when it starts, so one saved equation could hold the
  server for half a minute on every read of that job. Equations now run when you
  save a job, and when a run reaches the step.
- The limit on equation size now also covers the operations whose cost grows
  faster than their result — matrix multiplication, matrix powers, determinants
  and inverses. An equation whose every value was inside the size limit could
  still occupy the server for tens of seconds.

### 🧐 Quality

- Publishing a release image retries a failed upload inside a time budget that
  fits, so the third attempt can actually run.

---

## [0.13.0] - 2026-09-04: Browser-callable data access

### 🚨 Security

- The data-access modules were reachable from the browser. Every export of the
  job, run and AI provider repositories, and of the storage modules, was
  published as a callable endpoint that checked no session. A signed-in account
  could read every job of every space, including the login details a capture
  uses, and could delete the runs of another space. Every browser-callable read
  and write now checks your access to the space first.

### 🐞 Fixes

- A saved equation can no longer stop the scheduler from starting. Reading a job
  ran its equations, so one job whose equation the new limits no longer accept
  ended the process, and with it every schedule in the install. Equations are
  checked when you save a job, not when the server reads one.
- Free-edition limits now apply to installs whose activation key spells the
  edition in capitals, which is what the key issuer produces. Those installs ran
  without the free limits until now. If you hold more than two jobs or two
  delivery interfaces on a free key, the interface asks you to upgrade before
  you add another, and an existing job with more than three capture actions
  cannot be saved again until you upgrade.

### 🧐 Quality

- The equation worker and the space checks are now proven inside the container
  image that customers run, not only in unit tests. The arm64 image is started
  and checked before it is published.

---

## [0.12.0] - 2026-09-04: Access control

### 🚨 Security

- Every action on jobs, blueprints, delivery interfaces and AI providers now
  checks your access to the space it names. Before, a signed-in account could
  read, change, copy or delete content in a space it was not a member of, and
  could start a run of any job.
- The runs page and the job editor no longer send delivery interface
  credentials to the browser. Names and types are all the page needs.
- Exporting and importing the database, and changing application settings,
  now require the System role. Before, any signed-in account could download
  the full export or replace the database.
- Report file paths reject a user name or id that could point outside the
  reports folder.
- Equations in a `calculate` step run with a time and memory limit, cannot
  reach the functions that load code, and cannot allocate matrices of more
  than a million cells. An equation can no longer stall or exhaust the
  server, at run time or while a saved job is read back.
- Replaced the `query-string` package with `qs`, which clears the
  `decode-uri-component` advisory.
- `uuid` 11 and `qs` 6.16 close the two remaining runtime dependency
  alerts; a stale lockfile that carried twelve more alerts is gone. Weekly
  automated dependency updates now open pull requests instead of alerts.

### 🧐 Platform

- The runtime moves from Node 20, which reached end of life in April 2026,
  to Node 22 LTS. No configuration change on your side.
- Preview builds now carry version numbers above the last release, so
  `preview-latest` is never older than `latest`.

### 🐞 Fixes

- PDF attachment names use a 24-hour clock. Two runs twelve hours apart no
  longer share a file name.
- The equation editor now reports errors on `-`, `/`, `<`, `>`, `%`, `==`
  and `!=`; before, an equation such as `title - 2` saved without a warning
  and failed at run time.
- Typing an assignment (`hits = "x"`) into the equation editor no longer
  breaks validation of the equations you type after it.

### 🧐 Quality

- The automated test suite has grown to more than four hundred tests. They
  guard the run pipeline, report delivery, report file layout, equation
  validation, and every access check listed above. A coverage gate fails a
  build that lowers test coverage.

---

## [0.11.0] - 2026-09-03: Security and reliability

### 🚨 Security

- Cleared **every critical and high** dependency vulnerability, in the app
  and in the developer tooling. `npm audit` now reports zero high or
  critical advisories.
- Untrusted HTML in job variables can no longer run on the app origin.
  Report previews render captured content in isolation.

### 🧐 Reliability and performance

- The health endpoint answers in milliseconds. It took ~8 seconds on
  installations with a large run history.
- The hourly clean-up no longer loads the whole run history into memory.
- The database closes cleanly on container shutdown, so an unlucky restart
  can no longer corrupt state.
- Headless-browser zombie processes are reaped. Long-running containers
  stay healthy instead of slowly filling the process table.
- Deleted runs now reclaim their report files from disk, and old runs are
  removed by a default retention policy.

### 🧐 Platform

- Upgraded to Next.js 16 and React 19.
- A large new automated test suite now guards report rendering, the
  customer upgrade path, exports, health monitoring, and the
  unsubscribe/resubscribe flow on every change.

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
