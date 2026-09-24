---
sidebar_position: 2
description: Configure Anaphora with environment variables for production deployments. PUBLIC_URL, admin credentials, and license setup.
keywords: [ Anaphora configuration, environment variables, PUBLIC_URL, setup guide, production deployment ]
---

# Configuration Guide

After installing Anaphora and setting it up with Environment variables, you can further configure it in the admin UI.

## Initial Setup

On first launch:

1. Navigate to `PUBLIC_URL` in your browser
2. Create the initial admin user (if not set via env vars)
3. Log in with your admin credentials
4. Go to **Settings** → **System** to review and adjust global settings
5. Configure your license if using PRO/Enterprise features
6. Create your first job

<!-- todo Extend, go more into details of configuring the admin UI -->

## Theme

Anaphora has a light theme and a dark theme. To choose one, open **Theme** at the bottom of the sidebar:

| Option     | Result                                                          |
|------------|-----------------------------------------------------------------|
| **Light**  | The light theme. This is the default.                           |
| **Dark**   | The dark theme.                                                 |
| **System** | Follows your operating system, and switches when the OS does.   |

Anaphora stores the choice in a cookie, so it applies per browser. The login page and the authentication settings use
the same theme.

Reports always stay on white paper. The template page, the text editor and the preview show what your recipients see,
in both themes.

## Next Steps

- [Features & Editions](./features) - Compare Free, PRO, and Enterprise
- [Basic Examples](../basic-examples/) - Create your first report job
