// import React from "react";

// export default function InterviewCard({ question, textareaRef, isSubmitting, onSubmit, onSkip }) {
//   return (
//     <div className="bg-white p-10 rounded-2xl shadow-2xl border border-purple-100">
//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-snug">{question}</h2>

//       <textarea
//         ref={textareaRef}
//         placeholder="Type your answer here..."
//         rows={8}
//         className="p-5 w-full text-lg border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-600 transition-colors duration-200 resize-y mb-6"
//         disabled={isSubmitting}
//       ></textarea>

//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//         <button
//           onClick={() => alert("Microphone functionality is a placeholder.")}
//           className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-8 py-4 rounded-xl text-xl font-semibold flex items-center justify-center w-full sm:w-auto"
//           disabled={isSubmitting}
//         >
//           🎙️ Record Answer
//         </button>

//         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//           <button
//             onClick={onSkip}
//             className="bg-gray-700 hover:bg-gray-800 text-white px-10 py-4 rounded-xl text-xl font-semibold w-full sm:w-auto"
//             disabled={isSubmitting}
//           >
//             Skip
//           </button>

//           <button
//             onClick={onSubmit}
//             className="bg-purple-700 hover:bg-purple-800 text-white px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Submitting..." : "Submit Answer"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function InterviewCard({ question, textareaRef, isSubmitting, onSubmit, onSkip, onPrevious, showPrevious }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-lg font-medium text-gray-800 mb-4">{question}</p>
      <textarea
        ref={textareaRef}
        className="w-full h-32 border border-gray-300 rounded-md p-3 text-gray-700 mb-4"
        placeholder="Type your answer here..."
        disabled={isSubmitting}
      ></textarea>
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
