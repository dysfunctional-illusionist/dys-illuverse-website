import { useState } from "react";

export default function Dropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav>
      <div className="relative inline-block text-left">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="
            inline-flex justify-center w-full
            rounded-md border border-red-300/0 shadow-sm px-4 py-2
            bg-black text-sm font-medium text-white
            focus:outline-none
            hover:bg-gradient-to-r hover:from-red-800/30 hover:via-purple-600/40 hover:to-indigo-700/30
            hover:text-pink-200
          ">
          <h1 className="text-base text-gray-200/20">✦ PLAY WITH BACKGROUNDS ✦</h1>
          {/* <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          > */}
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </button>

        {dropdownOpen && (
          <div className="
          origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg
          bg-black/60 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1">
              <a href="/showcase/sunset" className="block px-4 py-2 text-sm !text-orange-200 hover:bg-purple-900">Sunset</a>
              <a href="/showcase/hell" className="block px-4 py-2 text-sm !text-red-400 hover:bg-red-900">Hell</a>
              <a href="/showcase/networks" className="block px-4 py-2
                text-sm !text-cyan-200
                hover:bg-blue-700
                ">Elysium</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
