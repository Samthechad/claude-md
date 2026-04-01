import fs from 'fs';
import path from 'path';

export function writeClaudeMd(projectPath, content) {
  const outputPath = path.join(projectPath, 'CLAUDE.md');
  const exists = fs.existsSync(outputPath);

  if (exists) {
    const backupPath = path.join(projectPath, 'CLAUDE.md.backup');
    fs.copyFileSync(outputPath, backupPath);
  }

  fs.writeFileSync(outputPath, content, 'utf8');

  return { outputPath, backedUp: exists };
}