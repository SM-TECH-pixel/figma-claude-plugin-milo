# FIGMA-CLAUDE-PLUGIN-MILO

A two-way bridge between a Claude Project chat and Figma. Ask Claude to build something in Figma and it appears automatically — no copy-paste, no console, no manual steps.

---

## How it works

```
Claude chat → writes pending-script.json
             → watch.js detects change
             → POSTs to server.js on port 3333
             → Figma plugin picks it up and runs it
             → result written to figma-output.json
             → Claude reads it automatically next turn
```

---

## Requirements

- Mac (tested on macOS 13+)
- Node.js v18 or later
- Figma Desktop (not browser)
- A Claude Project chat (claude.ai)

---

## Setup — step by step

### 1. Install Node.js

Go to https://nodejs.org and download the LTS installer for macOS. Run it and follow the prompts.

Verify it worked:
```bash
node --version
```

### 2. Clone or download this repo

```bash
git clone https://github.com/YOUR_USERNAME/figma-claude-plugin-milo.git
cd figma-claude-plugin-milo
```

Or download the zip and unzip it anywhere on your Mac.

### 3. Install dependencies

```bash
npm install
```

### 4. Find your Claude outputs folder path

This is the trickiest step. Every Claude Project chat has a unique outputs folder on your Mac. Here's how to find it:

1. Open your Claude Project chat
2. Ask it to run this bash command: `pwd`
3. It will return something like `/sessions/some-name/mnt/outputs/`
4. Ask it to also run: `echo $HOME` to get your Mac username

Then piece together the real Mac path by asking Claude:
> "What is the full Mac path to your outputs folder?"

It will return something like:
```
/Users/yourname/Library/Application Support/Claude/local-agent-mode-sessions/LONG-UUID/ANOTHER-UUID/local_ANOTHER-ID/outputs
```

Copy that path.

### 5. Create your config file

```bash
cp config.template.json config.json
```

Open `config.json` and paste in your outputs path:
```json
{
  "outputsPath": "/Users/yourname/Library/Application Support/Claude/local-agent-mode-sessions/..."
}
```

### 6. Load the plugin in Figma Desktop

1. Open Figma Desktop
2. Go to **Main Menu → Plugins → Development → Import plugin from manifest...**
3. Navigate to the `plugin/` folder inside this repo and select `manifest.json`
4. The plugin now appears under **Plugins → Development → Claude Script Runner**

### 7. Start the bridge

Open two terminal tabs (or use one and run in background):

**Tab 1 — server:**
```bash
node server.js
```

**Tab 2 — file watcher:**
```bash
node watch.js
```

You should see:
```
Claude Script Runner bridge on http://localhost:3333
Watching /your/outputs/path for changes to pending-script.json...
```

### 8. Open the plugin in Figma

Go to **Plugins → Development → Claude Script Runner**. The status dot should turn green: `Bridge connected`.

### 9. Tell your Claude chat about the bridge

In your Claude Project chat, paste this message:

> Read the file `FIGMA_BRIDGE.md` in the project folder before doing any Figma work. You have a live bridge to Figma — write scripts to `pending-script.json` in your outputs folder and they run automatically. Read `figma-output.json` from the same folder to see results.

Then add `FIGMA_BRIDGE.md` to your project's context (you can copy it from this repo or from the Mothership project folder).

---

## Using it

Once everything is running, just talk to your Claude chat naturally:

> "Add a teal rectangle to the current Figma page"
> "List all the layers on this page"
> "Create a button component called Primary with fills #1BC9AD"

Claude will write the script, the plugin runs it, and the result comes back automatically.

---

## Troubleshooting

**Plugin shows "Bridge offline"**
Start or restart `server.js` in terminal.

**Scripts arrive at the plugin but don't auto-run**
Close and reopen the plugin from **Plugins → Development → Claude Script Runner** to force a fresh load.

**watch.js doesn't pick up changes**
Make sure `config.json` has the correct `outputsPath`. Check by running:
```bash
ls "$(node -e "console.log(require('./config.json').outputsPath)")"
```
You should see `pending-script.json` in the listing.

**Manifest error in Figma**
Make sure `plugin/manifest.json` has both `allowedDomains` and `devAllowedDomains` — some Figma versions require both fields.

---

## File reference

```
figma-claude-plugin-milo/
├── plugin/
│   ├── manifest.json   — Figma plugin metadata
│   ├── code.js         — runs in Figma sandbox, executes scripts + POSTs results
│   └── ui.html         — plugin UI: polls server, shows status + log
├── server.js           — Express server on port 3333
├── watch.js            — watches pending-script.json, forwards to server
├── package.json
├── config.template.json
└── README.md
```

---

## Credits

Built by Milo Beyts for the Mothership project. Architecture designed with Claude (Anthropic).
