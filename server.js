app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.[0]?.generated_text ||
      data?.generated_text ||
      "Tidak ada respon dari AI";

    res.json({ reply });

  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});
