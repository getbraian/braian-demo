# BrAIan

[Visit the website](https://getbraian.github.io)

BrAIan is a local-first personal knowledge workspace for your notes, people, tasks and projects. Keep information in Markdown files, connect it through a typed knowledge graph, and work with it through notes, boards, calendars and an AI assistant.

Use the assistant to turn unstructured input into organised notes, or ask questions about what is in your vault. Your notes and their structure live in folders on your computer; AI features use a provider you connect in Settings.

BrAIan is in active development. This repository is its public home for documentation and updates. **We will add the source code as soon as possible.** You can already run the published app with npm.

## Get started

Install [Node.js](https://nodejs.org/) 22.16 or later (Node 24 is also supported), then run:

```sh
npx braian
```

The command starts BrAIan and opens it in your browser at <http://localhost:8484>. Keep the terminal running while you use the app; press `Ctrl+C` to stop it. No source checkout or separate build is needed.

Create or open a vault in the app. To use the AI assistant, connect a provider under **Settings → AI providers**.

## Ways to use BrAIan

- **Run it now:** `npx braian` starts the published app locally.
- **Android and iOS:** add your running instance to your home screen for a native-feeling web app. On iPhone or iPad, use Safari’s Share → Add to Home Screen and keep Open as Web App enabled when shown. On Android, use Chrome’s Add to home screen → Install when offered. Your phone needs to reach your BrAIan server over HTTPS; set a password before exposing it.
- **Docker image:** coming soon.
- **Electron desktop app:** coming soon.

Explore the [full feature tour](https://getbraian.github.io/#all-features), including sharing, encrypted Safe Notes, journals, RSS, dictation, recordings, calendars, Discovery, Git versioning and the SQLite browser.

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
