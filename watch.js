const fs = require('fs')
const http = require('http')
const path = require('path')

const WATCH_DIR  = '/Users/milobeyts/Library/Application Support/Claude/local-agent-mode-sessions/9ae746ba-f509-4082-84dd-e2febfc1450b/777fec50-36ef-4334-bdb1-93c866d4deb3/local_df696a2d-913c-4f83-90aa-d8b527eafc8b/outputs'
const WATCH_FILE = 'pending-script.json'
const WATCH_PATH = path.join(WATCH_DIR, WATCH_FILE)
const RUN_URL    = 'http://localhost:3333/run'

let debounce = null

function post(payload) {
  const data = JSON.stringify(payload)
  const req = http.request(RUN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
  }, (res) => {
    let body = ''
    res.on('data', chunk => body += chunk)
    res.on('end', () => {
      try {
        const json = JSON.parse(body)
        console.log(`[${ts()}] Posted → version ${json.version} · "${payload.label || 'Untitled script'}"`)
      } catch {
        console.log(`[${ts()}] Posted (no JSON response)`)
      }
    })
  })
  req.on('error', (err) => console.error(`[${ts()}] POST failed: ${err.message}`))
  req.write(data)
  req.end()
}

function onChange() {
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    fs.readFile(WATCH_PATH, 'utf8', (err, raw) => {
      if (err) return console.error(`[${ts()}] Read error: ${err.message}`)
      try {
        const payload = JSON.parse(raw)
        if (!payload.script) return console.warn(`[${ts()}] No "script" field — skipping`)
        post(payload)
      } catch {
        console.error(`[${ts()}] Invalid JSON — skipping`)
      }
    })
  }, 100)
}

function ts() {
  return new Date().toLocaleTimeString()
}

if (!fs.existsSync(WATCH_PATH)) {
  fs.writeFileSync(WATCH_PATH, JSON.stringify({ label: '', script: '' }, null, 2))
  console.log(`[${ts()}] Created ${WATCH_PATH}`)
}

fs.watch(WATCH_DIR, { persistent: true }, (event, filename) => {
  if (filename === WATCH_FILE && (event === 'change' || event === 'rename')) onChange()
})

console.log(`[${ts()}] Watching ${WATCH_DIR} for changes to ${WATCH_FILE}`)
