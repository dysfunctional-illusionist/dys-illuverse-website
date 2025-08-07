import React from "react";
import Particles from "react-tsparticles";

export default function Starfield() {
  return (
    <Particles
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 50 },
          size: { value: 2 },
          move: { enable: true, speed: 0.3 },
          color: { value: "#ffffff" },
        },
      }}
    />
  );
}
