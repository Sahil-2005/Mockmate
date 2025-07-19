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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or gemini-1.5-pro if you prefer

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


const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
