---
sidebar_position: 3
description: Use AI to aggregate, summarize, and deliver curated content from multiple sources with Anaphora.
keywords: [ AI summarization, news aggregation, content curation, LLM reports, Anaphora AI ]
---

# AI News Collation

Use AI to aggregate, summarize, and deliver curated content.

## Goal

Create a daily digest that collects articles from multiple sources and provides AI-generated summaries.

## Use Cases

- Industry news digests
- Competitive intelligence reports
- Research paper summaries
- Social media monitoring summaries

## Steps

### 1. Create the Job

1. Navigate to **Jobs**
2. Click **Create New Job**

### 2. Configure Capture

1. Enable **Advanced** mode
2. Add multiple **Navigate** actions for each source:
	- Ensure that **Take Snapshot** is checked
3. Add **AI** action to process captured content
	- Set prompt to:
		```
		Summarize the following articles into an executive summary, highlighting key trends and actionable insights
		```
	- Ensure that all context is included

### 4. Compose the Digest

1. Include the AI-generated summary
2. Add other text blocks as needed

### 5. Configure Delivery

- Add delivery interface and configure recipients
