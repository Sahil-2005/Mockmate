import React from "react";

export function HowItWorks() {
  return (
    <section
      id="how-it-works-section"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl mb-16"
    >
      <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="bg-purple-100 p-5 rounded-full mb-8">
            {/* Lightbulb Icon */}
            <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 18h6m-3 3v-3m0-18a7 7 0 00-4 12.9V17h8v-2.1A7 7 0 0012 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Step 1: Enter Your Role</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Simply tell MockMate the job position you're applying for. Our AI will tailor questions just for you.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="bg-green-100 p-5 rounded-full mb-8">
            {/* MessageSquareText Icon */}
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Step 2: AI Interaction</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Answer AI-generated interview questions. Our system evaluates your responses in real-time.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="bg-blue-100 p-5 rounded-full mb-8">
            {/* Award Icon */}
            <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 3v18m9-9H3" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Step 3: Receive Feedback</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Get detailed feedback on your strengths, weaknesses, and actionable suggestions to improve.
          </p>
        </div>
      </div>
    </section>
  );
}
