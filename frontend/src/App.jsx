// frontend/src/App.jsx (updated with password field)
import { useState } from 'react';

export default function App() {
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('gpt-4');
  const [result, setResult] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [password, setPassword] = useState('');

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000/api';

  const headers = {
    'x-estimate-password': password,
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', model);

    const res = await fetch(`${apiBase}/upload`, {
      method: 'POST',
      body: formData,
      headers,
    });

    const data = await res.json();
    setResult(data);
  };

  const handleQuery = async () => {
    const res = await fetch(`${apiBase}/query`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    });

    const data = await res.json();
    setResponse(data.response || data.error || 'Error');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>EstiMate 🧠💸</h1>
      <p>Estimate and preview your GPT usage. 🔐</p>

      <div style={{ marginBottom: '1rem' }}>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🧾 File Cost Estimator</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <select value={model} onChange={(e) => setModel(e.target.value)} style={{ margin: '1rem 0' }}>
          <option value="gpt-4">GPT-4 Turbo</option>
          <option value="gpt-3.5">GPT-3.5 Turbo</option>
        </select>
        <button onClick={handleUpload}>Estimate Cost</button>

        {result && (
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Model:</strong> {result.model}</p>
            <p><strong>Input Tokens:</strong> {result.tokens}</p>
            <p><strong>Estimated Output Tokens:</strong> {result.estimatedOutput}</p>
            <p><strong>Estimated Cost:</strong> ${result.cost}</p>
          </div>
        )}
      </section>

      <section>
        <h2>💬 Try a Prompt</h2>
        <textarea
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="Enter your GPT prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleQuery}>Run Prompt</button>

        {response && (
          <div style={{ marginTop: '1rem' }}>
            <h3>Response:</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{response}</pre>
          </div>
        )}
      </section>
    </div>
  );
}
