# Try BrAIan in GitHub Codespaces

The published app starts automatically after the Codespace connects. Its private port **8484** is configured to open in the internal preview. A single demo vault opens directly; start with Files and `Welcome.md`.

If the preview does not appear, open the **Ports** panel and choose **Open in Preview** or **Open in Browser** for port 8484. To start BrAIan again, run either command from the repository folder:

```sh
npm start
# or
make start
```

The launcher reuses an already running app and never resets your notes. Install/setup can be repeated with `npm run setup` (or `make setup`); it installs the `welcome` demo vault only when your trial vault is missing.

## Where things live

- Your editable vault: `.braian-demo/vault`.
- Application settings and any credentials you connect: `.braian-demo/data`.
- Server output: `.braian-demo/server.log`.
- Starter vault source: `demos/welcome/vault/`. Setup installs its latest released zip, listed in `demos/manifest.json` and checked against its sha256; editing the trial leaves both unchanged.

The entire `.braian-demo/` folder is ignored by Git. Do not copy its credentials into a commit. New Codespaces ports are private by default: keep this one private. If you choose to expose an instance publicly, configure BrAIan authentication first.

Only Files is on at the start. Turn optional features on vault by vault in Settings. No AI key or subscription is needed for notes and files. WhisperKit runs on compatible Apple hardware, so it is not installed in this Linux trial; use a separately reachable server or an online dictation provider if wanted.

This is your GitHub-hosted environment. GitHub sign-in and available Codespaces quota are required; usage may be billable under your plan. Stop the Codespace after trying it. Deleting it deletes its local trial data: download anything you want to keep first.

## Runtime and configuration

The trial installs the public `braian@0.0.4` npm package from the committed lockfile using Node 24 and npm 11.6.2 (the setup invokes that version without changing your global npm). It does not contain application source. `.devcontainer/devcontainer.json` forwards port 8484 and requests `onAutoForward: openPreview`; automatic preview depends on the Codespaces client. In Codespaces only, the launcher permits the private GitHub proxy and the exact forwarded hostname.

References: [GitHub's preview setup](https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-repository/setting-up-a-template-repository-for-github-codespaces), [forwarded ports](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace), [dev container reference](https://containers.dev/implementors/json_reference/).

## Validation

The setup and launcher were checked locally in the configured Node 24 Linux image as its non-root `node` user: installation, successful vault indexing, file listing, served web app, repeated setup preserving an existing note, and reconnecting without a duplicate server all passed. The Files-only starter vault and Welcome note were also checked in a browser. A hosted Codespace was not provisioned during that check; automatic internal preview is configured according to GitHub’s documented `openPreview` flow.

Both root-level launch wrappers (`npm start` and `make start`) were also checked locally: the first started a healthy trial server and the second reused it.
