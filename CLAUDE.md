# Figma Script Runner bridge

This repo is a local bridge that lets Claude Code run JavaScript inside Figma Desktop through a plugin. Read README.md for the human setup steps. This file is what you need to operate the bridge.

## First-time setup (Windows or Mac)

1. Check Node 18 or newer: `node --version`. If missing on Windows: `winget install OpenJS.NodeJS.LTS`, then tell the user to reopen the terminal.
2. `npm install`
3. No config is needed. Outputs go to `./outputs`. Only create `config.json` (from `config.template.json`) if the user wants another folder. On Windows use forward slashes in paths.
4. Tell the user to do these in Figma Desktop, since you cannot click inside Figma:
   - Plugins > Development > Import plugin from manifest... > select `manifest.json` in the repo root
   - Plugins > Development > Figma Script Runner, and leave it open (status dot green)
5. Start the bridge in a separate terminal window: `npm start`. Ask the user to do this, or run it in the background yourself. Do not start a second bridge: check first that nothing is on port 3333.

## Running a script in Figma

1. Write the script to a file, for example `outputs/my-script.js`.
2. Run it: `node run-script.js outputs/my-script.js "short label"`
3. The result is printed. Exit code 0 means success, 1 means the script threw an error (the message is printed), 3 means no result in 90 seconds (the plugin is probably not open), 2 means the bridge is not running.

Every script must be an async function that catches its own errors and returns a string:

```js
(async () => {
  try {
    const rect = figma.createRectangle();
    rect.name = "Test";
    rect.resize(200, 100);
    rect.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.79, b: 0.68 } }];
    figma.currentPage.appendChild(rect);
    return "created " + rect.id;
  } catch (e) {
    return "ERROR: " + e;
  }
})();
```

## Rules

- Load a font before writing text: `await figma.loadFontAsync({ family: "Inter", style: "Regular" })`. Never swap the font the user asked for. If a font fails to load, tell the user.
- Colours in the Figma API are 0 to 1, not 0 to 255.
- Return something useful (node ids, counts) so you can check the result.
- Make small, reversible changes first. The plugin can delete anything in the open file, so do not delete or restructure existing work unless asked.
- After building something visual, take a screenshot (below) and look at it before saying it is done.
- One script at a time. Wait for the result before sending the next.
- Never restart the bridge while a script is in flight. If the bridge is down, tell the user.
- Do not change `127.0.0.1` in `server.js` to `0.0.0.0`.

## Screenshots

The plugin's camera button saves a PNG of the current selection (or page) into `screenshots/`. The button next to it saves every top-level frame on the current page. Ask the user to click it, then read the PNG. You can also trigger an export from a script with `node.exportAsync(...)`, but saving to disk is done by the plugin UI.

## Troubleshooting for Claude Code

- Check the bridge is up: `node run-script.js` with any small script. "Bridge is not running" means start `npm start`.
- Port 3333 busy on Windows: `netstat -ano | findstr :3333`, then `taskkill /PID <pid> /F`. On Mac: `lsof -nP -iTCP:3333 -sTCP:LISTEN`.
- The plugin only runs scripts while its window is open in Figma.
- To change the port you must edit `server.js`, `watch.js`, `run-script.js`, `code.js`, `ui.html` and `manifest.json` together, then ask the user to re-import the manifest.

## Files

`code.js` runs inside Figma. `ui.html` is the plugin window and polls `/poll`. `server.js` is the bridge. `run-script.js` is the command you use. `watch.js` is the older file-drop route (`outputs/pending-script.json` with `{ "label": "", "script": "" }`). `start.js` starts the server and watcher.
