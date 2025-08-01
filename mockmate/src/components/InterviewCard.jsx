import React, { useState, useEffect, useRef } from "react";

export default function InterviewCard({
  question,
  textareaRef,
  isSubmitting,
  onSubmit,
  onSkip,
  onPrevious,
  showPrevious,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState(""); // NEW: For validation message
  const isRecordingRef = useRef(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();

    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "en-US";

    recog.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          if (textareaRef.current) {
            textareaRef.current.value += transcript + " ";
            textareaRef.current.focus();
            setError(""); // Clear error if something is spoken
          }
        } else {
          interim += transcript;
        }
      }
      setInterimTranscript(interim);
    };

    recog.onerror = (e) => {
      console.error("❌ Speech Recognition Error:", e.error);
      if (e.error === "no-speech") {
        alert("No speech detected. Please check your microphone and try again.");
      }
      setIsRecording(false);
      isRecordingRef.current = false;
    };

    recog.onend = () => {
      setInterimTranscript("");
      if (isRecordingRef.current) {
        recog.start(); // Auto-restart
      }
    };

    setRecognition(recog);
  }, [textareaRef]);

  const handleToggleRecording = () => {
    if (!recognition) return;

    if (isRecordingRef.current) {
      recognition.stop();
      setIsRecording(false);
      isRecordingRef.current = false;
    } else {
      recognition.start();
      setIsRecording(true);
      isRecordingRef.current = true;
    }
  };

  const handleValidatedSubmit = () => {
    const content = textareaRef.current?.value.trim();
    if (!content) {
      setError("❗ Please answer the question or click 'Skip' to move forward.");
      return;
    }

    setError("");
    onSubmit(); // Trigger parent's next
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
      <p className="text-xl font-semibold text-gray-800 mb-5">{question}</p>

      <div className="relative mb-3">
        <textarea
          ref={textareaRef}
          className={`w-full h-36 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-xl p-4 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-400" : "focus:ring-blue-400"
          }`}
          placeholder="Type or speak your answer..."
          disabled={isSubmitting}
        />
        {interimTranscript && (
          <div className="absolute bottom-4 left-4 right-4 text-sm text-gray-500 italic bg-white bg-opacity-70 p-2 rounded">
            {interimTranscript}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1 mb-4">{error}</p>
      )}

      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition ${
            isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleToggleRecording}
          disabled={isSubmitting}
        >
          {isRecording ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Stop
            </>
          ) : (
            <>🎙️ Voice Input</>
          )}
        </button>
        {isRecording && (
          <div className="text-sm text-red-500 flex items-center gap-2 animate-pulse">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2zm-6 8a6 6 0 0012 0h-1.5a4.5 4.5 0 01-9 0H4zm6 9a7 7 0 007-7h-2a5 5 0 01-10 0H3a7 7 0 007 7z" />
            </svg>
            Listening...
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {showPrevious && (
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}
        <div className="ml-auto flex gap-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            onClick={onSkip}
            disabled={isSubmitting}
          >
            Skip
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            onClick={handleValidatedSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
