---
sidebar_position: 2
description: Configure Anaphora capture settings - Kibana, Grafana, and generic web connectors with authentication and advanced multi-step workflows.
keywords: [ Kibana capture, Grafana capture, headless browser, web scraping, dashboard capture, authentication ]
---

# Capture Configuration

The Capture tab defines what data to collect and how. Anaphora's headless Chrome-based connector can navigate,
authenticate, and capture any web application.

## Capture Modes

### Basic Mode

Simple single-URL capture:

1. Select a connector (Kibana, Grafana, Generic URL)
2. Enter the URL
3. Configure authentication (if needed)
4. Capture

Best for: Quick dashboard snapshots, simple reports.

### Advanced Mode

Multi-step browser automation:

1. Chain multiple navigation and capture actions
2. Extract data into variables
3. Evaluate conditions
4. Build complex workflows

Toggle **Advanced** to switch modes.

## Connectors

### Kibana Connector

Use the Kibana connector to use Anaphora's built-in support for Kibana pages.

**Supported Page Types:**

- Dashboards
- Canvas workpads
- Discover views

**Authentication:**
Login to Kibana using the ReadonlyREST login access.

**Time Range Configuration:**
Either set the time range in the Kibana UI before copying the URL, or set it in Anaphora using a similar syntax to
Kibana's time picker.

**Capture Options:**
| Mode | Description |
|------|-------------|
| **Entire dashboard** | One snapshot of the full dashboard |
| **Per visualization** | Separate snapshot for each panel |

:::tip Per-Visualization Capture
Capturing each visualization separately gives you more control in the Composer — arrange panels in custom layouts,
exclude certain visualizations, or combine with other content.
:::

### Grafana Connector

Use the Grafana connector to use Anaphora's built-in support for Grafana pages.

**Authentication:**
Login with a Grafana user. Works for Grafana Cloud and self-hosted Grafana instances.

**Capture Options:**

- Full dashboard capture
- Panel-level capture (similar to Kibana per-visualization)

### Generic Web Connector

For any web page — if a human can reach it, Anaphora can capture it.

**Use Cases:**

- Internal tools and dashboards
- SaaS applications
- Custom web applications

**Authentication:**

- Natively supports Basic Auth headers
- Use Advanced mode to script login flows

## Advanced Capture Workflows

Advanced mode enables multi-step browser automation for complex scenarios.

### Workflow Structure

```mermaid
flowchart LR
    A["Navigate to URL"]]
    B --> C["Interact (click, type)"]
    C --> D["Capture (snapshot to var)"]
```

### Browser Actions

| Action               | Description      | Example                    |
|----------------------|------------------|----------------------------|
| **Navigate**         | Go to a URL      | Open dashboard             |
| **Click**            | Click an element | Expand menu, select filter |
| **Type**             | Enter text       | Search box, form field     |
| **Wait for visible** | Wait for element | Dashboard loading complete |
| **Wait**             | Pause execution  | Allow animations to finish |
| **Reload**           | Refresh page     | Clear cached state         |

### Data Extraction Actions

| Action               | Description                    | Example                  |
|----------------------|--------------------------------|--------------------------|
| **Capture value**    | Extract text into variable     | Error count, status text |
| **Capture snapshot** | Screenshot element to variable | Chart, panel, full page  |
| **Calculate**        | Arithmetic on variables        | `errors / total * 100`   |

### Control Flow Actions

| Action                | Description          | Example                          |
|-----------------------|----------------------|----------------------------------|
| **Conditional block** | If/else logic        | Only notify if errors > 0        |
| **Break**             | Stop without sending | Skip report if threshold not met |

### Example: Multi-Source Report

Capture from multiple dashboards in one job:

```
1. Navigate → Kibana Dashboard A
2. Capture snapshot → dashboard_a
3. Navigate → Grafana Dashboard B
4. Capture snapshot → dashboard_b
5. Navigate → Internal Tool
6. Click → "Generate Report" button
7. Capture snapshot → internal_report
```

Result: Three snapshots available in Composer as `dashboard_a`, `dashboard_b`, `internal_report`.

### Example: Conditional Alert

Only send notification when error threshold is exceeded:

```
1. Navigate → Error Dashboard
2. Capture value → error_count (from error counter element)
3. Conditional block:
   - If error_count < 100:
     - Break (no notification sent)
4. Capture snapshot → error_dashboard
```

## Authentication Best Practices

### Service Accounts

For production jobs:

- Create dedicated service accounts with read-only access
- Store credentials securely in Anaphora's encrypted database

### Kibana with ReadonlyREST

Anaphora has first-class support for ReadonlyREST authentication:

- Simple username/password login
- Tenancy selection for multi-tenant Kibana
- Enterprise SSO integration

## Reliability Tips

### Stable Captures

For reliable automation:

- Use stable dashboard URLs (avoid temporary/session-based URLs)
- Prefer consistent layouts — dynamic dashboards may produce varying results
- Add wait actions when necessary to ensure content is fully loaded
- If possible use element-specific captures rather than full-page when possible

### Handling Failures

- Configure retry policies in General tab
- Test captures manually before scheduling

## Testing

Click **Test capture** to:

1. Run the capture workflow immediately
2. Preview all captured snapshots
3. Verify authentication works
4. Check variable values
5. Debug any issues

:::tip Debug Workflow
Use Test frequently while building Advanced workflows. Each action's result is visible, making it easy to identify where
issues occur.
:::

## Next Steps

- [Composer](./composer) - Arrange captured content into reports
- [Delivery](./delivery) - Configure where reports are sent
