import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, openSync, closeSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.BRAIAN_TRY_PORT || 8484);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Choose a trial port from 1024 to 65535.');
const trial = resolve(root, '.braian-demo');
const vault = resolve(trial, 'vault');
const data = resolve(trial, 'data');
const runtime = resolve(root, '.devcontainer/runtime/node_modules/braian');
if (!existsSync(vault) || !existsSync(runtime)) throw new Error('Run node .devcontainer/setup.mjs first.');
mkdirSync(data, { recursive: true });
const url = `http://127.0.0.1:${port}`;
async function ready() {
  try { const r = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(2000) }); const h = await r.json(); return r.ok && h.status === 'ok' && h.indexing?.failed === 0; } catch { return false; }
}
const env = { ...process.env, PORT: String(port), BRAIAN_DATA_PATH: data, BRAIAN_VAULT: vault, BRAIAN_VAULT_ID: 'welcome' };
// Codespaces protects new forwarded ports with GitHub sign-in. Keep this port private.
// Permit only this Codespace's exact forwarded host; local runs keep BrAIan's loopback protection.
if (process.env.CODESPACES === 'true' && process.env.CODESPACE_NAME) {
  const domain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev';
  const host = `${process.env.CODESPACE_NAME}-${port}.${domain}`;
  env.BRAIAN_ALLOW_REMOTE = '1';
  env.BRAIAN_ALLOWED_HOSTS = host;
  env.WEB_APP_ORIGIN = `https://${host}`;
}
if (!await ready()) {
  const pkg = JSON.parse(readFileSync(resolve(runtime, 'package.json'), 'utf8'));
  const bin = typeof pkg.bin === 'string' ? pkg.bin : pkg.bin.braian;
  const log = openSync(resolve(trial, 'server.log'), 'a');
  const child = spawn(process.execPath, [resolve(runtime, bin), '--data', data, '--port', String(port), '--no-open'], { cwd: root, env, detached: true, stdio: ['ignore', log, log] });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  writeFileSync(resolve(trial, 'server.pid'), String(child.pid));
  child.unref();
  closeSync(log);
  let listening = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    if (await ready()) { listening = true; break; }
    await new Promise(done => setTimeout(done, 1000));
  }
  if (!listening) throw new Error('BrAIan did not start. Read .braian-demo/server.log, then rerun this command.');
}
console.log(`BrAIan is ready at http://localhost:${port}/welcome/files`);
console.log('In Codespaces, the private app preview opens automatically. If it does not, open port 8484 from the Ports panel.');
