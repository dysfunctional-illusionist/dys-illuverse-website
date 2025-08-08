import React from 'react';

export default function ElysiumButton() {
  return (
    <button
      onClick={() => window.location.href = '/projects/eternas-elysium'}
      className="
        bg-gradient-to-r from-black via-blue-900 to-cyan-500
        font-coda text-cyan-300 px-6 py-3 rounded-lg shadow-lg
        hover:from-cyan-400 hover:via-purple-600 hover:indigo-700
        hover:text-pink-200
        transition-colors duration-500"
    >
      {/* <img src="/icons/star.svg" alt="Star icon" className="w-5 h-5" /> */}
      Eterna's Elysium
    </button>
  );
}
