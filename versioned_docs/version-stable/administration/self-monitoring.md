---
sidebar_position: 3
description: Monitor Anaphora health, performance, and job metrics. Configure alerts, access logs, and integrate with Prometheus.
keywords: [ self monitoring, health check, Prometheus, metrics, job monitoring, performance, Anaphora monitoring ]
---

# Self-monitoring

Monitor the health of Anaphora and the success of its jobs and deliveries.
![](images/self-monitoring.png)

## Health monitoring

Access the monitoring settings at **Settings** > **Application** > **Health Monitoring**.

### Set up health alerts

Get alerts when Anaphora detects changes in job success rates.

1. Under **Operator notifications** > **Delivery**, select a **Delivery Interface**. For an SMTP or Mailgun interface,
   also add the **Recipients**. A webhook with **Define body in job instead** is not available.
2. Select **Job Health Alerts**.
3. Set **Health Check Frequency**: how often to check job health.
4. Set **Maximum Notification Frequency**: minimum time between alerts (optional).
5. Optionally, click **Test** to send the current health status.
6. Click **Save**.

:::info
The same delivery settings also receive the token budget alerts of the AI providers.
:::

## Health API

To get the health status of Anaphora through the API, call this endpoint:

```
GET /guest/api/health
```

### Response format

```json
{
  "jobs": [
    {
      "id": "79cf54b6-df32-4b09-84f4-708ecc72b7bc",
      "name": "Kibana Dashboard Snapshot",
      "description": "Takes a snapshot of a dashboard",
      "cron": "5 4 * * *",
      "healthStatus": "green",
      "recentRuns": [
        {
          "runAt": "2026-01-15T04:05:00.041Z",
          "state": "success"
        },
        {
          "runAt": "2026-01-14T04:05:00.051Z",
          "state": "success"
        },
        {
          "runAt": "2026-01-13T04:05:00.034Z",
          "state": "success"
        },
        {
          "runAt": "2026-01-12T04:05:00.040Z",
          "state": "success"
        },
        {
          "runAt": "2026-01-11T04:05:00.034Z",
          "state": "success"
        }
      ]
    }
  ],
  "deliveryInterfaces": [
    {
      "id": "4d5fba03-561e-4503-bf4d-c41817133aca",
      "name": "My Delivery Interface",
      "type": "webhook",
      "healthStatus": "green",
      "summary24Hours": {
        "totalCount": 11,
        "errorCount": 0,
        "errors": []
      }
    }
  ]
}
```

### Health status values

| Status     | Meaning                    |
|------------|----------------------------|
| **green**  | All recent runs successful |
| **yellow** | Some recent failures       |
| **red**    | All recent runs failed     |
| **gray**   | No recent activity         |

### Run states

Each entry of `recentRuns` has a `state`:

| State       | Meaning                                                                            |
|-------------|------------------------------------------------------------------------------------|
| `success`   | The run succeeded and its report was delivered                                     |
| `partial`   | The report reached some delivery interfaces or recipients, but not all            |
| `failed`    | The capture failed, or the report reached nobody (for example a withheld report)  |

A job is green when its last five runs are all `success`, and red when they are all `failed`. A `partial` run makes the
job yellow, not red: one address that refuses the mail keeps the job yellow.

### AI budget alerts

The delivery interface of the health alerts also carries the [AI token budget](./ai-providers.md#budget-alerts) alerts.
You can set it without switching health monitoring on.

## Next steps

- [Backup](./backup): configure backups
