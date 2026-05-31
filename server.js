const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root → index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// main.html route
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Optional: /api/chat endpoint
// Jika ingin menambah AI eksternal (Anthropic, OpenAI, dll), tambahkan di sini.
// Untuk sekarang, semua command logic ada di frontend (main.html).
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  // Placeholder – bisa dihubungkan ke API AI eksternal
  res.json({
    reply: `Perintah diterima: "${message}". Silakan hubungkan endpoint ini ke AI API pilihan Anda.`
  });
});

app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════╗`);
  console.log(`║   J.A.R.V.I.S  SERVER  ONLINE     ║`);
  console.log(`║   http://localhost:${PORT}            ║`);
  console.log(`╚════════════════════════════════════╝\n`);
});
