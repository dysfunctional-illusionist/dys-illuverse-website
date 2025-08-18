import React, { useState, useEffect } from "react";

// format:
// const slides = [
//   { href: "/projects/eternas-elysium", img: "/images/proj1.png", label: "Eterna's Elysium",
//   	desc:"city, simulations and technogod lore"},
//   { href: "/projects/hcoh", img: "/images/proj2.png", label: "High Courts of Hell",
//   	desc:"DEMONS. EVERYWHERE. ᵃⁿᵈ ᵗʰᵉʸ'ʳᵉ ᵃˡˡ ᵏᶦⁿᵈᵃ ʰᵒᵗ" },
// ];

export default function Carousel({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full flex justify-center">
    <div className="mx-auto relative inline-flex overflow-hidden">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map(({ href, img, label, desc }, i) => (
        <div key={i} className="min-w-full flex justify-center items-center bg-black/50 text-white">
          <a href={href} className="flex flex-col items-center">
            <img src={img} alt={label} className="mb-2 mt-3 max-h-40 rounded shadow-lg" />
            <span className="text-4xl font-handjet text-pink-400/80">{label}</span>
            <span className="font-coda text-pink-600/40">{desc}</span>
            <br></br>
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
    </div>
  );
}
