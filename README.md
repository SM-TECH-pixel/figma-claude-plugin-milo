# Figma Script Runner (Claude Code bridge)

Lets Claude Code build and edit things in Figma Desktop for you. You ask Claude Code in plain English ("add a teal rectangle", "list the layers on this page", "export every frame as a PNG") and it appears in Figma. No copy and paste, no console.

This guide is written for **Windows**. Mac notes are at the bottom.

---

## How it works

```
Claude Code writes a script file
   -> node run-script.js sends it to the bridge (server.js, port 3333)
   -> the Figma plugin (open in Figma Desktop) picks it up and runs it
   -> the result is written to outputs/figma-output.json
   -> run-script.js prints the result back to Claude Code
```

Everything runs on your own computer. Nothing is sent to any server. The bridge only listens on your own machine (127.0.0.1), not on your network.

There is also an older route: write a `pending-script.json` file into the outputs folder and `watch.js` forwards it. Claude Code does not need this, but it still works.

---

## What you need

- Windows 10 or 11
- **Figma Desktop** (the plugin cannot be loaded in the browser version): https://www.figma.com/downloads/
- **Node.js 18 or newer** (LTS): https://nodejs.org
- **Git** (optional, you can download the zip instead): https://git-scm.com
- **Claude Code** installed and signed in: https://docs.claude.com/en/docs/claude-code

Install Node and Git in one go from PowerShell:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
```

Close and reopen PowerShell afterwards, then check:

```powershell
node --version
```

---

## Setup

### 1. Get the code

```powershell
git clone https://github.com/SM-TECH-pixel/figma-claude-plugin-milo.git
cd figma-claude-plugin-milo
npm install
```

No Git? Click **Code > Download ZIP** on the GitHub page, unzip it, then open PowerShell inside the folder and run `npm install`.

### 2. Load the plugin into Figma Desktop

1. Open Figma Desktop and open any design file.
2. Main menu > **Plugins > Development > Import plugin from manifest...**
3. Select the `manifest.json` in the **root** of this folder (not in a subfolder).
4. It now appears under **Plugins > Development > Figma Script Runner**.

### 3. Start the bridge

In PowerShell, inside the folder:

```powershell
npm start
```

You should see:

```
Figma Script Runner bridge on http://localhost:3333
Outputs: C:\...\figma-claude-plugin-milo\outputs
```

The first time, Windows may show a Firewall prompt for Node.js. Choose **Private networks** and Allow. Leave this window open.

### 4. Open the plugin in Figma

**Plugins > Development > Figma Script Runner**. The status dot goes green ("Bridge connected"). **Keep the plugin window open while you work.** It only receives scripts while it is open. The minimise button shrinks it out of the way.

### 5. Use it from Claude Code

Open a second PowerShell window in the same folder and start Claude Code:

```powershell
claude
```

This folder contains a `CLAUDE.md` that teaches Claude Code how to use the bridge, so you can just ask:

> Add a teal rectangle called "Test" to the current Figma page.

---

## Setting it up with Claude Code (alternative)

If you would rather not follow the steps yourself, install Node and Claude Code, clone the repo, open Claude Code in the folder and say:

> Read README.md and CLAUDE.md, then set this plugin up on my Windows computer. Tell me what I need to click in Figma.

You will still need to do the Figma steps (import the manifest, open the plugin) yourself, because Claude Code cannot click inside Figma.

---

## Making changes for your own computer

Most people need no changes at all. These are the things people change.

| What | Where | Notes |
|---|---|---|
| Where outputs and results are saved | `config.json` | Optional. Copy `config.template.json` to `config.json` and edit `outputsPath`. Default is the `outputs` folder inside this repo. |
| Windows paths in JSON | `config.json` | Use forward slashes: `"C:/Users/yourname/figma-outputs"`. Backslashes break JSON unless doubled (`C:\\Users\\...`). |
| Where screenshots are saved | `server.js`, the `SCREENSHOT_DIR` line | Default is a `screenshots` folder inside this repo. |
| Port number | `server.js`, `watch.js`, `run-script.js`, `code.js`, `ui.html` and `manifest.json` | Default 3333. If you change it you must change it in **all** of these, including `devAllowedDomains` in `manifest.json`, then re-import the plugin. |
| Plugin name | `manifest.json` (`name`) and `code.js` (`title`) | Then re-import the manifest in Figma. |
| Fonts | in the scripts Claude writes | Figma needs a font loaded before text is written. Tell Claude Code which font you use. |

`config.json` is ignored by Git, so your own paths never get committed.

### Start the bridge automatically when you log in

1. Press **Win + R**, type `shell:startup`, press Enter. A folder opens.
2. Right-click `start-bridge.bat` in this repo and choose **Create shortcut**. Move the shortcut into the Startup folder.

A black window opens at login and stays open. Closing it stops the bridge.

---

## Troubleshooting

**Plugin says "Bridge offline"**
The bridge is not running. Run `npm start` in the folder.

**`Error: listen EADDRINUSE ... 3333`**
Something is already using port 3333, usually an old bridge. Find and stop it:
```powershell
netstat -ano | findstr :3333
taskkill /PID <the number in the last column> /F
```

**"Bridge is not running" from run-script.js**
Same as above. Check the `npm start` window is still open.

**"No result after 90 seconds"**
The bridge is running but the plugin is not. Open **Plugins > Development > Figma Script Runner** in Figma. Closing and reopening the plugin forces a fresh connection.

**Scripts reach the plugin but nothing changes**
Make sure you are on the right Figma page and that the file is not in view-only mode. Check the plugin's output panel for an error message.

**`config.json is not valid JSON`**
Almost always backslashes in a Windows path. Use forward slashes.

**Manifest error when importing**
Import the `manifest.json` in the root of the folder. Figma needs both `allowedDomains` and `devAllowedDomains` in it, and the file already has both.

**The server window prints "poll hit" every second**
That is normal. It is the plugin checking for new scripts.

**Screenshots**
The camera button in the plugin saves a PNG of the selection into `screenshots/`. The button next to it saves every top-level frame on the page.

---

## Safety

The plugin runs whatever script it is sent, with full access to the open Figma file, including deleting things. The bridge therefore only accepts connections from your own computer. Do not change `127.0.0.1` in `server.js` to `0.0.0.0`, because anyone on your network could then edit your Figma files. Use a duplicate or a branch of a file you care about while you get used to it.

---

## Mac

Everything above works the same, using Terminal instead of PowerShell and `brew install node` or the installer from nodejs.org. Differences:

- Keep the bridge running automatically with `bash install-autostart.sh` (and `bash uninstall-autostart.sh` to remove it). This installs a macOS LaunchAgent and replaces the Windows Startup shortcut.
- Config paths look like `/Users/yourname/figma-outputs`.
- Find what is using port 3333 with `lsof -nP -iTCP:3333 -sTCP:LISTEN`.

---

## File reference

```
figma-claude-plugin-milo/
├── manifest.json          Figma plugin metadata (import this one)
├── code.js                Runs inside Figma: executes scripts, takes screenshots
├── ui.html                Plugin window: polls the bridge, shows status and output
├── server.js              Bridge server on 127.0.0.1:3333
├── watch.js               Forwards outputs/pending-script.json to the bridge
├── run-script.js          Sends a script file to the bridge and prints the result
├── start.js               Starts server.js and watch.js together (npm start)
├── config.js              Reads optional config.json
├── config.template.json   Example config
├── start-bridge.bat       Windows: double-click or put in the Startup folder
├── install-autostart.sh   Mac only: start at login
├── uninstall-autostart.sh Mac only: remove the above
├── CLAUDE.md              Instructions Claude Code reads automatically
└── package.json
```

---

## Credits

Built by Milo Beyts. Architecture designed with Claude (Anthropic).
