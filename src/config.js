import fs from 'fs';
import path from 'path';
import os from 'os';
import prompts from 'prompts';

const CONFIG_DIR = path.join(os.homedir(), '.claude-md');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export function getConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch {
    return null;
  }
}

export function saveConfig(config) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export async function getOrPromptApiKey() {
  const config = getConfig();
  if (config?.apiKey) return config.apiKey;

  console.log('');
  const { apiKey } = await prompts({
    type: 'password',
    name: 'apiKey',
    message: 'Enter your Anthropic API key (stored locally, never sent anywhere else):',
    validate: v => v.startsWith('sk-ant-') ? true : 'Must be a valid Anthropic API key (starts with sk-ant-)'
  });

  if (!apiKey) {
    console.error('API key is required. Get one at console.anthropic.com');
    process.exit(1);
  }

  saveConfig({ apiKey, savedAt: new Date().toISOString() });
  console.log('');
  return apiKey;
}