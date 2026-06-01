const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3333

// Load config
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'))
const OUTPUT_FILE = config.outputsPath + '/figma-output.json'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})
app.use(express.json())
app.use(express.text({ type: 'text/plain' }))

let current = { version: 0, script: null, label: null }

// Push a script into Figma
app.post('/run', (req, res) => {
  const body = req.body
  const script = typeof body === 'string' ? body : body.script
  const label = (typeof body === 'object' && body.label) ? body.label : 'Untitled'
  if (!script) return res.status(400).json({ error: 'No script provided' })
  current = { version: current.version + 1, script, label }
  console.log(`[${new Date().toLocaleTimeString()}] Script queued v${current.version}: "${label}"`)
  res.json({ ok: true, version: current.version })
})

// Plugin polls this to get new scripts
app.get('/poll', (req, res) => {
  const since = parseInt(req.query.since || '0', 10)
  if (current.version > since) {
    res.json({ version: current.version, script: current.script, label: current.label })
  } else {
    res.json({ version: current.version, script: null })
  }
})

// Plugin POSTs execution result here
app.post('/output', (req, res) => {
  const { label, success, output, error, version } = req.body
  const record = {
    timestamp: new Date().toISOString(),
    version: version ?? null,
    label: label || 'Untitled',
    success: !!success,
    output: success ? (output ?? null) : null,
    error: !success ? (error ?? null) : null,
  }
  fs.writeFile(OUTPUT_FILE, JSON.stringify(record, null, 2), (err) => {
    if (err) console.error(`Failed to write output: ${err.message}`)
    else console.log(`[${new Date().toLocaleTimeString()}] Output saved: "${record.label}" → ${record.success ? record.output : 'ERROR: ' + record.error}`)
  })
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`\nClaude Script Runner bridge on http://localhost:${PORT}`)
  console.log(`Outputs folder: ${config.outputsPath}\n`)
})
