import { useState } from 'react'
import './App.css'

function App() {
  const [purl, setPurl] = useState('')
  const [type, setType] = useState('vs')
  const [result, setResult] = useState(null)

  const runScanoss = async () => {
    const res = await fetch('/api/scanoss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purl, type })
    })
    const data = await res.json()
    setResult(data.output || data.error)
  }

  return (
    <div className="app">
      <h1>SCANOSS Viewer</h1>
      <input placeholder="Enter PURL" value={purl} onChange={(e) => setPurl(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="vs">License</option>
        <option value="vulns">Vulnerabilities</option>
        <option value="crypto">Crypto</option>
        <option value="prv">Provenance</option>
      </select>
      <button onClick={runScanoss}>Run</button>
      {result && <pre>{result}</pre>}
    </div>
  )
}

export default App
