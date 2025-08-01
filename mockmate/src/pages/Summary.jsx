import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const summaryRef = useRef();

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("mockmate_questions")) || [];
    const answers = JSON.parse(localStorage.getItem("mockmate_answers")) || [];

    const combined = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "",
    }));

    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responses: combined }),
        });

        const data = await response.json();
        setFeedback(data);
        localStorage.setItem("mockmate_feedback", JSON.stringify(data));
      } catch (err) {
        console.error("Feedback fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleTryAnotherInterview = () => {
    localStorage.removeItem("mockmate_feedback");
    localStorage.removeItem("mockmate_questions");
    localStorage.removeItem("mockmate_answers");
    navigate("/");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-800"></div>
      </div>
    );
  }

  if (!feedback.length) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">No Feedback Available</h2>
        <p className="text-gray-600 mb-6 text-lg">Please complete the interview to receive feedback.</p>
        <button
          onClick={handleTryAnotherInterview}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg"
        >
          Start New Interview
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div ref={summaryRef}>
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 print:text-3xl">
          📝 Interview Feedback Summary
        </h1>

        <div className="space-y-12">
          {feedback.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                Question {idx + 1}
              </h2>
              <p className="text-lg text-gray-900 mb-2">
                <span className="font-medium">Q:</span> {item.question}
              </p>
              <p className="text-base text-gray-700 italic mb-6">
                <span className="font-medium">Your Answer:</span>{" "}
                {item.answer || <span className="text-gray-400">No answer provided</span>}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-green-600 font-semibold mb-2 flex items-center">
                    ✅ Strengths
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {item.strengths.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-red-600 font-semibold mb-2 flex items-center">
                    ❌ Weaknesses
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {item.weaknesses.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-blue-600 font-semibold mb-2 flex items-center">
                    💡 Suggestions
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {item.suggestions.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-14 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl text-lg shadow-md"
        >
          🖨️ Print / Save as PDF
        </button>
        <button
          onClick={handleTryAnotherInterview}
          className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-xl text-lg shadow-md"
        >
          🔁 Try Another Interview
        </button>
      </div>
    </div>
  );
}
