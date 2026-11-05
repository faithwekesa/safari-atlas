import { mkdir, writeFile, access, appendFile } from 'node:fs/promises';
import { join } from 'node:path';

const PEXELS = process.env.PEXELS_API_KEY;
const PIXABAY = process.env.PIXABAY_API_KEY;
const PEXELS_API = process.env.PEXELS_API || 'https://api.pexels.com/v1/search';
const PIXABAY_API = process.env.PIXABAY_API || 'https://pixabay.com/api/';
const OUT = join(process.cwd(), 'public', 'images');

const ITEMS = [
  ['maasai-mara', 'maasai mara acacia sunset'],
  ['giza', 'giza pyramids egypt'],
  ['victoria-falls', 'victoria falls aerial'],
  ['sossusvlei', 'sossusvlei dunes'],
  ['zanzibar', 'zanzibar beach aerial'],
  ['table-mountain', 'table mountain cape town'],
  ['merzouga', 'sahara dunes camel'],
  ['kilimanjaro', 'mount kilimanjaro'],
];

const [mode, name, arg1, arg2] = process.argv.slice(2);

if (!PEXELS && !PIXABAY) {
  console.error('Missing key. Get a free Pexels key at https://www.pexels.com/api/ and run:');
  console.error('PEXELS_API_KEY=your_key node scripts/get-images.mjs');
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch (e) {
    return false;
  }
};

async function pexelsHits(query) {
  const url = `${PEXELS_API}?query=${encodeURIComponent(query)}&per_page=24&orientation=landscape&size=medium`;
  const res = await fetch(url, { headers: { Authorization: PEXELS } });
  if (res.status === 429) throw new Error('Pexels rate limit reached, wait a few minutes and run again');
  if (res.status === 401 || res.status === 403) throw new Error('Pexels rejected the key, check PEXELS_API_KEY');
  if (!res.ok) throw new Error(`Search failed with ${res.status}`);
  const data = await res.json();
  return (data.photos || []).map((p) => ({
    thumb: p.src.large,
    full: `${p.src.original}?auto=compress&cs=tinysrgb&w=2400`,
    w: p.width,
    h: p.height,
    page: p.url,
    credit: `photo by ${p.photographer} on Pexels, ${p.url}`,
  }));
}

async function pixabayHits(query) {
  const url = `${PIXABAY_API}?key=${PIXABAY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&min_width=1600&order=popular&per_page=24`;
  const res = await fetch(url);
  if (res.status === 429) throw new Error('Pixabay rate limit reached, wait a minute and run again');
  if (res.status === 400 || res.status === 401 || res.status === 403) throw new Error('Pixabay rejected the key, check PIXABAY_API_KEY');
  if (!res.ok) throw new Error(`Search failed with ${res.status}`);
  const data = await res.json();
  return (data.hits || []).map((h) => ({
    thumb: h.webformatURL,
    full: h.largeImageURL || h.webformatURL,
    w: h.imageWidth,
    h: h.imageHeight,
    page: h.pageURL,
    credit: `photo by ${h.user} on Pixabay, ${h.pageURL}`,
  }));
}

const hitsFor = (query) => (PEXELS ? pexelsHits(query) : pixabayHits(query));

async function download(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed with ${res.status}`);
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

const queryFor = (n, custom) => custom || (ITEMS.find((i) => i[0] === n) || [])[1];

async function browse() {
  const query = queryFor(name, arg1);
  if (!query) {
    console.error('Use: node scripts/get-images.mjs browse maasai-mara "optional search words"');
    process.exit(1);
  }
  const hits = await hitsFor(query);
  const cards = hits
    .map(
      (h, i) =>
        `<figure><img src="${h.thumb}" loading="lazy"><figcaption><b>${i + 1}</b> ${h.w} x ${h.h} <a href="${h.page}" target="_blank">open</a></figcaption></figure>`
    )
    .join('');
  const html = `<!doctype html><meta charset="utf-8"><title>${name}</title><style>body{margin:0;padding:24px;font:15px system-ui;background:#151515;color:#fff}h1{font-size:20px;margin:0 0 18px}.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}figure{margin:0}img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:10px;display:block}figcaption{padding:8px 2px;color:#bbb}b{display:inline-block;background:#e7b04b;color:#111;border-radius:6px;padding:2px 9px;margin-right:8px;font-size:17px}a{color:#e7b04b;margin-left:8px}</style><h1>${name}: "${query}". Note the number you like, then run: node scripts/get-images.mjs pick ${name} NUMBER${arg1 ? ` "${arg1}"` : ''}</h1><div class="g">${cards}</div>`;
  await writeFile(join(process.cwd(), 'browse.html'), html);
  console.log(`Found ${hits.length} photos. Open browse.html in your browser, pick a number, then run:`);
  console.log(`node scripts/get-images.mjs pick ${name} NUMBER${arg1 ? ` "${arg1}"` : ''}`);
}

async function pick() {
  const n = Number(arg1);
  const query = queryFor(name, arg2);
  if (!query || !n) {
    console.error('Use: node scripts/get-images.mjs pick maasai-mara 5 "same search words"');
    process.exit(1);
  }
  const hits = await hitsFor(query);
  const hit = hits[n - 1];
  if (!hit) {
    console.error(`There is no photo number ${n}. There are ${hits.length}.`);
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });
  await download(hit.full, join(OUT, `${name}.jpg`));
  await appendFile(join(OUT, 'CREDITS.txt'), `${name}.jpg: ${hit.credit}\n`);
  console.log(`saved  ${name}.jpg (photo number ${n}, ${hit.w} x ${hit.h} original)`);
}

async function all() {
  await mkdir(OUT, { recursive: true });
  const credits = join(OUT, 'CREDITS.txt');
  let ok = 0;
  let skipped = 0;
  const failed = [];

  for (const [id, query] of ITEMS) {
    const file = join(OUT, `${id}.jpg`);
    if (await exists(file)) {
      skipped += 1;
      console.log(`skip   ${id}.jpg (already there)`);
      continue;
    }
    try {
      const hit = (await hitsFor(query))[0];
      if (!hit) {
        failed.push(id);
        console.log(`none   ${id}.jpg (no results for "${query}")`);
        continue;
      }
      await download(hit.full, file);
      await appendFile(credits, `${id}.jpg: ${hit.credit}\n`);
      ok += 1;
      console.log(`saved  ${id}.jpg`);
    } catch (e) {
      failed.push(id);
      console.log(`failed ${id}.jpg: ${e.message}`);
      if (/rate limit|rejected the key/.test(e.message)) break;
    }
    await sleep(350);
  }

  console.log(`\nDone. ${ok} saved, ${skipped} skipped, ${failed.length} failed.`);
  if (failed.length) console.log(`Failed: ${failed.join(', ')}`);
  console.log('Photos are free to use. Credits are in public/images/CREDITS.txt');
}

if (mode === 'browse') await browse();
else if (mode === 'pick') await pick();
else await all();
