---
sidebar_position: 5
---

# Advanced Capture

Advanced Capture mode enables you to create complex navigation flows, including conditional alerts. You can compose chains of actions, evaluate conditions, and optionally terminate into building a report.

## Overview

Toggle the **Advanced** switch on the Capture tab to access advanced mode.

![Advanced Capture Mode](./images/advanced-capture-panel.png)

In Advanced mode, you can:

- Chain multiple actions together
- Extract data into variables
- Perform calculations
- Evaluate conditions
- Build reports conditionally

:::info Key Concept
In Anaphora, **an alert is modeled as a conditional report**. You create alerts by adding conditions to your capture workflow that determine whether the report should actually be sent.
:::

## Capture Actions

Build your workflow by adding actions to the execution chain:

![Available Actions](./images/actions-dropdown.png)

### Browser Actions

Control browser navigation and interaction:

| Action | Parameters | Description |
|--------|------------|-------------|
| **Click** | selector | Click an element on the page |
| **Wait for visible** | selector | Wait until an element becomes visible |
| **Type text** | selector, text | Type text into an input field |
| **Reload page** | - | Refresh the current page |
| **Navigate** | url | Navigate to a different URL |
| **Wait before continue** | seconds | Pause execution for a specified time |

### Data Actions

Extract and manipulate data:

| Action | Parameters | Description |
|--------|------------|-------------|
| **Capture value** | selector → variable | Extract text content from an element into a variable |
| **Capture snapshot** | selector → variable | Take a screenshot of an element and store it |
| **Calculate** | ?variables... → variable | Perform arithmetic operations on captured values |

### Control Flow Actions

Control the execution flow:

| Action | Parameters | Description |
|--------|------------|-------------|
| **Conditional block** | condition | Execute nested actions only if condition is true |
| **Break** | - | Stop execution and don't send reports |

## Building an Alert Workflow

Here's a typical alert workflow:

```
1. Navigate → Kibana Discover page
2. Capture value → Extract document count into $count
3. Calculate → Compare: $count > 100
4. Conditional block → If $count > 100:
   ├── Capture snapshot → Take dashboard screenshot
   └── Build Report → Send alert
5. Break → Otherwise, don't send anything
```

## Workflow Execution

![Workflow Flow](./images/advanced-capture-flow.png)

The workflow executes sequentially:

1. Each action runs in order
2. Variables persist throughout the workflow
3. Conditional blocks can skip nested actions
4. **Break** terminates execution without sending reports

## Using Variables

Variables store extracted data for use in conditions and calculations:

```
Capture value: selector="#hitCount" → $hits
Calculate: $hits > 1000 → $alert_needed
Conditional block: $alert_needed == true
```

### Variable Naming

- Use descriptive names: `$error_count`, `$response_time`
- Variables are available to all subsequent actions
- Variables can be used in report templates

## Example: Error Rate Alert

Create an alert that triggers when error count exceeds a threshold:

1. **Navigate** to your Kibana error dashboard
2. **Wait for visible** `.visualization-container` (ensure dashboard loads)
3. **Capture value** from error count element → `$errors`
4. **Calculate** `$errors > 50` → `$should_alert`
5. **Conditional block** when `$should_alert == true`:
   - **Capture snapshot** of the dashboard
   - **Build Report** and send to recipients

## Testing Advanced Workflows

1. Click **Test capture** to run the entire workflow
2. Review each action's result in the test output
3. Verify conditions evaluate correctly
4. Check that variables contain expected values

## Next Steps

- [Jobs](./jobs) - Understand job concepts
- [General Settings](./general-settings) - Configure job timing
