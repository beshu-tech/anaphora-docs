---
sidebar_position: 3
description: Configure AI providers in Anaphora for intelligent report analysis - GPT-5.2, Claude 4.5, Grok 4, DeepSeek V3, Qwen3, Llama 4, and self-hosted options.
keywords: [ AI providers, GPT-5, Claude 4.5, Grok 4, DeepSeek V3, Qwen3, Llama 4, vLLM, LLM integration, AI analysis ]
---

# AI providers

An AI provider lets a job analyze report data, write text, and detect anomalies. Anaphora supports any provider that
implements the OpenAI-compatible API specification.

## Overview

With an AI provider, a job can:

- Summarize dashboard data and identify trends
- Flag unusual patterns or values
- Generate human-readable insights
- Add AI-written content to notifications

```mermaid
flowchart LR
    subgraph anaphora["Anaphora"]
        job["Job Run<br/>Captured data + context"]
    end

    subgraph providers["AI Providers"]
        api["OpenAI-Compatible API"]
        examples["OpenAI | Claude | Grok | DeepSeek | vLLM"]
    end

    job -- "Send data" --> api
    api -- "Analysis result" --> job
```

## Configuration

### Adding a provider

1. In the sidebar, click **AI Providers**
2. Click **Create AI Provider**
3. Configure the connection:

| Field        | Description                                           | Example                        |
|--------------|-------------------------------------------------------|--------------------------------|
| **Name**     | Identifier for this provider                          | `Production GPT-5`             |
| **Provider** | Type of AI provider                                   | `OpenAI`, `DeepSeek`, `Custom (OpenAI API compatible)` |
| **Endpoint** | OpenAI-compatible base URL (only for a custom provider) | `https://api.openai.com/v1`    |
| **API key**  | Authentication token                                  | `sk-...` (stored encrypted)    |
| **Model**    | Model to use: one of the list, or a name you type. The list needs the API key. | `gpt-5.2`     |

4. Click **Test**
5. Click **Save**

The **Model** field is a list that you can search. The note under it says "Pick a model of the list, or type the name
the vendor gives it. The list shows only models that chat." Embedding, rerank, speech, image and moderation models are
not in the list. A name that the list does not have shows as `Use "<name>"`: click it to use that name. A saved name
stays in the field, also when the list does not have it. The first model of the list goes in only when you change the
**Provider**, or, for a new provider, while the field still holds the default model.

![The Model field with deepseek/deepseek-v4-flash, and the note "Pick a model of the list, or type the name the vendor gives it. The list shows only models that chat."](images/ai-provider-model-field.png)

### What this model can do

**Test** opens the **Test the AI provider** window. Its prompt starts as "Say hello in five words or fewer." **Send test
prompt** sends your prompt and three small checks: a tool call, a JSON answer and an image. Under the prompt, the
window says "The Test makes four or five model calls: your prompt, a check of tools, one or two checks of JSON answers
and a check of images. Their tokens count on the budget of the provider." The JSON check first sends a JSON schema of
the answer (`json_schema`, strict), as an AI step with **Fills in** rows sends it. When that does not prove the schema
(the endpoint refuses it, the answer does not fit it, or the call fails), the check asks for a JSON object with no
schema: the fifth model call. The Test uses the key, the endpoint and the model of the form. The window shows the
answer, then **What this model can do**:

- **Answers a prompt**.
- **Uses tools**. An AI step with tools needs it: **Look at earlier runs**, **Do exact math**, **Remember between
  runs**, and **The AI chooses** mode.
- **Gives structured answers (JSON)**. When the answer is **No**, an AI step with several variables asks for JSON in its
  instructions, and reads the text. An AI step sends its JSON schema to the provider only when the Test proved the
  schema. A provider tested before this check must be tested again to get it. Until then, its AI steps send what they
  sent before. **What the model gets** of a step says how its request asks for the answer: see
  [Try it](../jobs/ai-step.md#try-it).
- **Reads images**. When the answer is **No**, **Send the snapshots as images** is off in the AI steps of this provider.

Under a **No**, a short line says why, for example "The endpoint refused an image."

When JSON answers work but the Test did not prove the schema, a line under **Gives structured answers (JSON)** says
why, for example "The call with the answer schema failed, so a step asks for a JSON object without it. The error is
under Details." The other reasons are "The endpoint refused the answer schema, …" and "The answer did not fit the answer
schema, …". The line shows only after a Test, in the window and on the card under the form. After a reload, the card
does not show it. The API gives it as `reasons.jsonSchema`. When the call with the schema fails, its error also goes
to the log of Anaphora.

The Test also records whether the model writes hidden reasoning. The window does not list it. Unless the Test saw
none, the token cap and the time limit that Anaphora sets for an AI step make room for it: see
[Guardrails](../jobs/ai-step.md#guardrails).

![The Test the AI provider window after a Test: the note "The Test makes four or five model calls", the answer "Hello!", then Answers a prompt, Uses tools, Gives structured answers (JSON) and Reads images: all Yes; under Gives structured answers (JSON), "The call with the answer schema failed, so a step asks for a JSON object without it. The error is under Details."; Details, closed; and "Saved with the provider."](images/ai-provider-test.png)

When the Test runs on the saved settings of the provider, it keeps the result: the window says "Saved with the
provider." Otherwise, it says "Save the provider to keep this result.": click **Save** to keep it. The card **What this
model can do** on the provider form shows the result and when the test ran. AI steps read it. A change of the provider
type, the model or the endpoint clears the result: click **Test** again after the change.

When the model does not answer the prompt, the Test fails. The window shows one sentence that says what to correct,
for example "The model did not answer. Correct the model or the endpoint, then send the test again." or "The provider
refused the API key. Correct the key, then send the test again." **Details** shows the error of the endpoint. A failed
Test lists no ability and keeps nothing: **Save** stores nothing from it.

![The card What this model can do after a reload: "Tested Today at 01:24.", and the four abilities Yes, with no line under Gives structured answers (JSON)](images/ai-provider-abilities.png)

:::note Free edition
The Free edition allows one AI provider per space.
:::

### Provider from the environment

The environment can own one provider: `AI_PROVIDER`, `AI_MODEL` and `AI_API_KEY`, plus `AI_ENDPOINT` for a custom
(OpenAI-compatible) service and `AI_NAME` for the name in the list. Anaphora creates the provider at the first start, in
the default space, and updates it at every start to match the environment. The token budgets you set in the UI do not change.
See [Installation](../getting-started/installation.md#ai-provider-from-the-environment).

### Copying a provider to another space

To copy or clone an AI provider into another space, you need admin access to the space it comes from.

### Provider inheritance

- Each Space can have its own AI provider configuration
- Jobs within a Space use that Space's configured provider
- Spaces without providers cannot use AI features

## Using AI in jobs

A job uses its AI provider through the **AI step** of an advanced capture flow. One answer can fill several typed
variables, look at earlier runs, do exact math, and keep a notebook between runs. See
[The AI step](../jobs/ai-step.md): every setting, **Try it**, the assistant, and the traces on the Runs page.

### A number in a condition

A **Conditional block** can test a **number** variable of an AI step. With one variable, the answer of the model
must be a bare number, or hold exactly one number, for example `Severity: 7` or `7/10`. Any other answer fails the run
with the error `The AI answer is not a number`. This way, the job never takes a branch on an answer that nobody can
read. Ask the model for one number only, and set a small **Answer length cap**. With several variables, the model answers
one JSON object, and Anaphora checks each variable: a wrong value fails the step and names the variable. An answer that
is not valid JSON gets one more model call to correct it: see [Fills in](../jobs/ai-step.md#fills-in). A **yes/no**
variable holds `1` or `0`. A **Conditional block** on it offers **is Yes** and **is No**.

### The Kibana AI Triage template

The **Kibana AI Triage** template builds a job that asks an AI provider whether a human must look at the errors now.
Pick it under **Jobs → Create Job**. It needs an AI provider in the space. It is an advanced template, so the Free
edition does not have it. Every 15 minutes, the job:

1. Counts the HTTP 5xx errors of the last hour and of the hour before, in Kibana Discover.
2. Counts all the requests of the last hour.
3. Takes a snapshot of the overview dashboard.
4. Asks the AI provider for a severity from 0 to 10. The prompt gives the rules that an on-call engineer applies: more
   errors with more traffic is load, not a failure, and a source that sends nothing is a 7.
5. Stops when the severity is below 7. Nobody is notified.
6. At 7 and above, asks the AI provider for a short briefing, which goes in the report with the counts and the
   dashboard.

The job sends the report at most once every 3 hours. When the space has exactly one AI provider, the new job uses it.
With more than one, select the **Provider** in each AI step. With none, add an AI provider to the space first. The
template uses the public Kibana demo: change the URLs to your own Kibana.

The [AI Triage](../advanced-examples/ai-triage.md) example builds the same job with one AI step. It looks at the earlier
runs instead of capturing the hour before, and its notebook replaces the throttle.

## Token budgets

Every AI provider shows the tokens it spent in the last 24 hours and in the last 7 days (the **Tokens 24h** and
**Tokens 7d** columns). You can give each window a budget. The windows roll: "the last 24 hours" is not "since midnight".

![The AI Providers list with one provider, Deepseek (Beshu): Tokens 24h 1.2M, 79% of a budget of 1.5M, with a yellow bar; and Tokens 7d 2.2M, 44% of 5M, with a green bar](images/ai-budget-providers-list.png)

Usage counts every model call: scheduled and manual runs (a retry counts as a scheduled run), test runs, Test captures,
trials of AI steps (**Try it**), the AI step assistant and the **Test** button on the provider form. The tooltip of each
column splits the tokens and the calls by these kinds. Trials made before this split count as Test captures: the
tooltip names that line "Test captures and earlier trials". Some
OpenAI-compatible services answer without usage data. Those calls count as zero, and the tooltip of the column says
that the total is a lower bound.

![The tooltip of the Tokens 24h column: 1,103,713 tokens in the last 24 hours and 143 AI calls, split in five lines: Scheduled and manual runs, Test captures and earlier trials, Trials, AI step assistant, and Provider Test](images/ai-budget-usage-tooltip.png)

### Setting a budget

1. Open the AI provider.
2. In the **Token budgets** card, tick **Daily**, **Weekly**, or both.
3. Enter the budget in thousands of tokens (`k tokens`).
4. Save.

When you tick a window, Anaphora proposes double your current spend in that window, and at least 500k tokens for a
day or 2,000k tokens for a week. This way, a new budget does not pause everything on the next call. The hint under each field
shows the spend and its share of the budget.

![The token budget card on the provider form](images/ai-budget-budget-card.png)

A weekly budget below the daily one is refused, because it can never apply. You can save a budget that is already used
up. The card then says what will happen.

![Validation on the budget card](images/ai-budget-validation.png)

### When a budget is reached

- The job that made the call is paused.
- Every further AI call on that provider is refused until the window rolls over or you raise the budget.
- A job that runs into a budget that another job used up is paused the same way.
- A test run, a Test capture, a trial, the assistant or the provider **Test** pauses no job: the budget refuses its
  next call. The assistant says so in
  its panel, and the changes it made before stay.
- The token columns turn green, yellow and red as the budget fills. A provider that reached its budget shows
  **Budget reached**.
- On the Jobs list, a paused job shows that an AI budget paused it, so you can tell it apart from a job that someone
  switched off.

![Jobs list with a job paused by a budget](images/ai-budget-jobs-paused.png)

### Resuming paused jobs

Raising the budget does not switch the paused jobs back on. On the AI Providers list, the **Paused jobs** column counts
the jobs that the budget paused. The column shows only when a budget paused a job. Click **Resume** to switch those jobs back on, and only those. The question names the
count, for example "Resume 1 job? It runs on its schedule again.", and the message after it says how many resumed:
"1 job resumed." When the budget is still reached, the next AI call pauses the job again.

![Resuming the jobs a budget paused](images/ai-budget-resume.png)

### Budget alerts

Tick **Notify the operator when a budget is reached** to send an alert over the channel of the health alerts. Tick
**Also warn early, at** to send a warning at a percentage of the budget too (80% by default). Each pause of a job sends
an alert that names the job. The early warning, and a "reached" alert with no job to pause (for example a Test capture), go out
at most once per window.

Choose the channel under **Settings** > **Application** > **Health Monitoring**. You can set it without switching
health monitoring on. Without a channel, jobs are still paused, but nothing is sent.

![The operator channel, editable with health monitoring off](images/ai-budget-operator-channel.png)

## Next steps

- [Spaces](./spaces): configure Space-level AI providers
- [The AI step](../jobs/ai-step.md): use the provider in a capture flow
- [Composer](../jobs/composer): add AI blocks to reports
- [Self-monitoring](./self-monitoring): monitor AI provider health
