import fs from 'fs';
import path from 'path';

const STACK_DETECTORS = {
  // Frontend frameworks
  'Next.js':       p => hasPackage(p, 'next'),
  'React':         p => hasPackage(p, 'react'),
  'Vue':           p => hasPackage(p, 'vue'),
  'Svelte':        p => hasPackage(p, 'svelte'),
  'Nuxt':          p => hasPackage(p, 'nuxt'),
  'Astro':         p => hasPackage(p, 'astro'),

  // Styling
  'Tailwind':      p => hasPackage(p, 'tailwindcss'),
  'shadcn/ui':     p => hasFile(p, 'components.json'),
  'Styled Components': p => hasPackage(p, 'styled-components'),

  // Backend / API
  'FastAPI':       p => hasPyPackage(p, 'fastapi'),
  'Django':        p => hasPyPackage(p, 'django'),
  'Flask':         p => hasPyPackage(p, 'flask'),
  'Express':       p => hasPackage(p, 'express'),
  'Hono':          p => hasPackage(p, 'hono'),
  'tRPC':          p => hasPackage(p, '@trpc/server'),
  'GraphQL':       p => hasPackage(p, 'graphql'),

  // Database / ORM
  'Prisma':        p => hasPackage(p, 'prisma') || hasPackage(p, '@prisma/client'),
  'Drizzle':       p => hasPackage(p, 'drizzle-orm'),
  'PostgreSQL':    p => hasPackage(p, 'pg') || hasPackage(p, 'postgres') || hasPyPackage(p, 'psycopg2') || hasPyPackage(p, 'asyncpg'),
  'MongoDB':       p => hasPackage(p, 'mongoose') || hasPackage(p, 'mongodb'),
  'SQLite':        p => hasPackage(p, 'better-sqlite3'),

  // Auth
  'NextAuth':      p => hasPackage(p, 'next-auth') || hasPackage(p, '@auth/core'),
  'Clerk':         p => hasPackage(p, '@clerk/nextjs'),

  // Infrastructure / Misc
  'Upstash Redis': p => hasPackage(p, '@upstash/redis'),
  'Redis':         p => hasPackage(p, 'ioredis') || hasPyPackage(p, 'redis'),
  'Stripe':        p => hasPackage(p, 'stripe'),
  'Resend':        p => hasPackage(p, 'resend'),
  'Twilio':        p => hasPackage(p, 'twilio') || hasPyPackage(p, 'twilio'),
  'TypeScript':    p => hasPackage(p, 'typescript') || hasFile(p, 'tsconfig.json'),
  'Zod':           p => hasPackage(p, 'zod'),
  'Claude API':    p => hasPackage(p, '@anthropic-ai/sdk') || hasPyPackage(p, 'anthropic'),
};

function hasPackage(projectPath, name) {
  const pkgPath = path.join(projectPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return false;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const all = { ...pkg.dependencies, ...pkg.devDependencies };
    return !!all[name];
  } catch { return false; }
}

function hasPyPackage(projectPath, name) {
  for (const f of ['requirements.txt', 'pyproject.toml', 'Pipfile']) {
    const fp = path.join(projectPath, f);
    if (fs.existsSync(fp)) {
      const content = fs.readFileSync(fp, 'utf8').toLowerCase();
      if (content.includes(name.toLowerCase())) return true;
    }
  }
  return false;
}

function hasFile(projectPath, name) {
  return fs.existsSync(path.join(projectPath, name));
}

function getTopDirs(projectPath) {
  try {
    return fs.readdirSync(projectPath, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.') && !['node_modules','__pycache__','.git','dist','.next'].includes(d.name))
      .map(d => d.name)
      .slice(0, 12);
  } catch { return []; }
}

function getPackageInfo(projectPath) {
  const pkgPath = path.join(projectPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return {
      name: pkg.name,
      description: pkg.description,
      scripts: Object.keys(pkg.scripts || {}),
    };
  } catch { return null; }
}

function getPythonInfo(projectPath) {
  const reqPath = path.join(projectPath, 'requirements.txt');
  if (!fs.existsSync(reqPath)) return null;
  const lines = fs.readFileSync(reqPath, 'utf8')
    .split('\n').filter(l => l.trim() && !l.startsWith('#'));
  return { packages: lines.slice(0, 20) };
}

function hasExistingClaudeMd(projectPath) {
  return fs.existsSync(path.join(projectPath, 'CLAUDE.md'));
}

export function scanProject(projectPath) {
  const resolvedPath = path.resolve(projectPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Path does not exist: ${resolvedPath}`);
  }

  const detectedStack = Object.entries(STACK_DETECTORS)
    .filter(([, detect]) => detect(resolvedPath))
    .map(([name]) => name);

  const pkgInfo = getPackageInfo(resolvedPath);
  const pyInfo = getPythonInfo(resolvedPath);
  const topDirs = getTopDirs(resolvedPath);
  const hasMonorepo = topDirs.some(d => ['packages', 'apps', 'libs', 'services'].includes(d));
  const isFullstack = detectedStack.some(s => ['FastAPI', 'Django', 'Flask', 'Express'].includes(s)) &&
                      detectedStack.some(s => ['Next.js', 'React', 'Vue'].includes(s));

  return {
    projectPath: resolvedPath,
    projectName: pkgInfo?.name || path.basename(resolvedPath),
    description: pkgInfo?.description || '',
    stack: detectedStack,
    scripts: pkgInfo?.scripts || [],
    topDirs,
    hasMonorepo,
    isFullstack,
    hasPython: !!pyInfo,
    pythonPackages: pyInfo?.packages || [],
    alreadyHasClaudeMd: hasExistingClaudeMd(resolvedPath),
  };
}