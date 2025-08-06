import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function MyParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // load all tsparticles features
  }, []);

  const particlesOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#00ff00" },
      size: { value: 5 },
      move: { enable: true, speed: 2 },
      // ...your other options
    },
  };

  return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
}
