import React, { useState, useEffect } from "react";

export default function Carousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(null); // index of zoomed slide

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleZoom = (index) => {
    setZoomed(index === zoomed ? null : index);
  };

  return (
    <div className="w-full flex justify-center relative">
      {/* Carousel */}
      <div className="mx-auto relative inline-flex overflow-hidden">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map(({ type, src, href, label, desc }, i) => (
            <div
              key={i}
              className="min-w-full flex justify-center items-center bg-black/50 text-white"
            >
              <a
                href={href || "#"}
                className="flex flex-col items-center cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleZoom(i);
                }}
              >
                {type === "img" && (
                  <img src={src} alt={label} className="mb-2 mt-3 max-h-40 rounded shadow-lg" />
                )}
                {type === "video" && (
                  <video src={src} className="mb-2 mt-3 max-h-40 rounded shadow-lg" controls />
                )}
                <span className="text-4xl font-handjet text-pink-400/80">{label}</span>
                <span className="font-coda mb-4 text-pink-600/40">{desc}</span>
                <br />
              </a>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                current === i ? "bg-orange-300" : "bg-gray-900"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Zoom overlay */}
      {zoomed !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setZoomed(null)}
        >
          {slides[zoomed].type === "img" ? (
            <img src={slides[zoomed].src} alt={slides[zoomed].label} className="max-h-[80vh] max-w-[80vw] rounded shadow-lg" />
          ) : (
            <video src={slides[zoomed].src} controls className="max-h-[80vh] max-w-[80vw] rounded shadow-lg" />
          )}
        </div>
      )}
    </div>
  );
}
