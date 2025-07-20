import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard"; // Adjust path based on where you place FeedbackCard.jsx

export default function Summary() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFeedback = localStorage.getItem("mockmate_feedback");
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
    setLoading(false);
  }, []);

  const handleDownloadPdf = () => {
    alert("PDF Download functionality is a placeholder.");
  };

  const handleTryAnotherInterview = () => {
    localStorage.removeItem("mockmate_feedback");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">No Interview Summary Available</h2>
        <p className="text-lg text-gray-600 mb-8">Please complete an interview session to see your feedback.</p>
        <button
          onClick={handleTryAnotherInterview}
          className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg rounded-md"
        >
          Start New Interview
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10">Interview Summary</h1>

      <div className="space-y-10">
        {feedback.map((item, index) => (
          <div key={item.questionId || index} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              Question {index + 1}: {item.questionText}
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Answer:</h3>
              <p className="bg-gray-50 p-5 rounded-xl text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                {item.userAnswer || <span className="italic text-gray-500">No answer provided (question skipped)</span>}
              </p>
            </div>
            <FeedbackCard feedback={item} />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
        <button
          onClick={handleDownloadPdf}
          className="bg-purple-700 hover:bg-purple-800 text-white px-10 py-4 text-xl flex items-center justify-center rounded-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
          </svg>
          Download PDF
        </button>
        <button
          onClick={handleTryAnotherInterview}
          className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-4 text-xl rounded-md"
        >
          Try Another Interview
        </button>
      </div>
    </div>
  );
}
