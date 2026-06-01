export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: "Halo"
        })
      }
    );

    const text = await response.text();

    res.status(200).json({
      status: response.status,
      result: text
    });

  } catch (error) {
    res.status(500).json({
      error: String(error),
      stack: error.stack
    });
  }
}
