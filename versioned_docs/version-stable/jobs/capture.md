---
sidebar_position: 2
---

# Capture

The Capture tab defines what data to collect and how.

## Capture Modes

### Basic Mode

Simple screenshot capture:
- Select connector (Kibana, Grafana, Generic URL)
- Enter URL
- Configure authentication
- Set time range (for dashboards)

### Advanced Mode

Complex workflows with multiple actions:
- Chain multiple actions
- Extract data into variables
- Evaluate conditions
- Build reports conditionally

Toggle **Advanced** to switch modes.

## Basic Configuration

### Connector Types

| Connector | Description |
|-----------|-------------|
| Kibana | Elastic Kibana dashboards with auto-detection |
| Grafana | Grafana dashboards and panels |
| Generic URL | Any web page |

### Authentication

| Option | Description |
|--------|-------------|
| None | Public dashboards |
| Basic | Username and password |
| API Key | For Grafana |
| Custom | Saved authentication profile |

### Time Selection

For dashboards, configure the time range:
- Set **from** and **to** dates
- Use relative times: "1 day ago" to "Now"

## Advanced Actions

### Browser Actions

| Action | Description |
|--------|-------------|
| Click | Click an element |
| Wait for visible | Wait for element to appear |
| Type text | Enter text in a field |
| Navigate | Go to a URL |
| Wait | Pause execution |

### Data Actions

| Action | Description |
|--------|-------------|
| Capture value | Extract text into a variable |
| Capture snapshot | Screenshot an element |
| Calculate | Perform arithmetic |

### Control Flow

| Action | Description |
|--------|-------------|
| Conditional block | Execute if condition true |
| Break | Stop without sending report |

## Testing

Click **Test capture** to:
1. Run the capture immediately
2. Preview results
3. Verify authentication
4. Check captured content

## Next Steps

- [Composer](./composer) - Arrange captured content
