# BrAIan

[Visit the website](https://getbraian.github.io) · [Try in GitHub Codespaces](https://codespaces.new/getbraian/braian?quickstart=1)

BrAIan starts with files and a rich Markdown editor. Write notes, browse your vault, open code and preview HTML. Add structure when you want it: note types, properties and relationships turn the same files into a personal knowledge workspace, with views and optional AI to help you use it.

Use the assistant to turn unstructured input into organised notes, or ask questions about what is in your vault. Your notes and their structure live in folders on your computer; AI features use a provider you connect in Settings.

BrAIan is in active development. This repository is its public home for documentation and updates. **We will add the source code as soon as possible.** You can already run the published app with npm.

## Get started

Install [Node.js](https://nodejs.org/) 22.16 or later (Node 24 is also supported), then run:

```sh
npx braian
```

The command starts BrAIan and opens it in your browser at <http://localhost:8484>. Keep the terminal running while you use the app; press `Ctrl+C` to stop it. No source checkout or separate build is needed.

Create or open a vault in the app. A new vault starts with Files. Enable more tools in Settings for each vault as you need them. To use the AI assistant, connect a provider under **Settings → AI providers**.

### Try in your browser

[Open a prepared GitHub Codespace](https://codespaces.new/getbraian/braian?quickstart=1). It installs the published app, starts a small demo vault and forwards private port 8484 to the internal preview. GitHub sign-in and Codespaces quota are required; your plan may charge for use. From the Codespace terminal, use `npm start` or `make start` to start it again. [Trial details and troubleshooting](TRY.md).

## Ways to use BrAIan

- **Run it now:** `npx braian` starts the published app locally.
- **Android and iOS:** add your running instance to your home screen for a native-feeling web app. On iPhone or iPad, use Safari’s Share → Add to Home Screen and keep Open as Web App enabled when shown. On Android, use Chrome’s Add to home screen → Install when offered. Your phone needs to reach your BrAIan server over HTTPS; set a password before exposing it.
- **Docker image:** coming soon.
- **Electron desktop app:** coming soon.

Explore the [full feature tour](https://getbraian.github.io/#all-features), including sharing, encrypted Safe Notes, journals, RSS, dictation, recordings, calendars, Discovery, Git versioning and the SQLite browser.

## Your files, your workspace

Use multiple vaults, choose optional features per vault, and switch light/dark themes. BrAIan works with core Obsidian Markdown and wiki-link conventions and can use the same vault folder alongside Obsidian; simultaneous edits use the last saved version. Obsidian plugins, themes and workspaces are not executed.

Notes and vault metadata stay on the computer, VPS or cloud server running BrAIan. Encrypted note bodies and safe blocks are excluded from search and AI reads; titles, properties and attachments remain separate. Optional remote AI/transcription services receive the context you send them.

Connect multiple AI providers: OpenAI and OpenRouter API keys, Groq, OpenAI-compatible endpoints, or experimental ChatGPT Codex, Claude and GitHub Copilot subscription connectors. Subscription support depends on vendor policies and availability. WhisperKit provides speech recognition through a compatible Mac server; Groq provides remote speech-to-text. Jev provides decision routing. More integrations can be added over time.

## Command line

```text
npx braian [folder] [options]
```

By default, BrAIan keeps its application data in `.brian` inside the current folder. This includes settings, login information, AI provider credentials and the vault list.

| Command | Application data folder |
| --- | --- |
| `npx braian` | `./.brian` |
| `npx braian /path/to/folder` | `/path/to/folder/.brian` |
| `npx braian -g` | `~/.brian`, shared with the desktop app |

The folder argument must point to an existing folder. If that folder is already a BrAIan vault (it contains `.brian/vault.yaml` or `.brian/topology`), the command opens that vault alone and uses `~/.brian` for application settings and credentials.

| Option | What it does |
| --- | --- |
| `-g`, `--global` | Use `~/.brian` for application data. Use this instead of a folder argument. |
| `--port <number>` | Set the server port. Defaults to the `PORT` environment variable or `8484`. |
| `--data <directory>` | Set the application data folder explicitly. Overrides the folder argument, global mode and `BRAIAN_DATA_PATH`. |
| `--no-open` | Start without opening a browser. |
| `-v`, `--version` | Print the version. |
| `-h`, `--help` | Show command help. |

For example:

```sh
npx braian -g
npx braian --port 9000 --no-open
npx braian --data /path/to/app-data
npx braian --help
```

If `BRAIAN_DATA_PATH` is set, it takes precedence over the default folder and global mode unless you pass `--data`.

Without a password, BrAIan accepts requests only from this computer. Set a password in Settings before making the app available to other devices. Do not run the desktop app and this command against the same application data folder at the same time.

Vault versioning requires `git`; recordings require `ffmpeg`. These are optional features, and the corresponding command must be available on your `PATH` to use them.

## License

[MIT](LICENSE) © 2026 Marco Pegoraro.
