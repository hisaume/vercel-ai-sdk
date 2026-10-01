# Vercel AI Tests / OpenAI Agents SDK

## Setup

Provide your own `OPENAI_API_KEY` in `.env` file, then:

```bash
source scripts/setenv
```

## Vercel AI SDK

Then run:

```bash
node index.ts
```

## OpenAI Agents SDK

```bash
node index.openai.ts
```

## Miscellaneous

### Provider Comparison

| OpenAI Agents SDK      | Vercel AI SDK                |
| ---------------------- | ---------------------------- |
| `Agent`                | `ToolLoopAgent`              |
| `tool({ parameters })` | `tool({ inputSchema })`      |
| `tools: [tool]`        | `tools: { toolName: tool }`  |
| `run(agent, prompt)`   | `agent.generate({ prompt })` |
| `result.finalOutput`   | `result.text`                |
| Run history            | `result.steps`               |
