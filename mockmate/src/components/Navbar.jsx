import React from "react";

export function Navbar() {
  const scrollToGuestStart = () => {
    const guestStartSection = document.getElementById("guest-start-section");
    if (guestStartSection) {
      guestStartSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-50 to-white shadow-lg py-4 px-6 md:px-8 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-3xl font-extrabold text-purple-800 hover:text-purple-900 transition-colors">
          MockMate
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-purple-600 transition-colors text-lg font-medium">
            Home
          </a>
          <a
            href="#how-it-works-section"
            className="text-gray-700 hover:text-purple-600 transition-colors text-lg font-medium"
          >
            How it Works
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors text-lg font-medium">
            Contact
          </a>
        </div>
        <button
          onClick={scrollToGuestStart}
          className="bg-purple-700 hover:bg-purple-800 shadow-md text-white px-8 py-3 rounded-xl text-xl font-semibold transition-colors duration-300"
        >
          Try as Guest
        </button>
      </div>
    </nav>
  );
}
