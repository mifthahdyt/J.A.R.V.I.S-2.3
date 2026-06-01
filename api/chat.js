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
          inputs: "Halo, siapa kamu?"
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      success: true,
      result: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
