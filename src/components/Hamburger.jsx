import React, { useState } from "react";

export default function MobileMenu({ items }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="p-2 md:hidden fixed top-4 left-4 z-50 bg-black text-white rounded hover:text-red-500"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Slide-in menu */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-black z-40 p-6 transform
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          className="mb-4"
          onClick={() => setOpen(false)}
          aria-label="Close Menu"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-4 border-l-4 border-gray-900 bg-black p-4 bg-opacity-80 p-4 rounded-md">
          {items.map(({ label, href, className }) => (
            <a
              key={href}
              href={href}
              className={className}
              onClick={() => setOpen(false)} // Close on click
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Backdrop (optional) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
