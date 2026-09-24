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

## Next release (unreleased): An API for agents, OIDC, and private report links

This release carries four database migrations (`AddReportTokenToRuns`,
`AddAiUsageAndBudgets`, `HealEmptyReportTemplates`, `LinkOrphanedRetryRuns`).
The previous version refuses to start on the upgraded database, so a rollback
needs the database from before. Anaphora now keeps that copy itself: before it
applies a migration it writes one to `storage/backups/`. To upgrade, use the
upgrade script that comes in the new image. It tries the new version on a copy
of your database first, and it can roll back. See [Upgrading Anaphora](./getting-started/upgrading.md).

What you see after the upgrade:

- Every user is signed out once and logs in again.
- The log may say that some local users "still carry the legacy sha512
  password hash". Their passwords still work. Re-save them under Settings to
  store the new kind.
- Jobs set to keep their runs forever still keep them. To free disk space,
  set a retention on the job. The hourly clean-up then removes the older runs
  and their report files.
- An upgrade from a version older than 0.9.5 gives a job that never had a
  retention setting six months. On every install, a job made from a default
  template now gets six months too.
- The hourly clean-up also removes report folders that no run owns any more,
  for example those that "Delete ALL" left in older versions. It removes only
  folders older than one day, and it removes none while the database holds no
  run.

`HealEmptyReportTemplates` rewrites stored report templates in place and
cannot be reversed. It does two things, both described under Fixes: it gives a
template with no page one default page, and it trims a row that holds more
cells than its column count says. Two behaviour changes come with it — a job
or template write that carries no page is now refused, and a legacy JSON
import that carries one is refused in "safe" mode; pick "autofix" to have it
repaired on the way in.

### 🚀 New

- **A safe upgrade, in the open.** The image carries an upgrade script.
  `check` starts the new version on a copy of your database, with no network
  and with deliveries off, and tells you in plain words what it found: the
  database changes it applies, the jobs it reads, and any job it cannot read.
  `apply` shows its plan and asks before it stops Anaphora. It backs up the
  database, switches the version and checks that it answers. If the new
  version does not start, it puts the backup back. `rollback` restores a
  backup. Each docker command is printed before it runs, `--dry-run` runs
  none, and the whole session goes to a log file.
- **Anaphora backs up its database before an upgrade changes it.** The copy
  goes to the `backups` folder next to the database, encrypted with the same
  key. The log names it and says how to restore it. The three newest are kept. If the copy cannot be
  written, no migration runs and the database stays as it was.
- AI actions send the whole context correctly. Four defects are fixed. The
  first two change what a dashboard job sends, and so what it costs: read
  this before you upgrade if you use AI actions on dashboards.

  - **Tiles that share a title are no longer merged.** A dashboard tile is
    identified by the platform's own id, or, when it has none, by a hash of
    its title — so two panels both called "Error rate" got the same id. On a
    12-tile page, 12 tiles were captured and 8 reached the model; the other
    four were silently swallowed, and a template that pointed at one of them
    was pointing at an ambiguous thing. Every tile now gets its own id. The
    first tile to claim an id keeps it, so references that resolve today keep
    resolving.
  - **A dashboard unticked in an AI action's context table is left out.** The tick box stores the id of the capture action,
    while each tile carries its own; nothing matched, so unticking a dashboard
    removed nothing and all of it was sent anyway. A single snapshot always
    worked.
  - **Accessibility trees are no longer encoded twice.** Every quote and line
    break in them was escaped a second time on the way out: 11% of those
    characters on the dashboard above were escaping the model had to read and
    you had to pay for.
  - **Chrome's internal bookkeeping is no longer sent.** Every node of an
    accessibility tree carried a `loaderId` (a per-navigation nonce) and a
    `backendNodeId` (an internal handle). On the dashboard above that was 288
    copies of a 32-character nonce: 40% of the accessibility payload, about
    3,400 tokens on a single call, meaning nothing to the model.

  Net effect on that 12-tile dashboard: the request is 45% smaller than
  before while carrying twelve tiles instead of eight. A job that sends one
  snapshot shrinks slightly. Nothing you configured changed.

- AI actions can now say what they need. An action sent every earlier snapshot
  and variable, with an opt-out list; a dashboard job therefore sent twelve
  accessibility trees to answer a question about one of them. The "Context"
  section of an AI action now has two modes. "Everything so far" is what every
  action did, and still does until you switch it: every earlier row is sent
  unless you untick it, and so is anything you add to the job later. "Only
  ticked rows" sends the rows you tick and nothing else, so a row you add
  later stays out until you tick it. Switching modes moves no tick. Under the
  table, "Send the snapshots as images" sends the ticked snapshots as pictures
  to a provider whose vendor reads them (OpenAI does, DeepSeek does not, and
  the box says which), and "Answer length cap" limits the reply in tokens.
  Both are off unless you turn them on.

- AI token budgets. Every AI provider now shows what it spent in the last 24
  hours and in the last 7 days, and you can give each window a budget in
  thousands of tokens. When a budget is reached, the job that made the call is
  paused and every further AI call on that provider is refused until the window
  rolls over or you raise the budget. The two columns turn green, yellow and red
  as the budget fills, and a paused job says on the jobs list that a budget
  paused it, so you can tell it apart from one you switched off yourself. One
  button on the provider list switches the jobs that budget paused back on, and
  only those. Optionally the operator is notified over the channel that already
  carries the health alerts, when a budget is reached and, if you want it,
  earlier at a percentage you choose. Usage counts every call: scheduled runs,
  manual runs, tests, previews and the Test button on the provider form.

- The Jobs, Templates, Delivery Interfaces and AI Providers lists share one
  action bar: the create button, a search box, a Filter menu with one
  checkbox group per column and a Clear button, with the bulk actions in the
  same place once rows are selected. The funnel and magnifier icons in the
  column headers, the per-column search popovers and the trailing Clear
  column are gone. The lists paginate with a page-size chooser and a
  "1-10 of 42" total, long names and URLs are cut with a tooltip that holds
  the full text, and a search or filter change goes back to the first page.
- Anaphora explains itself to an AI agent that works in your browser (Claude
  in Chrome and the like). Every page links to `/llms.txt`, a guide to what
  a job is, how a capture is built, how a report is templated and delivered,
  and how to do all of it through a JSON API instead of the editor. The API
  lives under `/api/spaces/{space}/…` (jobs, blueprints, delivery interfaces,
  AI providers, runs), with `/api/agent/context` for "who am I and what may I
  do" and `/llms/openapi.json` for the description. It uses your signed-in
  session and the same access and edition checks as the pages.
- Sign-in through OpenID Connect can be set from the environment:
  `OIDC_ISSUER`, `OIDC_CLIENT_ID` and `OIDC_CLIENT_SECRET` switch it on, and
  `OIDC_INTERNAL_ISSUER` names an issuer address that is reachable from
  inside your deployment when the public one is not. The client secret stays
  in memory and is never written to the database. Enterprise only.
- An AI provider can be set from the environment too: `AI_PROVIDER`,
  `AI_MODEL` and `AI_API_KEY`, plus `AI_ENDPOINT` for an OpenAI-compatible
  service and `AI_NAME` for the name you see. The provider follows the
  environment on every start.
- The dark theme sits on one hue: form fields, cards and the footer are
  steps of the sidebar's navy, the active menu item is a tint of the primary
  colour, and errors are a soft coral instead of a hard red.

### 🚨 Security

- **Only a system user sees the settings' secrets.** Any signed-in account
  could read the whole authentication configuration through the settings
  interface, with every secret in clear: the session signing secret, and the
  OIDC, LDAP and SAML credentials. With the session secret and the session of
  a system user, that account could sign in as that user. Now only a system
  user gets the configuration, including a past version of it, and only a
  system user can list and end sessions or use the password and secret tools
  of the settings. Change the session secret and the identity-provider
  secrets after you upgrade if accounts you do not trust can sign in.
- **A stored activation key is no longer lost by chance.** When the stored
  activation key did not open with the current session secret (for example
  after the secret changed in the settings), it stays in place, as intended.
  Before, about one start in 300 read it as invalid and deleted it.
- **A report template can no longer read files of the server.** The template
  language kept its `{% include %}`, `{% render %}` and `{% layout %}` tags,
  which read a file from the application directory. A member with write access
  to one space could put `{% include ".env" %}` in a text block and read the
  file in the report. The tags are gone. A template that uses one is refused
  as a syntax error: by the editors, by every job and template write, by the
  JSON API and by imports. No template in Anaphora needs them.
- **A template or an equation can no longer stall or crash the server.** A
  report template and a `calculate` equation are written by a member of one
  space and run in the one process that serves every space. A template ran
  with no hard limit: one filter over a huge list held the process for more
  than a minute. An equation ran in a worker with a memory cap, but one large
  allocation, such as `zeros(6000, 6000)`, made the whole server abort instead
  of stopping the worker. Both now run in a separate process with its own
  memory (256 MB) and a wall clock: 10 seconds for all the text blocks of a
  report, 5 seconds for an equation. When the limit is reached, only that
  process stops: the block shows why, and the equation fails its action. The
  job editor renders its blocks and its preview in a Web Worker, one at a time,
  each with a 6-second clock, so a slow template no longer freezes the browser
  tab. A template also has at most 5 000 Liquid tags (each line of a
  `{% liquid %}` tag counts as one), a render returns at most 20 million
  characters, and so do all the text blocks of a report together. The
  separate process may read only its libraries and may not start a program:
  it cannot read the server's configuration or database. It keeps the time
  zone and the language of the server, so report dates stay in your zone. At
  most two per Puppeteer worker (`WORKER_COUNT`) run at once; the others wait.
  An equation is also checked in a separate process when a job, a template or
  a preview arrives through the JSON API; the job form checks it in the
  browser. Before, that check ran in the server, and one recursive equation
  held it for seconds on every save.
- A member of one space could open "add job from template" with the id of a
  template stored in another space and receive that template, login password
  included; the read is now scoped to the space, as the edit page's was.
- The lists and menus of the Overview, Jobs, Runs and Reports pages, and the
  JSON reads of a member with read-only access (`GET .../jobs`,
  `.../jobs/{id}`, `.../blueprints`, `.../blueprints/{id}`), carry the
  captures without their login passwords. A writer still gets them as stored
  through the API and the editor, which need them.
- Suspend and Activate from the Jobs list write the state and nothing else.
  The bulk write accepted any job field from the browser and skipped the
  licence guard on the number of capture actions.

- Report links are private. Every new run gets a secret token; the links in
  a delivered email, Slack message or webhook carry it, and the report files
  (PDF, HTML, images) open for that token or for a signed-in member of the
  run's space, and answer "not found" to anyone else. Before, anyone who
  knew a report path could read it. Runs made before the upgrade keep the
  links that were already sent, until they expire or are deleted.
- The edition limits are enforced on the server. Before, the buttons were
  disabled in the browser and nothing else checked: a call made directly, or
  an import, could create jobs, delivery interfaces and AI providers past the
  limit, and the scheduler ran them. The three-actions-per-job limit of the
  free edition and the rule that a job starts with a navigation are checked
  on save too.
- Copying a delivery interface, an AI provider or a blueprint into another
  space needs admin access to the space it comes from, and copying a job
  needs write access there. Read access was enough before, which carried
  credentials and API keys into a space the caller controls. Found on the
  way: cloning or copying an AI provider did not work at all.
- The delivery-interface list and the health-monitoring form no longer
  receive credentials; the pages get the names and types they show.
- The container no longer carries `sudo`. It starts as root, prepares the
  storage and report volumes, and drops to the unprivileged `pptruser`
  (uid 996) with no capabilities and no way to regain them. A container
  started with `--user` skips that step and stops with the `chown` to run
  when its volumes are not writable.
- Local passwords are stored as salted scrypt hashes, and a login attempt
  costs the same whether the account exists or not. Existing accounts keep
  working; a password is re-hashed the next time it is set. A fresh install
  gets a random session secret, and an install that saved the old
  placeholder is repaired on start.
- The two processes share a secret for their internal calls; a process
  started without it used a fixed word. It now refuses every internal call
  instead.
- The database key is never printed in a log, a key with a quote in it no
  longer breaks the connection, and an instance running on the default
  `DB_ENCRYPTION_KEY` says so at start, once.
- **Two leftover routes are removed.** A test route under
  `/guest/api/test/webhook` wrote any request body to the server log, with no
  login. It is gone, and so is the unlinked `/debug` page. If a webhook
  delivery interface points at the test route, point it at a real receiver:
  a webhook that answers "not found" now fails the delivery.
- The snooze and unsubscribe pages check a link as strictly as their actions
  do. Before, a link with a malformed expiry never expired, and the signature
  compare did not take a constant time.
- A demo user entry with two fields no longer prints its password in the log
  as if it were the user name.
- The published image is reproducible: the base image, every Debian package,
  Chromium and the build tooling are pinned to exact versions, so two builds
  of the same commit give the same image. The vulnerability scan also covers
  dependency updates that touch only the lock file, and every dependency
  update goes through the full image, browser and end-to-end gates before it
  can merge. `libpcre2` in the base image carried two high-severity
  advisories; the patched build is installed.

### 🐞 Fixes

- **Long captures keep their retries.** A capture that took more than five
  minutes lost its retry: the scheduler stopped waiting for the answer.
- **A capture that runs past its 30-minute limit is stopped.** Before, the
  queue freed its slot while the capture went on, so hung captures piled up.
  The run is stored as failed and retried.
- **A failure after the capture is a failed run.** A full disk, a delivery
  that throws or a PDF that times out used to leave no run at all; now the run
  shows the error and is retried.
- **A Kibana page that never shows Kibana fails after five minutes.** A login
  page or an error page used to produce a report of that page. A missing panel
  or a spinner that does not stop only warns, because they differ between
  Kibana versions.
- **A report that reached nobody is retried.** A report withheld on purpose,
  or delivered to some of its recipients, is not sent again.
- **Mail goes out one message at a time over one connection.** Parallel
  connections made a server that allows few of them refuse most recipients.
  After a server failure the other recipients are marked failed at once
  instead of each waiting for its own timeout, and every SMTP timeout is now
  at most one minute.
- **Retries are listed under the run that failed first.** Each attempt was
  stored as a separate run: "Attempts" never counted, and deleting the failed
  run left its retries and their files behind. The upgrade re-attaches the
  retries already stored.
- **Deleting a job removes its report files.** Before, the files stayed on
  disk for good, because the clean-up finds them through the runs.
- **Start-up names the runs it missed.** When Anaphora was down at a job's
  firing, the log says so. The job runs at its next firing, not late.
- **No false alarm about zombie processes.** Under `init: true` in compose,
  the process manager logged that "zombie reaping won't work". It did work;
  the message is gone.
- **A typo in a text block no longer takes the job editor down.** `{{ hits`
  with no closing braces, or an `{% if %}` with no `{% endif %}`, threw while
  the Compose tab drew the block. The whole job page closed and lost the
  unsaved changes of every section, and the job could not open Compose again.
  The block now shows the error in its place, and a syntax error cannot be
  saved. The text editor keeps **Ok** disabled. The message, rich message and
  JSON body editors of a delivery refuse it. A job or template write through
  the JSON API or an import is refused with the field's path. A template that
  fails only on example values (a colour filter on a captured text) can still
  be saved.
- **Quotes and comparisons work in a text block.** The text editor stores `"`,
  `'`, `<` and `>` as HTML entities, so `{{ v | default: "n/a" }}` and
  `{% if n > 5 %}` never rendered. They are decoded inside the Liquid tags
  before the template is read.
- **A report whose text block does not render is not delivered.** Before, the
  whole report was replaced by "There was an error building the report" and
  that page went to the recipients. Now the report is built with the error in
  place of the broken block and kept on the run, so you can open it and see
  where the template breaks; no recipient, bucket or webhook gets it. The Jobs
  list shows the job as **Not delivered**, job health counts the run as failed
  (so the health alert fires), and every delivery of the run names the page,
  row and column of each broken block; the job log carries the error itself.
  The delivery interfaces are not blamed: their health ignores such a run. The
  run does not count as sent, so a throttled job sends the next run with the
  fixed template. A Test withholds the same way and says so. A report that
  could not be built at all is withheld the same way: before, the error page
  went to every recipient, quoting the internal error, and the run was a
  success. For a job with no delivery interface, the Runs page names the row
  "No delivery interface" instead of "Unknown delivery config".
- **A failed delivery shows on the job.** When a mail server, Slack or a
  webhook refused the report, the Runs page said "Delivery issue", but the
  Jobs list showed the job as **Success** and job health stayed green, so no
  health alert fired. The Jobs list now shows **Delivery issue**. Job health
  counts a run whose report reached nobody as failed, as it counts a failed
  capture, and a run whose report reached some interfaces or recipients but
  not all as partly delivered: one address that refuses the mail keeps the job
  yellow, not red. In `/guest/api/health`, the `state` of a recent run can now
  be `partial`. If you monitor that endpoint: the first health check after the
  upgrade rates the last five runs of each job under this rule, so it can turn
  a job yellow or red, and send the health mail once, for a failed delivery
  that is days old.
- **A renderer failure is retried.** When the server could not start the
  separate process that renders the report (out of memory, out of processes),
  the report was withheld as if a text block were wrong. The run now fails,
  and the job's retries run it again.
- **The S3 copy matches the PDF.** The HTML copy for S3 rendered the text
  blocks a second time, and could fail on a block the PDF showed; it now shows
  the blocks the run rendered. With "PDF and HTML", nothing is uploaded when
  the HTML copy cannot be built; before, the bucket got the PDF alone.
- **The S3 HTML copy shows a snapshot that was not taken.** A snapshot inside
  a condition that did not hold made the HTML uploaded to S3 the error page;
  it now shows the "Snapshot not caught" placeholder, as the PDF does.
- **A webhook that refuses the report is no longer a green delivery.** The
  webhook call ignored the answer. A rotated token, a moved URL or a receiver
  that was down was recorded as a successful delivery, of a report the webhook
  never took. A webhook that answers anything but 2xx now fails the delivery,
  and the run shows the status and the answer the webhook gave. The Test button, the health
  monitor, the licence alert and the AI budget alert read the same call, so
  they report the failure too.
- **A report with no page is no longer possible.** A template whose page list
  was empty rendered nothing and every run of the job died in the PDF step,
  with no message that named the cause. An install upgraded from the legacy
  storage carried such rows; the migration gives each one a default page,
  keeping the row's own colours and font, and a write that would create one is
  refused with a message that names the field. A template that already has no
  page can still be hidden, renamed or cloned: the page is repaired on the way
  through rather than the write being refused.
- **Kibana hit counts over 999 are read whole.** Kibana prints the count
  grouped by thousands ("1,470,592"), and Anaphora kept only the first group,
  1. Every alert or conditional report that compared hits above 999 compared
     the wrong value. The count is now read whole, in any grouping style.
- **A cron the scheduler cannot run no longer takes Anaphora down.** A
  pattern such as `0 */25 * * *` passed the form but crashed the scheduler
  at start, and the scheduler serves the login page. Such a pattern is now
  refused on save, and a job that has one shows "Never runs".
- **One job that cannot be read no longer takes the pages down.** A stored
  job row that does not parse broke the overview, the lists and the
  scheduler start. Now it is left out and named: the Jobs page shows it with
  a Delete action, and its runs are kept.
- **A snooze link only snoozes.** An empty snooze duration was stored as an
  unsubscribe. A snooze now lasts 5 minutes to 8 days, and the button stays
  off until you pick a duration. The unsubscribe link still unsubscribes.
- **The Runs page shows what a run ended as.** The Status and Report filters
  read the first attempt, so a run whose retry succeeded was listed under
  Error. They read the latest attempt now, as the row does. The Duration
  column was always empty, sorting by job name reset every filter, and the
  Attempts filter did nothing: all three work. A malformed filter or time
  range in the address no longer crashes the page, and deleting the last
  rows of the last page moves to the page before instead of "No data".
- **Lists in reports have their bullets and numbers again.** They were gone
  from every text block since the editor upgrade, in the delivered report and
  in the previews.
- **A job with a missing or broken URL says so.** It failed with an internal
  browser message. It now fails with "Found no valid URL to navigate to"
  before the navigation starts.
- **A test run that fails after the capture is recorded.** It showed only as
  a stream error, with no run to open.
- Every page with a card logged a rendering mismatch in the browser console.
  It is gone.
- The nightly database compaction (02:00) can no longer start during a
  database restore.
- **Cells you removed from a row stay removed.** Setting a row from three
  columns back to one hid the last two cells but left them in storage, and the
  report followed the hidden count. The row now holds exactly the cells you
  see, the migration trims the rows that drifted, and the editor and the
  delivered report can no longer disagree about how many cells a row has.
  Dragging a block to the side of a row no longer loses it when the row's
  stored count was wrong, and "delete cell" can no longer empty a row.
- **A colour is checked before it is used.** The colour fields took any text,
  and text that was not a colour reached the report's `style` attributes,
  where it could make the renderer and each recipient's mail client fetch an
  address of the author's choosing. A colour must now be `#rrggbb`, `rgb()`,
  `rgba()`, `hsl()`, `hsla()` or a colour name; anything else is refused on
  save, and a value already stored is ignored when the report renders.
- **A refused template save says what was wrong.** Hiding, renaming, cloning
  or bulk-editing a template answered with a generic failure, and the Visible
  switch moved without saving anything. Each of those now shows the field and
  the reason.
- **A legacy JSON import in "autofix" mode repairs the whole file.** A file
  carrying both an old field shape and a template with no page needed two
  repair passes and got one, so the import was refused with the very message
  the autofix exists to remove. A refused import now also names the blueprint
  and the field instead of showing a generic error.
- **The licence-expiry alert reaches you.** The warning is sent once, and it
  was marked as sent whether or not the mail went out. A check during a
  restart, with no delivery interface, or with an S3 interface (which carries
  no message) used up the only warning there was. Now the warning counts as
  sent only after a real delivery. An address that bounces no longer stops the
  addresses after it. An alert that cannot be delivered at all gives up after
  three tries, instead of calling the mail relay at every monitor check.
- **A job that failed on schedule still retries after you press "Run now".**
  The scheduler read the newest run of any type. A manual run, started to look
  at a failed scheduled one, hid that run's pending retries. A restart or an
  edit then dropped them, and the job waited silently for its next cron slot.
- **The job monitor keeps reporting.** A stalled health check could block the
  monitor — and the licence alert with it — for the life of the process. The
  call now times out.
- **Migration timestamps stay put on a host that is not on UTC.** A datetime
  read during a migration was parsed as local time, so on a host with `TZ` set
  (for example `Europe/Luxembourg`) values shifted by the offset on the way
  through. Note for installs upgraded before this release: the `ai_provider`
  table's `created_at` and `updated_at` may hold values shifted that way. No
  feature reads those two columns and there is no backfill — a shifted value
  cannot be told apart from a correct one.
- Cloning selected templates clones those templates only. Before, every
  built-in template came along as a copy, and a copy of an edited built-in
  took the built-in's place in the list. Stray "(copy)" templates from an
  earlier clone stay in the list; select and delete them.
- A bulk action the licence refuses (a clone or a copy over the free cap)
  says so in a message and keeps the selection; before, nothing happened on
  screen. A bulk clone or delete on Jobs and Templates keeps the search, the
  filters and the sort order, as it does on the other lists.
- A second delivery interface with the same name becomes "Name (1)"; before,
  the renaming never fired and duplicates were kept. Editing a built-in
  blueprint no longer renames it to "Name (1)" on every save, and a copy
  into another space keeps its name.
- A rounded Kibana time range (`now-7d/d`) reaches the capture unchanged;
  the rounding was dropped.
- A snooze for a whole delivery interface shows on the page, is not offered
  twice, and can be revoked. Revoking one always failed with "Cannot snooze
  an unsubscribed recipient".
- A failed Enter step reports its real cause. The error handler threw on its
  own and hid it.
- The AI action reads the links of the captured page as links. Each one was
  a copy of the whole page with an address attached.
- A password with a colon in it reaches the authentication layer whole.
- Every capture step left a 60-second timer running after it finished, so a
  job with many steps kept the process busy long after the run.
- A scheduler request whose handler failed hung with no answer; it answers
  500 now. The browser extension's wait for a page to settle could wait
  forever on a page that never went quiet.
- The disabled slider handle in the dark theme painted black.
- A missing email header printed "undefined" instead of nothing.
- The AI provider set by the environment repairs a broken row instead of
  stopping at it.
- Mail sent through Mailgun now carries the sender as `Name <address>`,
  the form Mailgun documents; it went out as `Name address` before.

### 🧐 Dependencies

- The libraries behind the AI actions (OpenAI client 7), Mailgun (14), SMTP
  mail (Nodemailer 10) and the cron descriptions (cronstrue 3) moved to
  their current majors. Each was read against how Anaphora calls it, and each
  has a test that runs the real library: the AI client against an
  OpenAI-compatible server, SMTP against a real mailbox, and Mailgun's
  attachment bytes read back off the wire. Nothing changes in what you see or
  configure.
- The database layer runs on TypeORM 1 and on SQLite 3.53 with SQLite3
  Multiple Ciphers 2.4. Existing databases open unchanged and no schema
  migration runs for this. The SQLite engine now arrives prebuilt for every
  supported platform, so an install compiles nothing.
- The authentication layer (Authfish 1.0.154) moves with it: the same
  TypeORM and SQLite driver, the same Node 24, the YAML library's next
  major, and a stricter command line for the activation-key tool, where an
  extra argument is an error instead of being ignored.
- Two majors were declined on purpose: `iframe-resizer` 5 moved from MIT
  to GPL-3.0, and zod 4 is a migration of the schema module, tracked
  separately.

### 🧐 Platform

- The runtime moves from Node 22 to Node 24 LTS, the current long-term
  support line, maintained until April 2028. No configuration change on
  your side.
- The runtime image is a fifth smaller: about 210 MB less to pull.

### 🧐 Quality

- The capture engine, the scheduler's run lifecycle, report delivery and the
  browser connectors are under test. The suite grew from about 880 to more
  than 2000 tests, and the scheduler suites pass in every time zone.
- Dead files, dead exports and import cycles fail the build; every workspace
  is linted with the same rules, which found and fixed twelve unhandled
  failures.

---

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
