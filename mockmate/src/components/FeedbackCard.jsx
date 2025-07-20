import React from "react";

export default function FeedbackCard({ feedback }) {
  const scoreColor =
    feedback.score >= 8 ? "bg-green-500" : feedback.score >= 6 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="bg-purple-50 p-8 rounded-2xl border border-purple-200 shadow-inner">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-purple-900">AI Feedback</h3>
        <div className={`px-5 py-2 rounded-full text-white font-bold text-xl ${scoreColor}`}>
          Score: {feedback.score}/10
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
          <span role="img" aria-label="check" className="mr-2">✅</span> Strengths:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-lg text-gray-700">
          {feedback.strengths.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
          <span role="img" aria-label="cross" className="mr-2">❌</span> Weaknesses:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-lg text-gray-700">
          {feedback.weaknesses.map((weakness, index) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
          <span role="img" aria-label="bulb" className="mr-2">💡</span> Suggestions for Improvement:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-lg text-gray-700">
          {feedback.suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
