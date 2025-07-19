import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InterviewCard from "../components/InterviewCard"; // Adjust path based on your structure

const MOCK_QUESTIONS = [
  { id: "1", question: "Tell me about yourself." },
  { id: "2", question: "Why are you interested in this position?" },
  { id: "3", question: "What are your greatest strengths?" },
  { id: "4", question: "What are your greatest weaknesses?" },
  { id: "5", question: "Where do you see yourself in five years?" },
  { id: "6", question: "Why do you want to work for our company?" },
  { id: "7", question: "Describe a challenging situation you faced and how you overcame it." },
  { id: "8", question: "How do you handle stress and pressure?" },
  { id: "9", question: "Do you have any questions for me?" },
  { id: "10", question: "Tell me about a time you failed and what you learned from it." },
];

export default function Interview() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  const totalQuestions = MOCK_QUESTIONS.length;
  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [currentQuestionIndex]);

  const handleSubmitAnswer = () => {
    setIsSubmitting(true);
    const answer = textareaRef.current?.value || "";
    const updatedAnswers = [...userAnswers, answer];
    setUserAnswers(updatedAnswers);

    setTimeout(() => {
      setIsSubmitting(false);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (textareaRef.current) textareaRef.current.value = "";
      } else {
        const feedbackData = updatedAnswers.map((ans, index) => ({
          questionId: MOCK_QUESTIONS[index].id,
          questionText: MOCK_QUESTIONS[index].question,
          userAnswer: ans,
          score: Math.floor(Math.random() * 5) + 6,
          strengths: ["Clear communication", "Relevant examples"],
          weaknesses: ["Could be more concise", "Lacked specific metrics"],
          suggestions: ["Quantify achievements with numbers.", "Practice active listening."],
        }));
        localStorage.setItem("mockmate_feedback", JSON.stringify(feedbackData));
        navigate("/summary");
      }
    }, 1500);
  };

  const handleSkipQuestion = () => {
    const updatedAnswers = [...userAnswers, ""];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (textareaRef.current) textareaRef.current.value = "";
    } else {
      const feedbackData = updatedAnswers.map((ans, index) => ({
        questionId: MOCK_QUESTIONS[index].id,
        questionText: MOCK_QUESTIONS[index].question,
        userAnswer: ans,
        score: Math.floor(Math.random() * 5) + 6,
        strengths: ["Clear communication", "Relevant examples"],
        weaknesses: ["Could be more concise", "Lacked specific metrics"],
        suggestions: ["Quantify achievements with numbers.", "Practice active listening."],
      }));
      localStorage.setItem("mockmate_feedback", JSON.stringify(feedbackData));
      navigate("/summary");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Interview Session</h1>

      <div className="mb-8">
        <div className="text-xl font-semibold text-gray-800 mb-2">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {currentQuestion && (
        <InterviewCard
          question={currentQuestion.question}
          textareaRef={textareaRef}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitAnswer}
          onSkip={handleSkipQuestion}
        />
      )}
    </div>
  );
}
