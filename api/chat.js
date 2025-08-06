export default async function handler(req, res) {
  const { message } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Você é uma IA de suporte ao cliente simpática e objetiva." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  res.status(200).json({ reply });
}
