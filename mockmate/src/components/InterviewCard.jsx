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

// import React, { useState, useEffect } from "react";

// export default function InterviewCard({
//   question,
//   textareaRef,
//   isSubmitting,
//   onSubmit,
//   onSkip,
//   onPrevious,
//   showPrevious,
// }) {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [interimTranscript, setInterimTranscript] = useState("");

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recog = new SpeechRecognition();
//     recog.continuous = true;
//     recog.interimResults = true;
//     recog.lang = "en-US";

//     recog.onresult = (event) => {
//       let final = "";
//       let interim = "";

//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         const transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//           final += transcript + " ";
//         } else {
//           interim += transcript;
//         }
//       }

//       if (final && textareaRef.current) {
//         textareaRef.current.value += final;
//         textareaRef.current.focus();
//       }

//       setInterimTranscript(interim);
//     };

//     recog.onerror = (e) => {
//       console.error("Speech Recognition Error:", e.error);
//     };

//     recog.onend = () => {
//       setIsRecording(false);
//       setInterimTranscript("");
//     };

//     setRecognition(recog);
//   }, [textareaRef]);

//   const handleToggleRecording = () => {
//     if (!recognition) return;

//     if (isRecording) {
//       console.log(interimTranscript);
//       recognition.stop();
//     } else {
//       recognition.start();
//     }

//     setIsRecording((prev) => !prev);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <p className="text-lg font-medium text-gray-800 mb-4">{question}</p>

//       <div className="relative">
//         <textarea
//           ref={textareaRef}
//           className="w-full h-32 border border-gray-300 rounded-md p-3 text-gray-700 mb-4"
//           placeholder="Type your answer here..."
//           disabled={isSubmitting}
//         />
//         {interimTranscript && (
//           <div className="absolute bottom-3 left-3 right-3 text-gray-500 italic pointer-events-none">
//             {interimTranscript}
//           </div>
//         )}
//       </div>

//       <div className="flex items-center justify-between mb-4">
//         <button
//           type="button"
//           className={`flex items-center gap-2 px-4 py-2 rounded text-white transition ${
//             isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           onClick={handleToggleRecording}
//           disabled={isSubmitting}
//         >
//           {isRecording ? "Stop Recording" : "🎙️ Voice Input"}
//         </button>
//         <span className="text-sm text-gray-500">{isRecording && "Listening..."}</span>
//       </div>

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




// import React, { useState, useEffect } from "react";

// export default function InterviewCard({
//   question,
//   textareaRef,
//   isSubmitting,
//   onSubmit,
//   onSkip,
//   onPrevious,
//   showPrevious,
// }) {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const [interimTranscript, setInterimTranscript] = useState("");

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recog = new SpeechRecognition();

//     recog.continuous = true;
//     recog.interimResults = true;
//     recog.lang = "en-US";

//     recog.onstart = () => console.log("🎤 Recognition started");
//     recog.onaudiostart = () => console.log("🔊 Audio capturing started");
//     recog.onaudioend = () => console.log("🔇 Audio capturing ended");
//     recog.onspeechstart = () => console.log("🗣️ Speech detected");
//     recog.onspeechend = () => console.log("🤐 Speech ended");

//     recog.onresult = (event) => {
//       let interim = "";
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         const result = event.results[i];
//         const transcript = result[0].transcript;

//         if (result.isFinal) {
//           if (textareaRef.current) {
//             textareaRef.current.value += transcript + " ";
//             textareaRef.current.focus();
//           }
//         } else {
//           interim += transcript;
//         }
//       }
//       setInterimTranscript(interim);
//     };

//     recog.onerror = (e) => {
//       console.error("❌ Speech Recognition Error:", e.error);
//       if (e.error === "no-speech") {
//         alert("No speech detected. Please check your microphone and try again.");
//       }
//       setIsRecording(false);
//     };

//     recog.onend = () => {
//       console.log("🛑 Recognition ended");
//       setIsRecording(false);
//       setInterimTranscript("");
//     };

//     setRecognition(recog);
//   }, [textareaRef]);

//   const handleToggleRecording = () => {
//     if (!recognition) return;

//     if (isRecording) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }

//     setIsRecording((prev) => !prev);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
//       <p className="text-xl font-semibold text-gray-800 mb-5">{question}</p>

//       <div className="relative mb-5">
//         <textarea
//           ref={textareaRef}
//           className="w-full h-36 border border-gray-300 rounded-xl p-4 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Type or speak your answer..."
//           disabled={isSubmitting}
//         />
//         {interimTranscript && (
//           <div className="absolute bottom-4 left-4 right-4 text-sm text-gray-500 italic bg-white bg-opacity-70 p-2 rounded">
//             {interimTranscript}
//           </div>
//         )}
//       </div>

//       <div className="flex items-center justify-between mb-6">
//         <button
//           type="button"
//           className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition ${
//             isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//           onClick={handleToggleRecording}
//           disabled={isSubmitting}
//         >
//           {isRecording ? (
//             <>
//               <span className="relative flex h-3 w-3">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
//               </span>
//               Stop
//             </>
//           ) : (
//             <>
//               🎙️ Voice Input
//             </>
//           )}
//         </button>
//         {isRecording && (
//           <div className="text-sm text-red-500 flex items-center gap-2 animate-pulse">
//             <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2zm-6 8a6 6 0 0012 0h-1.5a4.5 4.5 0 01-9 0H4zm6 9a7 7 0 007-7h-2a5 5 0 01-10 0H3a7 7 0 007 7z" />
//             </svg>
//             Listening...
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between">
//         {showPrevious && (
//           <button
//             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
//             onClick={onPrevious}
//             disabled={isSubmitting}
//           >
//             Previous
//           </button>
//         )}
//         <div className="ml-auto flex gap-4">
//           <button
//             className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
//             onClick={onSkip}
//             disabled={isSubmitting}
//           >
//             Skip
//           </button>
//           <button
//             className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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
  const isRecordingRef = useRef(false); // Track recording state safely across closures

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

    recog.onstart = () => console.log("🎤 Recognition started");
    recog.onaudiostart = () => console.log("🔊 Audio capturing started");
    recog.onaudioend = () => console.log("🔇 Audio capturing ended");
    recog.onspeechstart = () => console.log("🗣️ Speech detected");
    recog.onspeechend = () => console.log("🤐 Speech ended");

    recog.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          if (textareaRef.current) {
            textareaRef.current.value += transcript + " ";
            textareaRef.current.focus();
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
      console.log("🛑 Recognition ended");
      setInterimTranscript("");

      if (isRecordingRef.current) {
        recog.start(); // Auto-restart
        console.log("🔁 Restarted recognition");
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
      <p className="text-xl font-semibold text-gray-800 mb-5">{question}</p>

      <div className="relative mb-5">
        <textarea
          ref={textareaRef}
          className="w-full h-36 border border-gray-300 rounded-xl p-4 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type or speak your answer..."
          disabled={isSubmitting}
        />
        {interimTranscript && (
          <div className="absolute bottom-4 left-4 right-4 text-sm text-gray-500 italic bg-white bg-opacity-70 p-2 rounded">
            {interimTranscript}
          </div>
        )}
      </div>

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
