// Sends a Figma script to the running bridge and prints the result.
// Usage: node run-script.js <script.js> ["label"]
// The plugin must be open in Figma Desktop and the bridge running (npm start).
const fs = require('fs')
const path = require('path')
const config = require('./config')

const BRIDGE = process.env.BRIDGE_URL || 'http://127.0.0.1:3333'
const OUTPUT_FILE = path.join(config.outputsPath, 'figma-output.json')
const TIMEOUT_MS = 90000

async function main() {
  const [file, label] = process.argv.slice(2)
  if (!file) { console.error('Usage: node run-script.js <script.js> ["label"]'); process.exit(2) }
  const script = fs.readFileSync(file, 'utf8')

  try { await fetch(`${BRIDGE}/poll`) } catch {
    console.error('Bridge is not running. Start it with: npm start'); process.exit(2)
  }

  const startedAt = Date.now()
  const res = await fetch(`${BRIDGE}/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ script, label: label || path.basename(file) }),
  })
  const { version } = await res.json()

  while (Date.now() - startedAt < TIMEOUT_MS) {
    await new Promise((r) => setTimeout(r, 500))
    let rec
    try { rec = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8')) } catch { continue }
    if (rec.version === version && Date.parse(rec.timestamp) >= startedAt - 1000) {
      if (rec.success) { console.log(rec.output); return }
      console.error('SCRIPT ERROR: ' + rec.error); process.exit(1)
    }
  }
  console.error('No result after 90 seconds. Is the plugin open in Figma (status dot green)?')
  process.exit(3)
}
main().catch((e) => { console.error(e.message); process.exit(1) })
