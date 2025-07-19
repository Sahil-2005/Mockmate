import React, { useState } from "react";

export function GuestStartSection({ onStart }) {
  const [jobRole, setJobRole] = useState("");

  const handleGenerateQuestions = () => {
    if (jobRole.trim()) {
      // Optional: save job role for use in InterviewPage
      localStorage.setItem("jobRole", jobRole);
      onStart(); // switch to InterviewPage
    } else {
      alert("Please enter a job position to start practicing!");
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
          className="bg-purple-700 hover:bg-purple-800 px-12 py-5 rounded-xl text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-white"
        >
          Generate Questions
        </button>
      </div>
    </section>
  );
}
