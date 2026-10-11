---
sidebar_position: 3
description: The AI step of an Anaphora capture flow - one model answer that fills several variables, looks at earlier runs, does exact math and keeps a notebook between runs.
keywords: [ AI step, Anaphora AI, LLM capture action, AI notebook, AI guardrails, AI assistant, AI trace ]
---

# The AI step

The **AI step** of a capture flow asks an AI provider about what the flow captured. One answer can fill several
variables, each with its type. When it needs to, the AI can also look at the earlier runs of the job, do exact math,
read the captured pages, and keep a notebook from one run to the next. The step stays a normal capture action: a
**Conditional block**, a **Break** and the delivery act on the variables it fills, as on any other variable. The AI
fills variables and its notebook. It never sends, clicks or stops anything.

One request to the model, with its answer, is a **model call**. A step with no tool makes one model call. A step with
tools makes more: each time the AI uses a tool, the next model call sends the result back to it.

:::note Before you start
The AI step needs an AI provider in the space: see [AI providers](../administration/ai-providers.md). The model calls
of the step, of its trials and of the assistant all count on the token budget of that provider.
:::

## Add an AI step

1. Open the job, then the **Capture** tab, and switch on **Advanced**.
2. Click the **+** between two actions, and choose **AI step** ("A model reads the captures and fills variables"). Put
   the step after the actions that capture what the AI must read.

The step opens in its own page. On the left, **All actions** goes back to the flow, and the list under it opens another
action. A new step starts with three short screens. A step that exists opens in the editor. On the **Jobs** list, a
robot mark shows the jobs that have an AI step.

## The first time: Describe, Review, Try

1. **Describe.** Under **What should this step do?**, say in your words what the step looks at, what it decides and
   what it writes. Or click a starting point: **Summarise the pages**, **Decide whether to page**, **Pull a number out
   of a page** or **Write a report section**. The line under them names the provider that the assistant uses, what a
   draft costs (for example "A draft costs about 15,000 tokens."), and what the assistant sees: the names of your
   earlier actions, and the values of the last run or of your last Test capture. Click **Continue**: the assistant
   writes the step from your words.

   ![The Describe screen: the field "What should this step do?", four starting points, "Set it up by hand instead" and Continue](images/ai-step-describe.png)

2. **Review.** **Here is the plan** lists, with check marks, what the step fills in, what it sees, what it does, what
   it remembers and when it stops. **In its words** is the summary of the assistant.
   - **Show the instructions it wrote, and why each choice** shows the instructions and the changes of the assistant.
     Each change has **Undo**: see [The assistant](#the-assistant).
   - When the flow lacks something the plan needs, a card says what. For example, no snapshot comes before the step:
     **Something to add to the flow**, where **Add it** puts a **Navigate** with a snapshot before the step, and **I
     have one** sets the card aside. Or the report must go out only in some runs: **A Conditional block and a Break
     after this step**, for example "The run stops when page_now is not 1.", where **Add them** puts the block and its
     **Break** after the step. See [The assistant](#the-assistant).
   - To change the plan, write in **Change something, in your words** and click **Send**. The line under the field
     says what an answer costs.
   - **Discard** removes the new step and what the assistant wrote for it.

   The footer says what the draft cost, for example "This draft: 13,311 tokens. Nothing is saved until you save the
   job." Then click **Try it**. The step runs on the values of the last run of the job, else on your last Test capture.
   When **Try it** is off, its tooltip says why. With no run and no Test capture, click **Run a Test capture of the
   actions before it** first.

   ![The Review screen: the plan in five sentences, the assistant's words, one thing to check, and the Try it button](images/ai-step-review.png)

3. **Try.** The step runs once on those values. The screen shows the status, the values it filled in, **Why, in its
   words**, the tokens, and what the step costs in a week at the schedule of the job. **See every model call** and
   **What the model gets** open the details (see [Try it](#try-it)). To change something, write in **Not what you
   wanted? Say what to change**, or click **Try again**. After a trial that failed, **Try again** is under the error.
   **Done** opens the editor in the simple view. **Adjust by hand** opens it with **Advanced** on.

   ![The Try screen: Success, severity 7 and page_now Yes, the AI's reasons, the cost of a week, and Done](images/ai-step-try.png)

**Set it up by hand instead**, on the first screen, skips the assistant and opens the editor with the defaults. When the
space has no AI provider, the first screen says so and links to **AI Providers**.

Nothing is saved until you save the job. **Done** does not save it. When you click a link in the app and the job has
changes that are not saved, Anaphora asks **Leave without saving?**: **Stay** keeps the page, **Leave** drops the
changes. A reload or a closed tab gets the question of the browser. A link that you open in a new tab is not asked
about.

## The editor

![The AI step editor: the actions of the flow on the left, the step in the middle, and the assistant and the last trial on the right](images/ai-step-editor.png)

The step is in the middle. The panel on the right holds the **Assistant** and the **Trial**. On a narrow screen, the
panel goes under the step, and a trial that starts or ends comes into view. Click the title to rename the step.

### The simple view

- **Provider**: the AI provider of the step. A step whose provider is not in the space shows "A provider that is gone:
  choose one".
- **Instructions**: what the AI must do, in your words. Name the variables, and say what a good answer looks like.
  **Improve with the assistant** asks the assistant to make them clearer.
- **Fills in**: the variables that the step fills, for example `severity · number`. **Edit** opens the table: the
  **Name**, **Type** and **What it means** of each variable, **Add variable**, and a bin to remove one.
- **It can**: one line per ability that is on, each with a switch. **+ More abilities** opens a menu with the
  abilities that are off, and with **Browse**, **Fetch from the web** and **MCP servers**, which are not available yet.
- A grey line that says when the step stops, and who set the limits. For example:
  - "Stops after 8 model calls or 29,000 tokens. Anaphora sets these limits from the step. Change them in Guardrails."
    for a step with a tool;
  - "Stops after one answer, or at 8,000 tokens. Anaphora sets these limits from the step. Change them in
    Guardrails." for a step with no tool;
  - "… You set them in Guardrails." when you set a limit yourself;
  - "No limit (a step set up as before has none)." for a step set up before the AI step existed.

  See [Guardrails](#guardrails).
- **Done** goes back to the flow. **Try it** runs the step once: see [Try it](#try-it). When there are no values to try
  on, "Run a Test capture first." and the button **Run a Test capture of the actions before it** show next to it.

#### Fills in

With one variable of type text, number or HTML, and no **What it means**, the step works as the AI action always did:
the answer text goes into that variable. With two or more variables, a **yes/no**, or a **What it means**, the AI fills
them all in one JSON answer and gives its reasons too. From then on, the step keeps this kind of answer, also with one
row. You read the reasons in the trial and on the Runs page. They never go into a variable or into the report.

| Type       | What the AI gives                           |
|------------|---------------------------------------------|
| **text**   | Text                                        |
| **number** | A number                                    |
| **yes/no** | Yes or no, stored as `1` (yes) or `0` (no) |
| **HTML**   | An HTML fragment for the report             |

A name follows the rules of any variable name, and is unique in the job. The name `reasoning` is not available.

**What it means** goes to the AI with the name. Say the range and what each value means, for example
`0 to 10. 7 and above: page someone now.` For a **yes/no**, say in words when the answer is yes, not `1` and `0`: the
model answers yes or no, and Anaphora stores it as `1` or `0`.

When the answer is not valid JSON, the step makes one more model call: the AI gets its answer back and corrects it.
That call counts on the provider budget and under the [guardrails](#guardrails). When the step is at its model call
limit or at its token cap, it makes no such call. When the answer is still not valid JSON, the step fails with "The AI
step failed: the answer is not valid JSON." **Details**, under the status, shows the answer as the model wrote it.

:::tip A yes/no in a Conditional block
A **yes/no** variable holds `1` for yes and `0` for no. To act on it, compare it with `1`. For example, a
**Conditional block** with **Variable** `page_now`, **Condition operation** **not equals** and **Condition value** `1`,
with a **Break** inside, stops the run when the answer is no. In the report, write `{% if page_now == 1 %}`.
:::

#### It can

| Line                      | What it does                                                                                                                                                                         | What it costs                                                    |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| **See …**                 | Names the snapshots and variables that the step sees, and how: "everything so far", "only the ticked rows", or "reads a snapshot only when needed". **Change** opens **Can see**. | What is sent at the start goes again with each model call        |
| **Look at earlier runs**  | Reads the values of earlier runs of this job. The line names the variables and the number of runs.                                                                                 | Each use takes one more model call                               |
| **Do exact math**         | Calculates an expression with the engine of the **Calculate** action, so the AI does not guess the result.                                                                         | Each use takes one more model call                               |
| **Remember between runs** | Keeps a notebook for the job. The line gives its size; **read it** opens **Remembers**.                                                                                            | The notebook goes with each model call                           |
| **+ More abilities**      | The abilities that are off. **Browse**, **Fetch from the web** and **MCP servers** show too, but they are not available yet.                                                       |                                                                  |

Each model call sends the whole conversation again. That is why a step with tools costs more than one model call.

### Advanced

Switch on **Advanced** to see every setting. The line under the title says "Advanced on · Every section, with all its
settings", and **Back to the simple view** switches back. **Fills in** shows its table, and four sections open under
it. Each section says in one line what it is set to, also when it is closed.

#### Can see

![Can see: the three modes, the rows errorsNow and the errors page, the box "Sent at the start: about 661 tokens", and the images box](images/ai-step-can-see.png)

What the AI gets of the earlier snapshots and variables. Three modes:

- **Everything so far**: every earlier snapshot and variable, minus the rows you untick. Anything you add to the job
  later is sent too. This is the default.
- **Only ticked rows**: only the rows you tick. Anything you add later stays out until you tick it.
- **The AI chooses**: the AI gets the names and sizes of the ticked rows, and reads the ones it needs. Anything you add
  later is offered too. In this mode the AI reads the text of the pages, never images. Use it when the step sees large
  snapshots that it does not always need.

The header of the rows says how many rows go, for example "Rows sent: 2 of 3". In **The AI chooses** mode it says
"Rows offered: 2 of 3". Closed, the section says it in one sentence, for example "Sends 2 ticked rows." or "Offers 3
rows. The AI reads the ones it needs."

Each row shows its value and its size, for example "about 661 tokens". The values come from the newest Test capture of
this page, else from the Test capture kept for the job. A snapshot row has **Show the page text**. It opens **Page text
of …**: the text that the model reads, with its size. With no Test capture, it says "No page text yet. Run a Test
capture."

The page text is the text of the page as compact lines: one element a line, a link once with its address, at most
50,000 characters a snapshot. A step set up before the AI step existed sends the page text as it always did.

The box under the rows gives the size in tokens: **Sent at the start** and, in **The AI chooses** mode, **If the AI reads
every row once**. A row that the AI reads in model call 1 is paid again in each later model call. **Guardrails** shows
the real total of the last trial.

**Send the snapshots as images** also sends the snapshots as pictures. Each image costs tokens, on every run. The box is
off when the model does not read images, or when Anaphora does not know yet. The line under the box says why, for
example "Anaphora does not know yet whether this model reads images. Run the provider's Test." See
[What this model can do](../administration/ai-providers.md#what-this-model-can-do).

#### Can do

![Can do: Stays in Anaphora with Read capture data, Look at earlier runs and Do exact math; Reaches out with Browse, Fetch from the web and MCP servers, not available yet](images/ai-step-can-do.png)

The tools of the step, in two groups.

**Stays in Anaphora** (reads only this job):

- **Read capture data**: reads one row of this run. Its switch follows **Can see**: it is on when **Can see** is set
  to **The AI chooses**.
- **Look at earlier runs**: the values of earlier scheduled, manual and test runs of this job. Choose the **Variables it
  reads**, and how many runs, from 1 to 50. By default, it reads the variables that **Can see** sends, and the ones this
  step fills. A run never reads from earlier runs a variable that **Can see** does not send. When you choose one, the
  section names it, for example "Can see does not send errorsNow, so the step does not read it from earlier runs."
- **Do exact math**: exact math on an expression, with the engine of the **Calculate** action.

**Reaches out** (sends data out): **Browse**, **Fetch from the web** and **MCP servers**. These are not available yet.

Each variable in **Variables it reads** must be a variable of the flow. When you rename or remove one, the job cannot
be saved until you remove it from the list too.

#### Remembers

![Remembers: This job's notebook, What to keep, Longest notebook 4000 characters, and the notebook now with Edit, History and Clear](images/ai-step-remembers.png)

- **Nothing**: each run starts from nothing. This is the default.
- **This job's notebook**: one text for the job, shared by all its AI steps. In each run, the AI can read it and replace
  it.
- **A shared notebook**: not available yet.

**What to keep** tells the AI what to write in the notebook, for example "The incidents still open, with when they
started and the last severity." **Longest notebook** is the limit in characters, 4,000 by default. The AI cannot save a
longer text: Anaphora refuses it and tells the AI the limit.

When the job is saved, **The notebook now** shows the text, its size, and when it changed and by whom: "by the run of
19:57", a link to the runs of the job, or "by a person".

- **Edit** changes the text. Its **Save** stores the notebook at once, not with the job.
- **History** lists the last 50 versions, each by a run or by a person.
- **Clear** empties the notebook. **History** keeps the text.

A run saves the notebook when the step ends, and only when the step succeeds or stops with **Keep what is filled in and
go on**. Trials and Test captures read the notebook but never write it. A copy of the job, and a job made from a
template, start with an empty notebook.

#### Guardrails

![Guardrails: the limits, "When a limit is reached", and "What this step costs" with a budget at 112%](images/ai-step-guardrails.png)

Limits on one run of the step, on top of the provider budget. An empty field shows in grey the value that applies,
set from the step. Type a number to set your own.

| Field                      | Limit                                                    | When empty                                                                                                                                                                                   |
|----------------------------|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Most model calls**       | Model calls                                              | 1 when the step has no tool and gives one plain answer (one variable, no yes/no, no **What it means**), else 8                                                                               |
| **Most tool calls**        | Tool calls                                               | 12                                                                                                                                                                                           |
| **Token cap for the step** | Tokens of all the model calls together, input and output | The size of what the model gets (in **The AI chooses** mode, plus every row read once) times one more than **Most model calls**, at least 8,000, at most 2,000,000, rounded up to a thousand |
| **Time limit**             | Seconds for the whole step                               | 60 with no tool, 90 with one. A step set up as before has no time limit                                                                                                                      |
| **Answer length cap**      | Tokens of one answer                                     | The default of the provider                                                                                                                                                                  |

The token cap is checked between model calls. A model call that starts under the cap ends, so a run can go over the
cap by the size of its last model call.

A step set up before the AI step existed (no **Fills in** table, no tool, no limit set) gets no limit at all: one model
call, no time limit and no token cap, as before. Its fields show **No limit**, and **Most model calls** shows 1. When
you set one field, every limit applies.

**When a limit is reached**:

- **Fail the run, with the limit in the message**: the default. The message names the limit and the model call, for
  example "Stopped after model call 5: 50,980 tokens, over the token cap of 40,000".
- **Keep what is filled in and go on**: the run keeps the variables that the AI filled so far, and goes on.

**What this step costs** uses the last trial: **One run** (model calls, tool calls, tokens, time), the **Schedule** of
the job in runs a week, **This step, a week**, and the budget of the provider, with a bar. When a week of this step does
not fit in the budget, a warning says so: when the budget is reached, every job of that provider pauses. Send less to
the model, run the job less often, or raise the budget. **Ask the assistant for a cheaper setup** asks the assistant for
help.

## Try it

**Try it** runs the step once, as a run does, and keeps nothing. It opens no page, it does not change the job, the
notebook or the variables, and it delivers nothing. Its tokens count on the provider budget.

Try it uses the values of the last run of the job. When the job has no run yet, it uses your last **Test capture**. The
line at the top of the **Assistant** panel says which, for example "Values of the run of Oct 10, 13:51". **Use the Test
capture instead** and **Use the run instead** switch between the two. The assistant and **What the model gets** use the
same values.

A trial that takes more than 10 minutes stops with "The server did not finish in time. Try again." **What the model
gets** stops the same way after 60 seconds.

A job that is not saved yet has no run, so Try it uses its Test capture. With no run and no Test capture, the button is
off and the editor says "Run a Test capture first." Click **Run a Test capture of the actions before it** to get the
values. A template cannot be tried: try the step in a job made from the template.

![The Trial panel: Success with 2 model calls, 1 tool call and 1,664 tokens; severity, page_now and briefing; the AI's reasons; and the cost of a week](images/ai-step-trial.png)

The **Trial** panel shows:

- the status: **Success**, a stop such as **Stopped at the token cap**, or **Error**, with the time, the model calls,
  the tool calls, the tokens and the duration, for example "2 model calls · 1 tool call · 1,664 tokens · 4.2 s". After
  an error, **Details** shows the answer as the model wrote it;
- the values it ran on, for example "On the values of the run of Oct 10, 13:51. No page was opened, and nothing was
  saved or delivered.";
- the value of each variable: a **yes/no** as Yes or No, and **HTML** as its text;
- **Why, in its words**: the reasons of the AI. After a stop, **The AI's last answer**;
- **See every model call** and **What the model gets**;
- the cost of a week at the schedule of the job, and its share of the provider budget, for example "At the job's
  schedule (every 15 minutes), this step costs about 1.1M tokens a week: 12% of the weekly budget of OpenAI." When the
  job is suspended, the line adds "The job is suspended now.";
- the notebook: what the trial would write, line by line, or "Not changed: the step wrote nothing new.";
- after a second trial, the previous trial in one line. **Compare** shows the two answers side by side, and marks each
  value that changed, or says "No change".

**See every model call** opens **Every model call of the trial**. Each model call shows what it did ("Asks for Do exact
math", "Answers"), its tokens and time. Open one to see the model request: its size and, for the first model call, the
estimate by part, for example "Instructions 306 · Fills in 136 · Can do 445 · Notebook 266"; the model response and how
it ended ("ended with an answer", "asked for tools"); and each tool call with its input and output. **Copy trace** and
**Raw JSON** are at the top. With two or more model calls, **Expand all** is there too.

![Every model call of the trial: model call 1 asks for Do exact math, with the request, the response and the tool call; model call 2 answers](images/ai-step-every-step.png)

**What the model gets** opens what the first model call sends: the system message, the user message, the JSON schema of
the answer (from **Fills in**), the tools it may call (from **Can do**), the tokens of each part, and **Not sent, and
why**. **Copy as text**, **View the messages as JSON** and **Copy the step as JSON** are at the end. Anaphora builds it
with the same code as a run, and calls no model: it spends no token. Before the first trial, the **Trial** panel links
to it too.

![What the model gets: the system message, the user message and the JSON schema of the answer](images/ai-step-what-the-model-gets.png)

## The assistant

![The assistant panel: a group of 5 changes with Show each and Undo all, a proposal for a new action, and one change after "No notebook, please"](images/ai-step-assistant.png)

The **Assistant** panel is above the trial. It works on the same values as **Try it**. Write a question or a change in
**Ask, or say what to change**, and click **Send**. The line under the field says what an answer costs, for example
"An answer costs about 25,200 tokens. It tries the step only when you ask. A trial adds its own tokens." After the
answer, "This answer: 24,945 tokens" says what it cost.

The assistant may change this step, and only this step: the title, the **Instructions**, **Fills in**, **Can see**, the
tools that stay in Anaphora, **Remembers** and **Guardrails**. Each change is a card with its reason, and goes into the
step at once.

- The changes of one answer are a group, for example "5 changes", with one line per change, such as "Instructions:
  adds “Page only for a new incident.”". **Show each** shows the cards. A change of **Instructions** shows the lines it
  added and removed.
- **Undo** on a card takes that change back. The card then says **Undone**. When you changed that field after the
  assistant, Anaphora asks first, for example "You changed Instructions after the assistant. Undo anyway?": **Keep
  mine** keeps your text, **Undo** takes the field back to what it was before the change.
- **Undo all** takes back every change of the group. When you changed some of its fields after the assistant, it asks
  once and names them: **Keep mine** takes back the other changes and keeps your fields, **Undo** takes back all. When
  you undid some of the changes already, the button is **Undo the rest**. When all are undone, the group says **All
  undone**.

Other things it only proposes, as a card for you to decide:

- **Something to add to the flow**, for example a snapshot before the step: **Add it** puts a **Navigate** with a
  snapshot before the step, and **I have one** sets the card aside.
- **A Conditional block and a Break after this step**, when the report must go out only in some runs. The card says
  when the run stops, for example "The run stops when page_now is not 1.". **Add them** puts the block and its **Break**
  after the step, and **Open the block** opens it. **Set aside** closes the card.
- **A tool that reaches out of Anaphora**: not available yet. **Set aside** closes the card.
- **Something to check** in another part of the flow: **Set aside** closes the card.

The assistant tries the step only when you ask for it, for example "try it" or "run a trial", and on the **Try** screen
of a new step. It tries at most three times in one answer. Each trial shows as one line with its answer and tokens, and
**Open** opens its model calls. It never saves the job. Its text shows with simple formatting, such as bold, lists and
code. Its links open only web addresses.

Its tokens count on the provider budget, like a trial. One answer stops at 12 model calls, 60,000 tokens or 120
seconds. The answer then says which limit stopped it, and the changes so far stay. A fourth trial in one answer is
refused, and the answer goes on. When the server does not answer in time, the panel says "The assistant did not answer
in time. Send your message again."

The conversation and the trials of a step stay while you switch the tabs of the job, and after you create the job. A
reload of the page forgets them.

### Explain this trial

At the end of **Every model call of the trial**, **Explain this trial** asks the assistant why the step did what it did.
Next to the button, a line says what an explanation costs, for example "An explanation costs about 5,800 tokens." An
explanation is one model call with no tool: the assistant reads a short summary of the trial in words, and changes
nothing.

The answer comes under **Explained by the assistant**, with suggestions. **Apply** puts a suggestion into the step, and
**Undo** takes it back. A proposal for the flow comes as a card, as in the panel. With nothing to change, it says "The
assistant suggests no change." **Ask again** asks once more. "This answer: N tokens" says what it cost.

![Explained by the assistant: why the step rated 7, a suggestion for the guardrails with Apply, and Ask again](images/ai-step-explain.png)

On the Runs page, the same button is **Explain this run**. There, a suggestion has **Open the step** instead of
**Apply**: open the step, then make the change in the editor. **Explain this run** and **Open the step** need write
access to the space.

## Runs

![The Runs page with the AI column: the tokens and the model calls of each run](images/ai-step-runs-column.png)

The **AI** column of the **Runs** page says what the AI steps of each run cost, for example "1.1k tokens · 2 model
calls". Click its header to sort the runs by the tokens of their AI steps. When a limit stops a step, the column names
the limit in yellow, for example "Token cap · 5 model calls". When a step fails, it shows "AI error" in red. A run with
no AI step shows "no AI".

Click the cell to open the **AI trace** of the run. It has the same content as a trial: the status, **Why, in its
words**, the variables, the notebook, and every model call. It also has **Compare** with the previous run of the job,
**Explain this run**, and **Open the step**, which opens the step in the editor.

![The AI trace of a run: Success, the AI's reasons, the variables, the notebook, and the two model calls](images/ai-step-trace-popup.png)

A **Test capture** runs the AI steps too. Its result has an **AI** tab with the same trace for each AI step. When the
Test capture fails, there is no **AI** tab: the traces of the AI steps show under the error.

![The AI tab of a Test capture: the step "Rate the errors" with its status, variables, reasons and model calls](images/ai-step-test-capture.png)

### When a step stops at a limit

1. Open the trace from the **AI** column. The status names the limit, and **The AI's last answer** shows where the AI
   was.
2. Click **Open the step**, then open **Guardrails**.
3. Do one of these:
   - Raise the limit that stopped the step.
   - Send less: **Only ticked rows**, or **The AI chooses** for large snapshots. Switch off a tool that the step does
     not need.
   - Choose **Keep what is filled in and go on**, when a part of the answer is enough.
   - Click **Explain this run**, and let the assistant suggest a change.
4. Click **Try it** to check the change, then save the job.

## Costs and limits

- An AI step costs tokens: what each model call sends, and its answer. Each model call sends the whole conversation
  again, so a step with tools costs more than a single model call. Costs show in tokens, not in money.
- The provider budget applies on top of the guardrails. When a run reaches it, the job pauses, and every further model
  call on that provider is refused until the window rolls over. See
  [Token budgets](../administration/ai-providers.md#token-budgets).
- Trials, Test captures and the assistant count on the same budget. They never pause a job: the budget refuses their
  next model call. The provider list splits the tokens by what spent them.
- The guardrails that you leave empty come from the step: see [Guardrails](#guardrails). The grey line under **It can**
  shows them.
- A step set up as before, with one variable and no tool, sends what it always sent.
- The values that the editor sends for a trial, a Preview or the assistant can be up to 8 MB. When they are larger
  with the images, the editor sends the snapshots as page text only, and the **Assistant** panel says so. When they are
  still too large, the editor says "The Test capture is over 8 MB as page text. Untick snapshots under Can see, or
  capture smaller pages."

## For AI agents and scripts

An AI agent or a script can set up, try and read AI steps through the JSON API of your instance, described at its
`/llms.txt`: see [API for AI agents](../administration/agent-api.md).
