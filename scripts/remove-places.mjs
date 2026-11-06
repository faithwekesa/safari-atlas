import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';

const IDS = ['dahab', 'okavango', 'seychelles'];

const file = 'src/costs.js';
const lines = readFileSync(file, 'utf8').split('\n');
const out = [];
let skipping = false;
let removed = 0;

for (const line of lines) {
  if (skipping) {
    if (line === '  },') skipping = false;
    continue;
  }
  const start = line.match(/^  '?([a-z-]+)'?: \{$/);
  if (start && IDS.includes(start[1])) {
    skipping = true;
    removed += 1;
    continue;
  }
  if (/^  seychelles: \{ label/.test(line)) continue;
  out.push(line);
}

writeFileSync(file, out.join('\n'));
console.log(`removed ${removed} entries from ${file}`);

for (const id of IDS) {
  const photo = `public/images/${id}.jpg`;
  if (existsSync(photo)) {
    unlinkSync(photo);
    console.log(`deleted ${photo}`);
  }
}

const credits = 'public/images/CREDITS.txt';
if (existsSync(credits)) {
  const kept = readFileSync(credits, 'utf8')
    .split('\n')
    .filter((l) => !IDS.some((id) => l.includes(`${id}.jpg`)));
  writeFileSync(credits, kept.join('\n'));
  console.log('cleaned CREDITS.txt');
}
