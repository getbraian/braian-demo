import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEMO_ID = 'welcome';

execFileSync('npx', ['--yes', 'npm@11.6.2', 'ci', '--no-audit', '--no-fund'], { cwd: resolve(root, '.devcontainer/runtime'), stdio: 'inherit' });

const trial = resolve(root, '.braian-demo');
const vault = resolve(trial, 'vault');
mkdirSync(trial, { recursive: true });
if (!existsSync(vault)) installDemo(DEMO_ID, vault);
console.log('BrAIan is installed. Your editable trial vault is in .braian-demo/vault.');

// Install the latest release of a demo, as listed in demos/manifest.json.
function installDemo(id, dest) {
  const demos = resolve(root, 'demos');
  const entry = JSON.parse(readFileSync(resolve(demos, 'manifest.json'), 'utf8')).demos.find(d => d.id === id);
  if (!entry) throw new Error(`Demo "${id}" is not in demos/manifest.json.`);
  const zip = readFileSync(resolve(demos, entry.path));
  if (createHash('sha256').update(zip).digest('hex') !== entry.sha256) throw new Error(`demos/${entry.path} does not match its sha256 in the manifest.`);
  const tmp = `${dest}.installing`;
  rmSync(tmp, { recursive: true, force: true });
  unzip(zip, tmp);
  renameSync(tmp, dest);
  console.log(`Installed the ${entry.name} demo (${entry.version}).`);
}

// Minimal unzip for the stored/deflated archives `git archive` writes.
function unzip(buf, dest) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('Not a zip file.');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  mkdirSync(dest, { recursive: true });
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('Corrupt zip central directory.');
    const method = buf.readUInt16LE(p + 10);
    const compSize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    p += 46 + nameLen + extraLen + commentLen;
    const target = resolve(dest, name);
    if (target !== dest && !target.startsWith(dest + sep)) throw new Error(`Zip entry escapes the vault: ${name}`);
    if (name.endsWith('/')) { mkdirSync(target, { recursive: true }); continue; }
    const start = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const data = buf.subarray(start, start + compSize);
    mkdirSync(dirname(target), { recursive: true });
    if (method === 0) writeFileSync(target, data);
    else if (method === 8) writeFileSync(target, inflateRawSync(data));
    else throw new Error(`Unsupported zip compression method ${method} for ${name}`);
  }
}
