import React from "react";
import reactParticlesPkg from "react-tsparticles";

// Handle CommonJS default export fallback
const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function MyParticles() {
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          number: { value: 50 },
          size: { value: 3 },
        },
      }}
    />
  );
}
