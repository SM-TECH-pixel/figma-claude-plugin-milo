// Starts the bridge server and the file watcher together. Works on Windows, Mac and Linux.
// Usage: npm start
const { spawn } = require('child_process')
const path = require('path')

const children = ['server.js', 'watch.js'].map((file) =>
  spawn(process.execPath, [path.join(__dirname, file)], { stdio: 'inherit', cwd: __dirname })
)

function stopAll() { children.forEach((c) => { try { c.kill() } catch {} }) }
children.forEach((c) => c.on('exit', (code) => { stopAll(); process.exit(code || 0) }))
process.on('SIGINT', stopAll)
process.on('SIGTERM', stopAll)
