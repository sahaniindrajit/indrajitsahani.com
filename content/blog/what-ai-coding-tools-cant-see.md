---
title: "Your AI Agent Is Debugging Blind"
slug: "what-ai-coding-tools-cant-see"
date: "2026-11-17"
excerpt: "You can't give your AI agent the keys to production, but it can't debug what it can't see. Here's the middle ground I use: Grafana plus its MCP server, read-only."
tags: ["ai", "observability", "grafana", "mcp", "debugging"]
cover: "https://gvmq6ct92l.ufs.sh/f/XFW2MHvbFVvwG7L9Mz1Aw0Ezf9oJ87NDS3aspeIliM41bvgO"
---

Something breaks in production.

The uncomfortable part: a lot of the code running there wasn't written by you. AI wrote it. You reviewed it, tested it and shipped it. But when it breaks at 2 a.m., you don't know it the way you'd know code you typed line by line.

So the obvious move is to ask the AI. It wrote the code, so it should be able to debug it.

Except your AI agent can't see production. And you probably shouldn't hand it the keys either. One wrong command from an agent with prod access, and now you have two incidents instead of one.

So how do you debug a system you didn't fully write, with an assistant that can't look at it?

For a long time, my answer was copy and paste. I'd SSH into the server, find the right log file, grep for the error, and copy the lines that looked important into Claude, along with a description of a graph I had open in another tab.

Claude would read it carefully and give me a confident answer. It was a guess. I had shown it a handful of lines out of thousands and asked it to understand the whole system.

This post is about the middle ground I found: giving my AI agent a read-only view of production. It can investigate everything. It can change nothing.

![Three ways to debug production with AI: no access, full prod access, and read-only access through Grafana MCP](https://gvmq6ct92l.ufs.sh/f/XFW2MHvbFVvwB5maHa38cPkTvmMK3gEdtrYVjpL4bWulQ0eJ)

## The code was never the problem

Anthropic released Claude Fable 5.2 last week, better at coding again according to SD Times. But the production problems that ate my time this year were almost never in the code.

One was a deploy that worked on my laptop and failed on the server. The cause had nothing to do with the code. The build image was running a different Node version than my machine. Two lines fixed it:

```toml
[phases.setup]
nixPkgs = ["nodejs_20"]
```

Another was Redis suddenly refusing writes with an error that started with `MISCONF Redis is configured to save RDB snapshots`. A background save had failed, and by default Redis stops accepting writes when that happens. Finding out why meant checking the server itself: its disk, its permissions, its logs. None of that lives in the repo.

No model reading my repo could have found either one. The answer was on a machine the AI had never seen.

So a smarter model wasn't going to help. What the AI needed was what I needed: a way to see production without digging for it.

![Before: SSH into the server, dig through logs, paste into chat. After: Grafana, Grafana MCP, AI queries it itself](https://gvmq6ct92l.ufs.sh/f/XFW2MHvbFVvwsehHJ5TbQhfc2AqviTomdezs43aW9uFG8Lrl)

## First, I had to fix it for myself

Before the AI could see anything, I had to stop SSH-ing into servers just to read a log.

We set up Grafana and moved logs, metrics and dashboards into one place. Instead of hopping between servers, I open one screen, pick a time range and see what happened.

If you're starting from nothing, I'd begin with two things:

- **Host metrics.** CPU, memory and disk. Disk alone would have warned me about the Redis problem before it blocked writes.
- **Logs with a service name on every line.** So you can filter to one service in seconds instead of guessing which file to open.

My rule now: if a signal isn't in Grafana, assume nobody will find it at 2 a.m. That used to mean a person. Now it also means an AI.

## Then I gave the AI a read-only view

This is the part that changed how I debug.

Grafana Labs maintains an open-source MCP server, `mcp-grafana`. MCP is how AI tools call external tools, and this server lets an AI agent search dashboards, query Prometheus metrics, query Loki logs, read alert rules and check incidents.

Setup takes a service account token and a few lines of config. This is the Claude Desktop config from Grafana's docs, with one flag added to make it read-only:

```json
{
  "mcpServers": {
    "grafana": {
      "command": "mcp-grafana",
      "args": ["--disable-write"],
      "env": {
        "GRAFANA_URL": "https://grafana.example.com",
        "GRAFANA_SERVICE_ACCOUNT_TOKEN": "<your-token>"
      }
    }
  }
}
```

If you use Claude Code, it's one command:

```bash
claude mcp add grafana \
  -e GRAFANA_URL=https://grafana.example.com \
  -e GRAFANA_SERVICE_ACCOUNT_TOKEN=<your-token> \
  -- mcp-grafana --disable-write
```

For the token, I'd create a separate service account with the Viewer role. The AI gets its own identity, and it can't edit a dashboard or an alert even if it tries.

## What debugging looks like now

The SSH, grep and paste loop is gone. I ask a question instead:

> Errors went up in the last hour. Find out why.

![The AI agent searches dashboards, queries Prometheus, pulls Loki logs, then returns a theory with graphs](https://gvmq6ct92l.ufs.sh/f/XFW2MHvbFVvwv5QB2clIXHkfcaRidUljhZGNm6wy7PA5oQJv)

The agent finds the dashboard for the affected service. It checks the error rate around the spike. It pulls the logs from the same time window. Then it comes back with a theory and the graphs that support it.

It isn't perfect. Sometimes it picks the wrong label, time range or service, so I open every graph it quotes before I believe it. But it usually gathers the evidence I would have looked at anyway, just faster.

## A few rules I don't break

- **Read-only, always.** `--disable-write` plus a Viewer-role token. An investigation should never change anything.
- **Verify before acting.** Treat its theory as a starting point and check it against the graphs.
- **Keep the token out of git.** It lives in the local MCP config or a secrets manager.
- **Ask about a narrow time range.** "The last hour" gets sharper answers than "this week".

## What I'd tell you to do first

You don't have to choose between an AI agent that's blind and one with the keys to production. Give it eyes. Keep the hands for yourself.

Get your logs and metrics into one place. Then connect your AI agent to it, read-only. Of everything I changed about how I debug this year, that's the one I'd recommend first.

Give your AI access first. Then worry about which model.
