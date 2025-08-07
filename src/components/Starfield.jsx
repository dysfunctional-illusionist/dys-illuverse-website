// import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { useCallback } from "react";

import React from "react";
import reactParticlesPkg from "react-tsparticles";

// Handle CommonJS default export fallback
const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function Starfield() {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  return (
    <Particles
      id="stars"
      init={particlesInit}
      options={{ preset: "stars", fullScreen: { zIndex: -1 } }}
      style={{ position: 'fixed', top: 0, left: 0 }}
    />
  );
}
