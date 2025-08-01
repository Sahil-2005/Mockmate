import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InterviewCard from "../components/InterviewCard";

export default function Interview() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem("mockmate_questions"));
    if (!savedQuestions || savedQuestions.length === 0) {
      alert("No questions found. Please start the interview from the beginning.");
      navigate("/");
    } else {
      setQuestions(savedQuestions);
      setUserAnswers(Array(savedQuestions.length).fill("")); // Initialize with empty strings
    }
  }, [navigate]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = userAnswers[currentQuestionIndex] || "";
      textareaRef.current.focus();
    }
  }, [currentQuestionIndex, userAnswers]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = () => {
    const updated = [...userAnswers];
    updated[currentQuestionIndex] = textareaRef.current?.value || "";
    setUserAnswers(updated);
  };


  const handleSubmitAnswer = () => {
  const updated = [...userAnswers];
  updated[currentQuestionIndex] = textareaRef.current?.value || "";
  setUserAnswers(updated);

  setIsSubmitting(true);

  setTimeout(() => {
    setIsSubmitting(false);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // ✅ Save updated array explicitly
      localStorage.setItem("mockmate_answers", JSON.stringify(updated));
      navigate("/summary");
    }
  }, 800);
  };



  const handlePrevious = () => {
    handleAnswerChange();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkipQuestion = () => {
    const updated = [...userAnswers];
    updated[currentQuestionIndex] = "";
    setUserAnswers(updated);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      localStorage.setItem("mockmate_answers", JSON.stringify(userAnswers));
      navigate("/summary");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Interview Session</h1>

      {questions.length > 0 && (
        <>
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

          <InterviewCard
            question={currentQuestion.question}
            textareaRef={textareaRef}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitAnswer}
            onSkip={handleSkipQuestion}
            onPrevious={handlePrevious}
            showPrevious={currentQuestionIndex > 0}
          />
        </>
      )}
    </div>
  );
}
