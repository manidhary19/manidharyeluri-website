// Fetch the public image assets identified during the visual audit, never site code.
import { projects, technology } from '../src/data/portfolio.js';
import { existsSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const names = [...new Set([...projects, ...technology].flatMap(p => [p.cover, ...p.images]).concat('NGOEt7uX16GHfFZhujvGvG89N0.png'))];
const pending = names.filter(n => !existsSync(`public/assets/images/${n}`));
let cursor = 0;
await Promise.all(Array.from({length: 5}, async () => {
  while(cursor < pending.length) {
    const name = pending[cursor++];
    const response = await fetch(`https://framerusercontent.com/images/${name}?scale-down-to=2048`);
    if(!response.ok) throw new Error(`${name}: ${response.status}`);
    writeFileSync(`public/assets/images/${name}`, Buffer.from(await response.arrayBuffer()));
  }
}));
const dimensions = {};
for (const name of readdirSync('public/assets/images')) {
  const info = execFileSync('sips', ['-g','pixelWidth','-g','pixelHeight',`public/assets/images/${name}`], {encoding:'utf8'});
  const width = Number(info.match(/pixelWidth: (\d+)/)?.[1]);
  const height = Number(info.match(/pixelHeight: (\d+)/)?.[1]);
  if (width && height) dimensions[name] = {width, height};
}
writeFileSync('src/data/image-dimensions.json', JSON.stringify(dimensions, null, 2) + '\n');
console.log(`Downloaded ${pending.length} assets; measured ${Object.keys(dimensions).length} images.`);
