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
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-1.5-pro if you prefer
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // or gemini-1.5-pro if you prefer

    const prompt = `
Generate 5 technical and 5 behavioral interview questions for the role of "${jobRole}".
Respond only with a JSON array like:
[
  { "id": 1, "question": "..." },
  ...
]
Do not include markdown or triple backticks or text outside the array.
`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Sanitize response: remove ```json and ``` if present
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```json|```/g, "").trim();
    }

    let questions;
    try {
      questions = JSON.parse(responseText);
    } catch (parseError) {
      console.error("❌ Failed to parse Gemini response as JSON:", parseError);
      console.log("🔍 Raw Gemini response:", responseText);
      return res.status(500).json({ error: "Invalid JSON format returned by Gemini." });
    }

    // Send questions only if parsed successfully
    return res.json({ questions });
  } catch (err) {
    console.error("❌ Error during question generation:", err);
    return res.status(500).json({ error: "Failed to generate questions" });
  }
});



app.post("/api/feedback", async (req, res) => {
  try {
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const prompt = `
You are an interview coach. Evaluate each interview answer below and for each, provide:

1. Strengths
2. Weaknesses
3. Suggestions

Format your response as a JSON array like this:
[
  {
    "question": "....",
    "answer": "....",
    "strengths": ["..."],
    "weaknesses": ["..."],
    "suggestions": ["..."]
  },
  ...
]

Only return the JSON array and no other text.

Here are the responses:
${responses.map((r, i) => `Q${i + 1}: ${r.question}\nA: ${r.answer}`).join("\n\n")}
`;

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Clean triple backticks if present
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("❌ Failed to parse Gemini feedback JSON:", err);
      console.log("Raw Gemini Response:\n", text);
      return res.status(500).json({ error: "Invalid JSON response from Gemini" });
    }

    res.json(parsed); // Return parsed array
  } catch (err) {
    console.error("❌ Error generating feedback:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});





const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
