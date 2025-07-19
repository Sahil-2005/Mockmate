const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-questions", async (req, res) => {
  const { jobRole } = req.body;

  if (!jobRole) return res.status(400).json({ error: "Job role required" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
Generate 5 technical and 5 behavioral interview questions for the role of "${jobRole}". 
Return only an array of JSON objects like:
[
  { "id": "1", "question": "..." },
  ...
]
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const questions = JSON.parse(responseText); // Ensure Gemini outputs clean JSON

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
