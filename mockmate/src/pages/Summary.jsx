// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import FeedbackCard from "../components/FeedbackCard";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export default function SummaryPage() {
//   const [feedback, setFeedback] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const summaryRef = useRef();

//   useEffect(() => {
//     const storedFeedback = localStorage.getItem("mockmate_feedback");
//     if (storedFeedback) {
//       setFeedback(JSON.parse(storedFeedback));
//     }
//     setLoading(false);
//   }, []);

// const handleDownloadPdf = async () => {
//   if (!summaryRef.current) {
//     alert("Content not ready for PDF export.");
//     return;
//   }

//   try {
//     const element = summaryRef.current;

//     window.scrollTo(0, 0); // ensure entire content is in view
//     element.classList.add("bg-white");
//     element.style.padding = "20px";

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: "#ffffff",
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     let position = 0;

//     while (position < pdfHeight) {
//       pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);
//       position += pageHeight;
//       if (position < pdfHeight) {
//         pdf.addPage();
//       }
//     }

//     pdf.save("interview-summary.pdf");
//   } catch (error) {
//     console.error("PDF generation error:", error);
//     alert("Something went wrong while generating the PDF.");
//   }
// };


//   const handleTryAnotherInterview = () => {
//     localStorage.removeItem("mockmate_feedback");
//     navigate("/");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (feedback.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
//         <h2 className="text-2xl md:text-3xl font-bold mb-4">No Interview Summary Available</h2>
//         <p className="text-lg text-gray-600 mb-8">Please complete an interview session to see your feedback.</p>
//         <button
//           onClick={handleTryAnotherInterview}
//           className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 text-lg rounded-md"
//         >
//           Start New Interview
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <div ref={summaryRef}>
//         <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10">Interview Summary</h1>

//         <div className="space-y-10">
//           {feedback.map((item, index) => (
//             <div key={item.questionId || index} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
//               <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
//                 Question {index + 1}: {item.questionText}
//               </h2>
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Answer:</h3>
//                 <p className="bg-gray-50 p-5 rounded-xl text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
//                   {item.userAnswer || (
//                     <span className="italic text-gray-500">No answer provided (question skipped)</span>
//                   )}
//                 </p>
//               </div>
//               <FeedbackCard feedback={item} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
//         <button
//         //   onClick={handleDownloadPdf}
//           onClick={() => window.print()}

//           className="bg-purple-700 hover:bg-purple-800 text-white px-10 py-4 text-xl flex items-center justify-center rounded-md"
//         >
//           📥 Download PDF
//         </button>
//         <button
//           onClick={handleTryAnotherInterview}
//           className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-4 text-xl rounded-md"
//         >
//           Try Another Interview
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Summary() {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("mockmate_feedback"));
    if (!storedData || storedData.length === 0) {
      alert("No feedback found. Please complete the interview first.");
      navigate("/");
    } else {
      setFeedbackData(storedData);
    }
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Interview Summary
      </h1>

      {feedbackData.map((item, index) => (
        <div
          key={item.questionId || index}
          className="border rounded-lg shadow-sm p-4 mb-6 bg-white"
        >
          <h2 className="text-lg font-semibold text-purple-700 mb-2">
            Q{index + 1}: {item.questionText}
          </h2>
          <p className="text-gray-800 mb-2">
            <strong>Your Answer:</strong> {item.userAnswer || "Skipped"}
          </p>
          <p className="text-gray-800 mb-2">
            <strong>Score:</strong> {item.score}/10
          </p>
          <div className="mb-2">
            <strong>Strengths:</strong>
            <ul className="list-disc list-inside text-green-700">
              {item.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <strong>Weaknesses:</strong>
            <ul className="list-disc list-inside text-red-600">
              {item.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Suggestions:</strong>
            <ul className="list-disc list-inside text-blue-600">
              {item.suggestions.map((sug, i) => (
                <li key={i}>{sug}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
