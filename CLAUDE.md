# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Docusaurus 3.9 documentation site for **Anaphora** - an automated Kibana & Grafana reporting and alerting tool. The site is deployed to GitHub Pages at docs.anaphora.it.

## Common Commands

```bash
npm start          # Start dev server at localhost:3000
npm run build      # Build for production (output in /build)
npm run serve      # Serve production build locally
npm run typecheck  # Run TypeScript type checking
npm run clear      # Clear Docusaurus cache (use when seeing stale content)
```

## Architecture

### Documentation Structure

- `/docs/` - Current version (pre-release) documentation in Markdown
- `/versioned_docs/version-stable/` - Stable version documentation
- `/sidebars.ts` - Navigation structure for the docs sidebar
- `/versions.json` - Declares available doc versions

The site uses docs-only mode with `routeBasePath: '/'`, meaning documentation is served from the root URL rather than `/docs/`.

### Versioning

Two versions exist:
- **stable** (default) - served at root path `/`
- **current** (pre-release) - served at `/pre-release/`

To create a new stable version: `npm run docusaurus docs:version <version-name>`

### Key Configuration Files

- `/docusaurus.config.ts` - Main site config (SEO, navbar, footer, themes)
- `/src/css/custom.css` - Theme customization using Infima CSS variables
- `/src/pages/index.tsx` - Root redirect to `/getting-started/`

### Enabled Features

- **Mermaid diagrams** - Use fenced code blocks with `mermaid` language
- **Strict link checking** - Build fails on broken links (`onBrokenLinks: 'throw'`)
- **Markdown link checking** - Throws on broken markdown links

### Deployment

Automatic via GitHub Actions on push to `main`:
1. Builds with `npm run build`
2. Deploys to GitHub Pages

## Documentation Sections

Documentation is organized into these main categories (see sidebars.ts):
- Getting Started (installation, features, configuration)
- Basic Examples (Kibana/Grafana dashboard reports, alerts)
- Advanced Examples (mixed sources, AI features, branding)
- Jobs (capture, composer, delivery)
- Delivery Interfaces (SMTP, Mailgun, Slack, S3, webhook)
- Administration (authentication, spaces, AI providers)
- Data Retention
