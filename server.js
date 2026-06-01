import express from "express";
import fetch from "node-fetch";

const app = express();

// penting supaya bisa baca JSON dari frontend
app.use(express.json());

// API CHAT
app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message kosong"
      });
    }

    // timeout biar tidak fetch failed di Vercel
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    const data = await response.json();

    // ambil jawaban AI (aman dari berbagai format HF)
    const reply =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      data?.error ||
      "Tidak ada respon dari AI";

    return res.json({
      success: true,
      reply
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Server error"
    });
  }
});

// untuk test server hidup
app.get("/", (req, res) => {
  res.send("JARVIS API is running 🚀");
});

// wajib untuk Vercel
export default app;
