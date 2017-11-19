import { spawnSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

let stdout, stderr;
({ stderr, stdout } = spawnSync('node', ['node_modules/ts-node/dist/_bin.js', '-F', 'src/bin', '--help'], { encoding: 'utf8' }));
if (stderr) {
    throw stderr;
}
let readme = readFileSync('README.md', { encoding: 'utf8' });
const usageText = 'USAGE\n---\n';
const usagePos = readme.indexOf(usageText) + usageText.length;
let nextPos = readme.indexOf('\n---', usagePos);
nextPos = readme.lastIndexOf('\n', nextPos - 1);
readme = readme.slice(0, usagePos) + '```\n' + stdout.trim() + '\n```' + readme.slice(nextPos - 1);
writeFileSync('README.md', readme);
