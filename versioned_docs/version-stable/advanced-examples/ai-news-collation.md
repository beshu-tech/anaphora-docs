---
sidebar_position: 3
description: Use AI to aggregate, summarize, and deliver curated content from multiple sources with Anaphora.
keywords: [AI summarization, news aggregation, content curation, LLM reports, Anaphora AI]
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

Name it: "Daily Industry Digest"

### 2. Configure Multi-Source Capture

```
# Source 1: Tech news site
Navigate → https://news.example.com/industry
Capture value → .article-titles → $headlines1

# Source 2: Blog aggregator
Navigate → https://blogs.example.com/feed
Capture value → .post-summaries → $headlines2

# Source 3: Reddit/HN
Navigate → https://reddit.com/r/industry
Capture value → .post-titles → $headlines3
```

### 3. AI Processing

Configure AI summarization in the composition phase:
- Combine captured content
- Generate executive summary
- Highlight key trends
- Create actionable insights

### 4. Compose the Digest

Structure your report:
1. AI-generated executive summary
2. Top stories by category
3. Trending topics
4. Full article links

### 5. Deliver

Send to subscribers via email with a clean, readable format.

## Tips

- Filter out duplicates across sources
- Set appropriate content length limits
- Include source attribution

## Next Steps

- [Branded Reports](./branded-reports) - Professional report styling
