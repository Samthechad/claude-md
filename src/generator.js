import Anthropic from '@anthropic-ai/sdk';

export async function generateClaudeMd(scanResult, apiKey) {
  const client = new Anthropic({ apiKey });

  const prompt = `You are an expert at writing CLAUDE.md files for Claude Code.

A CLAUDE.md file gives Claude persistent context about a project at the start of every session.
It should be CONCISE (under 200 lines), specific, and actionable. Every line must earn its place.
Do NOT add fluff. Do NOT repeat what Claude can infer from code.

Here is the scanned project data:
- Project name: ${scanResult.projectName}
- Description: ${scanResult.description || 'Not specified'}
- Detected stack: ${scanResult.stack.join(', ') || 'Unknown'}
- Top-level directories: ${scanResult.topDirs.join(', ') || 'None detected'}
- npm scripts available: ${scanResult.scripts.join(', ') || 'None'}
- Is fullstack: ${scanResult.isFullstack}
- Is monorepo: ${scanResult.hasMonorepo}
- Has Python: ${scanResult.hasPython}
${scanResult.pythonPackages.length ? `- Python packages: ${scanResult.pythonPackages.slice(0,10).join(', ')}` : ''}

Generate a CLAUDE.md with these sections (only include sections that are relevant):

# Project Overview
One short paragraph about what this project is and does.

# Tech Stack
Bullet list of the actual detected stack.

# Project Structure
Key directories and what they contain (inferred from dir names + stack).

# Development Commands
The actual npm/python commands to run dev, build, test, lint.

# Code Style & Conventions
Language-specific conventions (TypeScript strict mode, Python PEP8, etc).

# Architecture Notes
Any key architectural decisions Claude should know (only if fullstack/monorepo).

# Important Rules
3-5 specific rules Claude must follow when editing this codebase.

Output ONLY the CLAUDE.md content. No preamble, no explanation, no markdown fences.`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].text;
}