#!/bin/bash
# Stops the auto-start bridge set up by install-autostart.sh and removes it
# so it no longer starts at login.
set -e

LABEL="com.milo.figmabridge"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"

if [ -f "$PLIST" ]; then
  launchctl unload "$PLIST" >/dev/null 2>&1 || true
  rm "$PLIST"
  echo "Bridge auto-start removed. It will not start on next login."
  echo "Run install-autostart.sh again if you want to turn it back on."
else
  echo "No auto-start was installed."
fi
