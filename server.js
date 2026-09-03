const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3333

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'))
const OUTPUT_FILE = path.join(config.outputsPath, 'figma-output.json')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.use(express.json({ limit: '50mb' }))
app.use(express.text({ type: 'text/plain' }))

let current = { version: 0, script: null, label: null }

app.post('/run', (req, res) => {
  const body = req.body
  const script = typeof body === 'string' ? body : body.script
  const label = (typeof body === 'object' && body.label) ? body.label : 'Untitled script'
  if (!script) return res.status(400).json({ error: 'No script provided' })
  current = { version: current.version + 1, script, label }
  console.log(`[${new Date().toLocaleTimeString()}] Script queued: "${label}"`)
  res.json({ ok: true, version: current.version })
})

app.post('/output', (req, res) => {
  const { label, success, output, error, version } = req.body
  const record = {
    timestamp: new Date().toISOString(),
    version: version ?? null,
    label: label || 'Untitled script',
    success: !!success,
    output: success ? (output ?? null) : null,
    error: !success ? (error ?? null) : null,
  }
  fs.writeFile(OUTPUT_FILE, JSON.stringify(record, null, 2), (err) => {
    if (err) console.error(`[${new Date().toLocaleTimeString()}] Failed to write output: ${err.message}`)
    else console.log(`[${new Date().toLocaleTimeString()}] Output written · "${record.label}" → ${record.success ? record.output : 'ERROR: ' + record.error}`)
  })
  res.json({ ok: true })
})

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots')
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR)

app.post('/screenshot', (req, res) => {
  const { base64, name } = req.body
  if (!base64) return res.status(400).json({ error: 'No base64 data' })
  const buf = Buffer.from(base64, 'base64')
  const filename = name ? name.replace(/[^a-zA-Z0-9_-]/g, '_') + '.png' : 'screenshot.png'
  const filepath = path.join(SCREENSHOT_DIR, filename)
  fs.writeFile(filepath, buf, (err) => {
    if (err) {
      console.error(`[${new Date().toLocaleTimeString()}] Screenshot save failed: ${err.message}`)
      return res.status(500).json({ error: err.message })
    }
    console.log(`[${new Date().toLocaleTimeString()}] Screenshot saved: ${filename} (${buf.length} bytes)`)
    res.json({ ok: true, path: filepath, size: buf.length })
  })
})

app.get('/poll', (req, res) => {
  console.log(`[${new Date().toLocaleTimeString()}] poll hit (since=${req.query.since})`)
  const since = parseInt(req.query.since || '0', 10)
  if (current.version > since) {
    res.json({ version: current.version, script: current.script, label: current.label })
  } else {
    res.json({ version: current.version, script: null })
  }
})

app.listen(PORT, () => {
  console.log(`\nFigma Script Runner bridge on http://localhost:${PORT}`)
  console.log(`Outputs: ${config.outputsPath}\n`)
})
