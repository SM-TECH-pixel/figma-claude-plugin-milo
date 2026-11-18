@echo off
rem Starts the Figma bridge. Put a shortcut to this file in your Startup folder
rem (press Win+R, type shell:startup) to start it automatically when you log in.
cd /d "%~dp0"
node start.js
