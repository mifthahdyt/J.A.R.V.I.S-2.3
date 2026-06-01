import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

// =======================
// API CHAT
// =======================
app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Message kosong"
      });
    }

    // =======================
    // REQUEST KE HUGGING FACE
    // =======================
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
      }
    );

    // =======================
    // AMBIL RESPONSE AMAN
    // =======================
    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      data = { error: text };
    }

    // =======================
    // AMBIL JAWABAN AI
    // =======================
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

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("JARVIS API is running 🚀");
});

// =======================
// EXPORT FOR VERCEL
// =======================
export default app;
