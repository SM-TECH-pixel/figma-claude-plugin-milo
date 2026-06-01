const fs = require('fs')
const http = require('http')
const path = require('path')

// Load config
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'))
const WATCH_DIR = config.outputsPath
const WATCH_FILE = 'pending-script.json'
const WATCH_PATH = path.join(WATCH_DIR, WATCH_FILE)
const SERVER_URL = 'http://localhost:3333/run'

let debounce = null
let lastContent = null

// Create the file if it doesn't exist yet
if (!fs.existsSync(WATCH_PATH)) {
  fs.writeFileSync(WATCH_PATH, JSON.stringify({ label: '', script: '' }, null, 2))
}

function postPayload(payload) {
  const data = JSON.stringify(payload)
  const req = http.request(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
  }, (res) => {
    console.log(`[${new Date().toLocaleTimeString()}] Forwarded "${payload.label}" to server → ${res.statusCode}`)
  })
  req.on('error', (e) => console.error('POST failed:', e.message))
  req.write(data)
  req.end()
}

function onChange() {
  fs.readFile(WATCH_PATH, 'utf8', (err, raw) => {
    if (err) return console.error('Read error:', err.message)
    raw = raw.trim()
    if (raw === lastContent) return
    lastContent = raw
    try {
      const payload = JSON.parse(raw)
      if (!payload.script) return
      postPayload(payload)
    } catch (e) {
      console.error('Invalid JSON in pending-script.json:', e.message)
    }
  })
}

fs.watch(WATCH_DIR, { persistent: true }, (event, filename) => {
  if (filename === WATCH_FILE && (event === 'change' || event === 'rename')) {
    clearTimeout(debounce)
    debounce = setTimeout(onChange, 100)
  }
})

console.log(`Watching ${WATCH_DIR} for changes to ${WATCH_FILE}...`)
