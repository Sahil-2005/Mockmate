import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";

export function GuestStartSection() {
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateQuestions = async () => {
    if (!jobRole.trim()) {
      alert("Please enter a job position to start practicing!");
      return;
    }

    try {
      setLoading(true);
      // const response = await fetch("http://localhost:5000/api/generate-questions", {
      const response = await apiFetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobRole }),
      });

      const data = await response.json();

      if (response.ok && data.questions && Array.isArray(data.questions)) {
        localStorage.setItem("mockmate_questions", JSON.stringify(data.questions));
        navigate("/interview");
      } else {
        alert("Failed to generate questions. Please try again.");
        console.error(data);
      }
    } catch (err) {
      console.error("Error generating questions:", err);
      alert("Something went wrong. Please check the server and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="guest-start-section"
      className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-2xl text-center"
    >
      <h2 className="text-5xl md:text-6xl font-bold text-purple-900 mb-8">
        Start Practicing Instantly
      </h2>
      <div className="max-w-xl mx-auto px-4">
        <input
          type="text"
          placeholder="Enter the position you're applying for (e.g., Frontend Developer Intern)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          className="w-full p-5 text-xl border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 transition-colors duration-200 mb-6"
        />
        <button
          onClick={handleGenerateQuestions}
          disabled={loading}
          className="text-white bg-purple-700 hover:bg-purple-800 px-12 py-5 rounded-xl text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>
      </div>
    </section>
  );
}
