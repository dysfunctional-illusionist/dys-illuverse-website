import React from "react";
import reactParticlesPkg from "react-tsparticles";

const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function Starfield() {
  return (
    <Particles
      id="particles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 150 },
          size: { value: 5 },
          color: { value: "#fff" },
          move: { enable: true, speed: 2 },
          shape: { type: "circle" },
        },
        background: { color: "#000000" },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
