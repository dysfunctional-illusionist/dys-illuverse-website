import React from 'react';

export default function HCoHButton() {
  return (
    <button
      onClick={() => window.location.href = '/projects/hcoh'}
      className="
        bg-gradient-to-b from-black via-black/40 to-black/20
        font-doHyeon text-red-700 px-6 py-3 rounded-lg shadow-lg
        hover:from-black hover:via-red-900 hover:to-orange-600
        hover:text-white
        transition-colors duration-500">
      {/* <img src="/icons/star.svg" alt="Star icon" className="w-5 h-5" /> */}
      High Courts of Hell
    </button>
  );
}
