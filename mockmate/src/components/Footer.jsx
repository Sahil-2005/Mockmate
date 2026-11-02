import React from "react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 px-6 md:px-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm mb-4 md:mb-0">© 2026 MockMate. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="https://github.com/Sahil-2005/Mockmate" className="text-gray-400 hover:text-purple-400 transition-colors">
            {/* GitHub Icon (replace with actual SVG or an <img> if needed) */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 008 11c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.7-1.5-2.7-.3-5.5-1.3-5.5-5.7 0-1.2.5-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3 1.1a10.4 10.4 0 015.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.4-2.8 5.3-5.5 5.7.4.4.7 1 .7 2v3c0 .3.2.6.8.5A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-purple-400 transition-colors text-sm font-medium flex items-center"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
