// export default function InterviewCard({ question, textareaRef, isSubmitting, onSubmit, onSkip, onPrevious, showPrevious }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <p className="text-lg font-medium text-gray-800 mb-4">{question}</p>
//       <textarea
//         ref={textareaRef}
//         className="w-full h-32 border border-gray-300 rounded-md p-3 text-gray-700 mb-4"
//         placeholder="Type your answer here..."
//         disabled={isSubmitting}
//       ></textarea>
//       <div className="flex justify-between">
//         {showPrevious && (
//           <button
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//             onClick={onPrevious}
//             disabled={isSubmitting}
//           >
//             Previous
//           </button>
//         )}
//         <div className="ml-auto space-x-4">
//           <button
//             className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             onClick={onSkip}
//             disabled={isSubmitting}
//           >
//             Skip
//           </button>
//           <button
//             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//             onClick={onSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";

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
      let final = "";
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (final && textareaRef.current) {
        textareaRef.current.value += final;
        textareaRef.current.focus();
      }

      setInterimTranscript(interim);
    };

    recog.onerror = (e) => {
      console.error("Speech Recognition Error:", e.error);
    };

    recog.onend = () => {
      setIsRecording(false);
      setInterimTranscript("");
    };

    setRecognition(recog);
  }, [textareaRef]);

  const handleToggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      console.log(interimTranscript);
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsRecording((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-lg font-medium text-gray-800 mb-4">{question}</p>

      <div className="relative">
        <textarea
          ref={textareaRef}
          className="w-full h-32 border border-gray-300 rounded-md p-3 text-gray-700 mb-4"
          placeholder="Type your answer here..."
          disabled={isSubmitting}
        />
        {interimTranscript && (
          <div className="absolute bottom-3 left-3 right-3 text-gray-500 italic pointer-events-none">
            {interimTranscript}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded text-white transition ${
            isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleToggleRecording}
          disabled={isSubmitting}
        >
          {isRecording ? "Stop Recording" : "🎙️ Voice Input"}
        </button>
        <span className="text-sm text-gray-500">{isRecording && "Listening..."}</span>
      </div>

      <div className="flex justify-between">
        {showPrevious && (
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onPrevious}
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}
        <div className="ml-auto space-x-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            onClick={onSkip}
            disabled={isSubmitting}
          >
            Skip
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
