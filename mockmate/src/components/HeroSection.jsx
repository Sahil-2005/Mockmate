import React from "react";

export function HeroSection() {
  const scrollToGuestStart = () => {
    const guestStartSection = document.getElementById("guest-start-section");
    if (guestStartSection) {
      guestStartSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-100 to-white rounded-3xl shadow-2xl mb-16 text-center py-20 md:py-32">
      <h1 className="text-6xl md:text-8xl font-extrabold text-purple-900 leading-tight mb-4">MockMate</h1>
      <h2 className="text-3xl md:text-4xl text-purple-700 font-bold mb-6">
        Your personal AI-powered interview coach.
      </h2>
      <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
        Practice job interviews with real-time feedback. Improve your confidence and communication — one question at a
        time.
      </p>
      <button
        onClick={scrollToGuestStart}
        className="bg-purple-700 hover:bg-purple-800 text-white px-12 py-5 rounded-full text-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      >
        Try as Guest
      </button>
    </section>
  );
}
