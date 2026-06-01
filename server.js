const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/popup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'popup.html'));
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
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
