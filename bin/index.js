#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { getOrPromptApiKey } from '../src/config.js';
import { scanProject } from '../src/scanner.js';
import { generateClaudeMd } from '../src/generator.js';
import { writeClaudeMd } from '../src/writer.js';

const orange = chalk.hex('#FF6B2B');
const orangeDim = chalk.hex('#994020');
const program = new Command();

program
  .name('claude-md')
  .description('Auto-generate CLAUDE.md for your project using Claude AI')
  .version('1.0.0');

program
  .command('init [projectPath]')
  .description('Generate a CLAUDE.md file for your project')
  .option('-f, --force', 'Overwrite existing CLAUDE.md without prompt')
  .action(async (projectPath = '.', options) => {

    const banner = `
${orange(' ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗    ███╗   ███╗██████╗ ')}
${orange('██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ████╗ ████║██╔══██╗')}
${orange('██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██╔████╔██║██║  ██║')}
${orange('██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║╚██╔╝██║██║  ██║')}
${orange('╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ██║ ╚═╝ ██║██████╔╝')}
${orange(' ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝     ╚═╝╚═════╝ ')}
`;

    console.log(banner);
    console.log(chalk.dim('  Auto-generate CLAUDE.md for your project using Claude AI'));
    console.log(chalk.dim('  v1.0.0  ·  by ') + orange('@sam_the_chad') + chalk.dim('  ·  npmjs.com/package/claude-md'));
    console.log('');
    console.log(orangeDim('  ' + '─'.repeat(66)));
    console.log('');

    const apiKey = await getOrPromptApiKey();

    const scanSpinner = ora({ text: 'Scanning project...', color: 'yellow' }).start();
    let scan;
    try {
      scan = scanProject(projectPath);
      scanSpinner.succeed(chalk.green('Project scanned'));
    } catch (err) {
      scanSpinner.fail(chalk.red('Scan failed: ' + err.message));
      process.exit(1);
    }

    console.log('');
    if (scan.stack.length > 0) {
      console.log(chalk.dim('  Detected: ') + orange(scan.stack.join(' · ')));
    } else {
      console.log(chalk.yellow('  No specific stack detected — generating generic CLAUDE.md'));
    }

    if (scan.alreadyHasClaudeMd && !options.force) {
      console.log(chalk.dim('  Existing CLAUDE.md found — will backup to CLAUDE.md.backup'));
    }
    console.log('');

    const genSpinner = ora({ text: 'Generating CLAUDE.md via Claude API...', color: 'yellow' }).start();
    let content;
    try {
      content = await generateClaudeMd(scan, apiKey);
      genSpinner.succeed(chalk.green('CLAUDE.md generated'));
    } catch (err) {
      genSpinner.fail(chalk.red('Generation failed'));
      if (err.message.includes('401') || err.message.includes('authentication')) {
        console.error(chalk.red('\n  Invalid API key. Run: claude-md reset-key'));
      } else {
        console.error(chalk.red('\n  ' + err.message));
      }
      process.exit(1);
    }

    const { outputPath, backedUp } = writeClaudeMd(path.resolve(projectPath), content);

    console.log('');
    if (backedUp) {
      console.log(chalk.dim('  Backed up old CLAUDE.md → CLAUDE.md.backup'));
    }
    console.log('  ' + chalk.bold.green('✓ CLAUDE.md written → ') + orange(outputPath));
    console.log('');
    console.log(chalk.dim('  Tip: Review and trim it. Shorter CLAUDE.md = better Claude behavior.'));
    console.log('');
    console.log(orangeDim('  ' + '─'.repeat(66)));
    console.log('');
  });

program
  .command('reset-key')
  .description('Reset your saved Anthropic API key')
  .action(async () => {
    const { saveConfig } = await import('../src/config.js');
    saveConfig({ apiKey: null });
    console.log(orange('  API key cleared.') + chalk.dim(' Run claude-md init to set a new one.'));
  });

program.parse();