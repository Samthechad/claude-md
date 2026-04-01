<div align="center">

```
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗    ███╗   ███╗██████╗ 
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ████╗ ████║██╔══██╗
██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██╔████╔██║██║  ██║
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║╚██╔╝██║██║  ██║
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ██║ ╚═╝ ██║██████╔╝
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═════╝ 
```

### Auto-generate `CLAUDE.md` for any project using Claude AI

[![npm version](https://img.shields.io/npm/v/claude-md?color=FF6B2B&labelColor=000&style=flat-square)](https://npmjs.com/package/claude-md)
[![npm downloads](https://img.shields.io/npm/dm/claude-md?color=FF6B2B&labelColor=000&style=flat-square)](https://npmjs.com/package/claude-md)
[![license](https://img.shields.io/npm/l/claude-md?color=FF6B2B&labelColor=000&style=flat-square)](./LICENSE)
[![by](https://img.shields.io/badge/by-%40sam__the__chad-FF6B2B?labelColor=000&style=flat-square)](https://github.com/sam-the-chad)

**One command. Any project. No config.**

</div>

---

## Install

**Run without installing (recommended):**
```bash
npx claude-md init
```

**Or install globally:**
```bash
npm install -g claude-md
npm i -g claude-md
```

**Then use anywhere:**
```bash
claude-md init
claude-md init ./my-project
```

---

## What is CLAUDE.md?

`CLAUDE.md` is the most important file in any [Claude Code](https://claude.ai/code) project. It gives Claude persistent memory — your stack, your conventions, your rules — loaded automatically at the start of every session.

**Without it:** Claude guesses your stack, forgets your conventions, asks the same questions every session.

**With a good one:** Claude knows your project cold from line one.

The problem is writing it by hand takes 30+ minutes and most developers skip it entirely. Anthropic's own documentation warns:

> *"Bloated CLAUDE.md files cause Claude to ignore your actual instructions."*

`claude-md` fixes this. It scans your project, detects your stack, and uses Claude AI to generate a tight, accurate `CLAUDE.md` in under 10 seconds.

---

## How it works

```
npx claude-md init
```

```
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗    ███╗   ███╗██████╗ 
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ████╗ ████║██╔══██╗
██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██╔████╔██║██║  ██║
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║╚██╔╝██║██║  ██║
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ██║ ╚═╝ ██║██████╔╝
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═════╝ 
...

  Auto-generate CLAUDE.md for your project using Claude AI
  v1.0.0  ·  by @sam_the_chad  ·  npmjs.com/package/claude-md

  ──────────────────────────────────────────────────────────────────

  Enter your Anthropic API key: sk-ant-...       ← first run only, stored locally
  Key saved to ~/.claude-md/config.json ✓

  Scanning project...                            ✓
  Detected: Next.js · TypeScript · Tailwind · PostgreSQL · Prisma

  Generating CLAUDE.md via Claude API...         ✓

  ✓ CLAUDE.md written → /your-project/CLAUDE.md

  Tip: Review and trim it. Shorter CLAUDE.md = better Claude behavior.

  ──────────────────────────────────────────────────────────────────
```

---

## All commands

```bash
# Generate CLAUDE.md in current directory
npx claude-md init

# Generate for a specific project path
npx claude-md init ./my-project

# Regenerate and overwrite (backs up old one automatically)
npx claude-md init --force

# Reset your saved API key
npx claude-md reset-key

# If installed globally
claude-md init
claude-md init ./my-project
claude-md init --force
claude-md reset-key
```

---

## Stack detection — 30+ technologies

`claude-md` reads your `package.json`, `tsconfig.json`, `requirements.txt`, `pyproject.toml`, and folder structure. No config needed.

| Category | Auto-detected |
|---|---|
| **Frontend** | Next.js, React, Vue, Svelte, Astro, Nuxt |
| **Styling** | Tailwind CSS, shadcn/ui, Styled Components |
| **Backend** | FastAPI, Django, Flask, Express, Hono, tRPC, GraphQL |
| **Database / ORM** | Prisma, Drizzle, PostgreSQL, MongoDB, SQLite |
| **Auth** | NextAuth, Clerk |
| **Infrastructure** | Upstash Redis, Redis, Stripe, Resend, Twilio |
| **AI** | Anthropic Claude API |
| **Language** | TypeScript, Python |

Missing your stack? [Add it in one line →](./src/scanner.js)

---

## Why the output is actually good

Most auto-generators dump everything into a single file. `claude-md` uses Claude to write Claude instructions — which means it knows exactly what Claude Code responds to, what format holds attention, and what to cut.

Every generated `CLAUDE.md` is:

- **Under 200 lines** — Anthropic recommends keeping it short. Claude reads all of it.
- **Stack-specific** — no generic filler, only what applies to your exact project
- **Production-ready** — covers dev commands, code conventions, architecture notes, and rules Claude must follow
- **Backed up automatically** — if a `CLAUDE.md` already exists, it saves `CLAUDE.md.backup` before overwriting

---

## API key security

On first run you enter your Anthropic API key once. It is saved to `~/.claude-md/config.json` on **your machine only**. It travels directly from your terminal to Anthropic's API. `claude-md` never sees it, stores it remotely, or logs it anywhere.

Get your API key at [console.anthropic.com](https://console.anthropic.com).

To remove your saved key at any time:
```bash
npx claude-md reset-key
```

---

## Requirements

- Node.js 18 or higher
- An Anthropic API key ([get one free](https://console.anthropic.com))
- A project with at least one of: `package.json`, `requirements.txt`, `pyproject.toml`

---

## Contributing

Open source, MIT licensed. PRs welcome.

Adding a new framework detector is one line in `src/scanner.js`:

```js
'Your Framework': p => hasPackage(p, 'your-package-name'),
```

```bash
git clone https://github.com/sam-the-chad/claude-md
cd claude-md
npm install
node bin/index.js init ./test-project
```

Open an issue, submit a PR, or suggest a framework to add.

---

## License

MIT © [@sam_the_chad](https://github.com/sam-the-chad)

---

<div align="center">
<sub>Built for the Claude Code ecosystem · <a href="https://github.com/sam-the-chad/claude-md">Star it on GitHub ⭐</a> if it saved you time</sub>
</div>