#!/bin/bash
# One-time setup: makes server.js + watch.js start automatically every time
# you log in to your Mac, with no Terminal needed afterwards.
#
# Usage: run this once, from inside the plugin folder:
#   bash install-autostart.sh
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_BIN="$(command -v node || true)"
LABEL="com.milo.figmabridge"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"

if [ -z "$NODE_BIN" ]; then
  echo "Could not find Node.js. Install it from nodejs.org first, then run this script again."
  exit 1
fi

if [ ! -f "$DIR/config.json" ]; then
  echo "config.json is missing in this folder."
  echo "Copy config.template.json to config.json and fill in outputsPath first, then run this again."
  exit 1
fi

if [ ! -d "$DIR/node_modules" ]; then
  echo "Installing dependencies (this only happens once)..."
  (cd "$DIR" && npm install)
fi

mkdir -p "$DIR/logs" "$HOME/Library/LaunchAgents"

cat > "$DIR/start-bridge.sh" <<EOF
#!/bin/bash
cd "$DIR"
"$NODE_BIN" server.js >> "$DIR/logs/server.log" 2>&1 &
"$NODE_BIN" watch.js  >> "$DIR/logs/watch.log"  2>&1 &
wait
EOF
chmod +x "$DIR/start-bridge.sh"

cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$DIR/start-bridge.sh</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>$DIR/logs/launchd.log</string>
  <key>StandardErrorPath</key>
  <string>$DIR/logs/launchd.log</string>
</dict>
</plist>
EOF

launchctl unload "$PLIST" >/dev/null 2>&1 || true
launchctl load -w "$PLIST"

echo ""
echo "Done. The bridge is now running, and will start automatically every time you log in."
echo "You never need to run 'node server.js' or 'node watch.js' by hand again."
echo "Logs (for troubleshooting) are in: $DIR/logs"
echo ""
echo "Note: if you move this folder somewhere else later, re-run this script from its new location."
