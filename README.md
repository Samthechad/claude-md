<div align="center">

```
 ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗    ███╗   ███╗██████╗ 
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ████╗ ████║██╔══██╗
██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██╔████╔██║██║  ██║
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║╚██╔╝██║██║  ██║
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ██║ ╚═╝ ██║██████╔╝
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═════╝ 
```

**Auto-generate `CLAUDE.md` for any project using Claude AI.**

[![npm version](https://img.shields.io/npm/v/claude-md?color=FF6B2B&labelColor=000)](https://npmjs.com/package/claude-md)
[![npm downloads](https://img.shields.io/npm/dm/claude-md?color=FF6B2B&labelColor=000)](https://npmjs.com/package/claude-md)
[![license](https://img.shields.io/npm/l/claude-md?color=FF6B2B&labelColor=000)](./LICENSE)
[![made by](https://img.shields.io/badge/by-@sam__the__chad-FF6B2B?labelColor=000)](https://github.com/sam_the_chad)

</div>

---

## What is this?

`CLAUDE.md` is the single most important file in any Claude Code project. It gives Claude persistent context — your stack, your conventions, your rules — loaded at the start of every session.

**The problem:** Writing it by hand is tedious, most devs skip it, and a bad `CLAUDE.md` is worse than none. Anthropic's own docs warn:

> *"Bloated CLAUDE.md files cause Claude to ignore your actual instructions."*

**The solution:** `claude-md` scans your project, detects your stack, and generates a tight, accurate `CLAUDE.md` in under 10 seconds using Claude AI.

---

## Quickstart

No install needed:

```bash
npx claude-md init
```

Point it at a specific project:

```bash
npx claude-md init ./my-project
```

That's it. Your `CLAUDE.md` is ready.

---

## What happens when you run it

```
  ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗    ███╗   ███╗██████╗ 
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ████╗ ████║██╔══██╗
██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██╔████╔██║██║  ██║
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║╚██╔╝██║██║  ██║
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ██║ ╚═╝ ██║██████╔╝
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═════╝ 
 
  Auto-generate CLAUDE.md for your project using Claude AI
  v1.0.0  ·  by @sam_the_chad  ·  npmjs.com/package/claude-md

  ──────────────────────────────────────────────────

Enter your Anthropic API key: sk-ant-...          ← first run only
Key saved to ~/.claude-md/config.json ✓

  Scanning project...                              ✓
  Detected: Next.js · TypeScript · Tailwind · PostgreSQL · Prisma

  Generating CLAUDE.md via Claude API...           ✓

  ✓ CLAUDE.md written → /your-project/CLAUDE.md

  Tip: Review and trim it. Shorter CLAUDE.md = better Claude behavior.
```

---

## Works with any project

claude-md detects 30+ technologies automatically:

| Category | Detected |
|---|---|
| **Frontend** | Next.js, React, Vue, Svelte, Astro, Nuxt |
| **Styling** | Tailwind, shadcn/ui, Styled Components |
| **Backend** | FastAPI, Django, Flask, Express, Hono, tRPC |
| **Database** | Prisma, Drizzle, PostgreSQL, MongoDB, SQLite |
| **Auth** | NextAuth, Clerk |
| **Infra** | Upstash Redis, Stripe, Resend, Twilio |
| **AI** | Anthropic Claude API |
| **Language** | TypeScript, Python |

No config required. It just works.

---

## Your API key is safe

On first run you enter your Anthropic API key once. It's saved to `~/.claude-md/config.json` on **your machine only**. It goes directly from your terminal to Anthropic's API. Nobody else touches it — not even us.

Get your key at [console.anthropic.com](https://console.anthropic.com).

---

## Commands

```bash
npx claude-md init                # Generate CLAUDE.md in current directory
npx claude-md init ./myapp        # Generate for a specific path
npx claude-md init --force        # Overwrite existing without backup prompt
npx claude-md reset-key           # Clear your saved API key
```

---

## Why the generated CLAUDE.md is actually good

Most CLAUDE.md generators dump everything. This one uses Claude to write Claude instructions — which means it knows exactly what Claude Code responds to, what format works, and what to leave out.

The output is:
- **Under 200 lines** — short enough that Claude actually reads all of it
- **Stack-specific** — no generic filler, only what applies to your project
- **Production-ready** — covers commands, conventions, architecture, and rules

---

## Contributing

Open source under MIT. PRs welcome.

Want to add stack detection for a framework we don't support yet? Open an issue or add a detector in `src/scanner.js` — it's one line per technology.

```bash
git clone https://github.com/sam_the_chad/claude-md
cd claude-md
npm install
node bin/index.js init ./test-project
```

---

## License

MIT © [@sam_the_chad](https://github.com/sam_the_chad)

---

<div align="center">
<sub>Built for the Claude Code ecosystem · If this saved you time, star it ⭐</sub>
</div>
