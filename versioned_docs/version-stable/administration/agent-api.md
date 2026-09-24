---
sidebar_position: 5
description: Let an AI agent in your browser build Anaphora jobs - the /llms.txt guide, the JSON API under /api/spaces, and the OpenAPI description.
keywords: [ Anaphora API, AI agent, llms.txt, OpenAPI, JSON API, Claude in Chrome, browser agent, automation ]
---

# API for AI agents

Anaphora explains itself to an AI agent that works in your browser, such as Claude in Chrome. The agent can read a guide
and then create jobs, templates and runs through a JSON API instead of the editor.

## The guide

Every page of Anaphora links to `/llms.txt` (**Guide for AI agents** in the footer). The login page names the path too.
The guide explains what a job is, how a capture is built, and how a report is templated and delivered. It is served by
your running instance, so it matches your version.

| Path                          | Content                                                                 |
|-------------------------------|-------------------------------------------------------------------------|
| `/llms.txt`                   | The entry point of the guide                                            |
| `/llms/{page}.md`             | One page per topic: `concepts`, `jobs`, `capture`, `template`, `delivery`, `runs`, `api` |
| `/llms/openapi.json`          | The OpenAPI description of the API                                      |
| `/llms/schema/{Name}.json`    | The JSON Schema of each body, for example `/llms/schema/Job.json`       |

These paths answer without a login, so an agent can read them before the user signs in.

## The API

The API is on the same origin as the app. It uses your signed-in session: there are no API tokens. An agent calls it
with `fetch()` from a page of the app, and the session cookie goes along. A script outside the browser first logs in
with `POST /auth/login-local` and a body `{ "username", "password" }`.

The API applies the same access checks and edition limits as the pages.

| Method and path                                    | Access | Result                                            |
|----------------------------------------------------|--------|---------------------------------------------------|
| `GET /api/agent/context`                           | any    | Who is logged in, the spaces, the license limits  |
| `GET /api/spaces/{space}/jobs`                     | ro     | The jobs of the space                             |
| `POST /api/spaces/{space}/jobs`                    | rw     | Creates a job                                     |
| `GET /api/spaces/{space}/jobs/{jobId}`             | ro     | One job                                           |
| `PUT /api/spaces/{space}/jobs/{jobId}`             | rw     | Replaces a job                                    |
| `DELETE /api/spaces/{space}/jobs/{jobId}`          | rw     | Deletes a job                                     |
| `POST /api/spaces/{space}/jobs/{jobId}/run`        | rw     | Runs a job now                                    |
| `POST /api/spaces/{space}/jobs/preview`            | rw     | Previews a capture                                |
| `POST /api/spaces/{space}/jobs/test`               | rw     | Tests a job that is not saved yet                 |
| `GET /api/spaces/{space}/blueprints`               | ro     | The job templates (built-in and own)              |
| `POST /api/spaces/{space}/blueprints`              | admin  | Creates a job template                            |
| `GET /api/spaces/{space}/blueprints/{blueprintId}` | ro     | One job template                                  |
| `PUT /api/spaces/{space}/blueprints/{blueprintId}` | admin  | Replaces a job template                           |
| `DELETE /api/spaces/{space}/blueprints/{blueprintId}` | admin | Deletes a job template                          |
| `GET /api/spaces/{space}/delivery-interfaces`      | ro     | Delivery interfaces, without secrets              |
| `GET /api/spaces/{space}/ai-providers`             | ro     | AI providers, without API keys                    |
| `GET /api/spaces/{space}/runs`                     | ro     | Runs, one page at a time                          |
| `GET /api/spaces/{space}/runs/{runId}`             | ro     | One run, with the links to its report files       |

Access levels: `ro` is read-only access to the space, `rw` is read-write, and `admin` is space admin. With read-only
access, the answers carry the captures without their login passwords.

The API cannot create delivery interfaces or AI providers, because they hold secrets. The user sets them up in the UI,
and the agent binds a job to them by their ID.

### Errors

| Status | Meaning                                                                                  |
|--------|------------------------------------------------------------------------------------------|
| 400    | The body is not valid. `issues` names each field path and the rule.                      |
| 401    | Not logged in                                                                            |
| 403    | No access to the space, or the space does not exist. With `code: "licenseLimit"`, the edition limit is reached. |
| 404    | No such object in this space                                                             |
| 409    | The `id` you chose on create is already in use                                           |

A `POST` or `PUT` from another origin is refused, even with the session cookie.

`run`, `preview` and `test` answer with a stream (`text/event-stream`). The last event, `end`, carries the result. A
preview or a test takes as long as the page takes to load, often 10 to 60 seconds.

## Next steps

- [Jobs](../jobs/): what a job holds
- [Authentication](./authentication/): roles and space permissions
