// Shared config loader for server.js, watch.js and run-script.js.
// config.json is optional. Without it, everything lives in ./outputs inside this folder.
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'config.json')
let raw = {}
if (fs.existsSync(file)) {
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (e) {
    console.error(`config.json is not valid JSON (${e.message}).`)
    console.error('On Windows, write paths with forward slashes, e.g. "C:/Users/you/figma-outputs", or double the backslashes.')
    process.exit(1)
  }
}

const outputsPath = path.resolve(__dirname, raw.outputsPath || 'outputs')
fs.mkdirSync(outputsPath, { recursive: true })

module.exports = { outputsPath }
