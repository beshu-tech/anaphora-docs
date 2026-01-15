---
sidebar_position: 3
description: Configure AI providers in Anaphora for intelligent report analysis and content generation - OpenAI-compatible APIs, DeepSeek, vLLM, and more.
keywords: [AI providers, OpenAI API, DeepSeek, vLLM, LLM integration, AI analysis, intelligent reports]
---

# AI Providers

Configure AI providers to enable intelligent analysis, content generation, and anomaly detection in your reports. Anaphora supports any provider implementing the OpenAI-compatible API specification.

## Overview

AI Providers add intelligence to your reports:

- **Content Analysis** — Summarize dashboard data, identify trends
- **Anomaly Detection** — Flag unusual patterns or values
- **Natural Language** — Generate human-readable insights
- **Contextual Alerts** — AI-enhanced notification content

```
┌─────────────────────────────────────────────────────────────┐
│                        Anaphora                              │
│                                                              │
│  ┌─────────────────┐       ┌─────────────────────────────┐  │
│  │   Job Run       │       │      AI Providers           │  │
│  │                 │       │                             │  │
│  │ Captured data   │──────>│  ┌─────────────────────┐   │  │
│  │ + context       │       │  │ OpenAI-Compatible   │   │  │
│  │                 │<──────│  │ API Endpoint        │   │  │
│  │ Analysis result │       │  └─────────────────────┘   │  │
│  └─────────────────┘       │                             │  │
│                            │  Examples:                  │  │
│                            │  • DeepSeek                 │  │
│                            │  • vLLM (Qwen, Llama, etc.) │  │
│                            │  • OpenAI                   │  │
│                            │  • Azure OpenAI             │  │
│                            └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## OpenAI-Compatible API

Anaphora works with any provider implementing the OpenAI API specification. This includes:

| Provider | Description | Self-Hosted |
|----------|-------------|-------------|
| **OpenAI** | GPT-4, GPT-3.5-turbo models | No |
| **Azure OpenAI** | Microsoft-hosted OpenAI models | No |
| **DeepSeek** | Cost-effective reasoning models | No |
| **vLLM** | Self-hosted open-source models | Yes |
| **Ollama** | Local model runner | Yes |
| **LM Studio** | Desktop model runner | Yes |

## Configuration

### Adding a Provider

1. Navigate to **Settings** > **AI Providers**
2. Click **Add Provider**
3. Configure the connection:

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Identifier for this provider | `Production GPT-4` |
| **API Endpoint** | OpenAI-compatible base URL | `https://api.openai.com/v1` |
| **API Key** | Authentication token | `sk-...` (stored encrypted) |
| **Default Model** | Model to use if not specified | `gpt-4-turbo` |

4. Test the connection
5. Save

### Multiple Providers

Configure multiple providers for different use cases:

```
Provider: DeepSeek-Reasoner
├── Endpoint: https://api.deepseek.com/v1
├── Model: deepseek-reasoner
└── Use for: Complex analysis, reasoning tasks

Provider: vLLM-Qwen
├── Endpoint: http://vllm.internal:8000/v1
├── Model: Qwen2.5-72B-Instruct
└── Use for: High-volume processing, cost control

Provider: OpenAI-GPT4
├── Endpoint: https://api.openai.com/v1
├── Model: gpt-4-turbo
└── Use for: Critical reports, best quality
```

### Multiple Models per Provider

Each provider can expose multiple models:

| Provider | Available Models |
|----------|-----------------|
| OpenAI | `gpt-4-turbo`, `gpt-4`, `gpt-3.5-turbo` |
| DeepSeek | `deepseek-chat`, `deepseek-reasoner` |
| vLLM | Depends on deployed models |

## Provider Types

### DeepSeek

Cost-effective models with strong reasoning capabilities.

**Configuration:**
```
Name: DeepSeek
Endpoint: https://api.deepseek.com/v1
API Key: sk-xxxxx
Default Model: deepseek-chat
```

**Available Models:**
- `deepseek-chat` — General purpose, fast responses
- `deepseek-reasoner` — Enhanced reasoning, complex analysis

### vLLM (Self-Hosted)

Run open-source models on your infrastructure for data privacy and cost control.

**Configuration:**
```
Name: vLLM Internal
Endpoint: http://vllm-server.internal:8000/v1
API Key: (optional, depends on deployment)
Default Model: Qwen2.5-72B-Instruct
```

**Popular Models for vLLM:**
- `Qwen2.5-72B-Instruct` — Strong general purpose
- `Llama-3.1-70B-Instruct` — Meta's open model
- `Mistral-Large` — Efficient reasoning
- `Mixtral-8x22B` — Mixture of experts

**Benefits:**
- Complete data privacy — data never leaves your infrastructure
- No per-token costs after initial setup
- Customizable model selection
- Low latency for internal networks

### OpenAI

Direct integration with OpenAI's API.

**Configuration:**
```
Name: OpenAI
Endpoint: https://api.openai.com/v1
API Key: sk-proj-xxxxx
Default Model: gpt-4-turbo
```

### Azure OpenAI

Enterprise deployment through Microsoft Azure.

**Configuration:**
```
Name: Azure OpenAI
Endpoint: https://your-resource.openai.azure.com
API Key: xxxxx
Default Model: gpt-4 (deployment name)
```

## Space-Level Configuration

AI Providers are configured per Space for isolation:

| Space | AI Provider | Use Case |
|-------|-------------|----------|
| Production | OpenAI GPT-4 | Critical reports, highest quality |
| Development | vLLM Internal | Testing, iteration |
| Client-Acme | DeepSeek | Cost-effective analysis |
| Client-Beta | None | No AI features |

### Provider Inheritance

- Each Space can have its own AI provider configuration
- Jobs within a Space use that Space's configured provider
- Spaces without providers cannot use AI features

## Using AI in Jobs

### Composer Integration

Add AI-generated content blocks in the Composer:

1. Add an **AI Analysis** block
2. Select the analysis type:
   - **Summary** — Condense captured data
   - **Trends** — Identify patterns over time
   - **Anomalies** — Highlight unusual values
   - **Custom** — Provide your own prompt

3. Configure the prompt (for custom analysis)
4. Preview the output

### Example: Dashboard Summary

```
Block: AI Analysis
Type: Summary
Prompt: "Summarize the key metrics from this dashboard,
        highlighting any values that exceed normal ranges."

Output: "System performance remains stable with 99.8% uptime.
        CPU utilization averaged 45% with a peak of 78% at 14:30 UTC.
        Memory usage is trending upward (+12% week-over-week) and
        may require attention if the trend continues."
```

### Example: Anomaly Detection

```
Block: AI Analysis
Type: Anomaly Detection
Context: Error rate visualization captured from Kibana

Output: "⚠️ Anomaly detected: Error rate spiked to 4.2% between
        09:15-09:45 UTC, significantly above the 0.5% baseline.
        This correlates with the deployment at 09:12 UTC visible
        in the deployment timeline panel."
```

## Best Practices

### Provider Selection

| Use Case | Recommended Provider |
|----------|---------------------|
| **Security-sensitive data** | Self-hosted vLLM |
| **Cost-sensitive high volume** | DeepSeek or vLLM |
| **Best quality analysis** | OpenAI GPT-4 |
| **Compliance requirements** | Azure OpenAI or self-hosted |

### Prompt Engineering

For consistent results:

- Be specific about the desired output format
- Provide context about what the data represents
- Specify the audience (technical vs. executive)
- Include examples of good output when possible

### Cost Management

- Use appropriate models for each task (don't use GPT-4 for simple summaries)
- Set token limits for responses
- Monitor usage through provider dashboards
- Consider self-hosted options for high-volume use cases

### Reliability

- Configure fallback providers for critical jobs
- Test AI features in development Spaces first
- Set reasonable timeout values
- Handle AI failures gracefully (jobs should complete even if AI fails)

## Troubleshooting

### Connection Issues

| Issue | Solution |
|-------|----------|
| Connection timeout | Check endpoint URL, verify network access |
| 401 Unauthorized | Verify API key is correct and active |
| 429 Rate Limited | Reduce request frequency, upgrade plan |
| Model not found | Check model name matches provider's offerings |

### Quality Issues

| Issue | Solution |
|-------|----------|
| Poor analysis quality | Improve prompts, try different model |
| Inconsistent outputs | Add more specific instructions |
| Missing context | Ensure captured data is included |
| Hallucinations | Use more constrained prompts |

## Next Steps

- [Spaces](./spaces) - Configure Space-level AI providers
- [Composer](../jobs/composer) - Add AI blocks to reports
- [Self Monitoring](./self-monitoring) - Monitor AI provider health
