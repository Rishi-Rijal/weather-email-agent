# learn-agent

A small TypeScript project demonstrating an OpenAI-powered agent with two tools:
- `get_weather` — fetches current weather from wttr.in
- `send_email` — sends emails via Nodemailer (Gmail)

**This repo is a minimal demo and uses environment variables for credentials — do not commit secrets.**

**Prerequisites**
- Node.js (>=18 recommended)
- npm
- An OpenAI API key (if you want the agent to actually call OpenAI services)
- A Gmail account and an App Password (if using Gmail with Nodemailer)

**Files of interest**
- `agent_tool.ts` — main agent and tools
- `package.json` — project config & dependencies

**Environment variables**
- `OPENAI_API_KEY` — your OpenAI API key (required for the agent to call OpenAI)
- `GMAIL_ID` — Gmail address used to send emails (e.g. `you@gmail.com`)
- `GMAIL_APP_PASSWORD` — Gmail app password (recommended) or SMTP password

Set these in your shell or in a `.env` file (the project loads `dotenv`):

```bash
# .env
OPENAI_API_KEY=sk-...
GMAIL_ID=you@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

**Install dependencies**

```bash
npm install
```

**Run the project**

This project is written in TypeScript. Recommended ways to run it during development:

- With `tsx` (no build step):

```bash
npx tsx agent_tool.ts
```

- With `ts-node`:

```bash
npx ts-node agent_tool.ts
```

- Or compile then run with Node:

```bash
npx tsc
node dist/agent_tool.js
```

