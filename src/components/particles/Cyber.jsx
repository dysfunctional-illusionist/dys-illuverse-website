import React, { useCallback } from "react";
import reactParticlesPkg from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function CircuitBoard() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="encrypted-neon-grid"
      init={particlesInit}
      options={{
        // background: {
        //   color: "#0a0a0a", // dark cyber background
        // },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "explode" },
          },
          modes: {
            repulse: { distance: 75, duration: 0.6 },
            explode: { quantity: 6, distance: 80, duration: 0.3 },
          },
        },
        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          color: {
            value: ["#557b76ba", "#4a9297ad", "#00ff9594"], // neon colors
          },
          shape: {
            type: ["char"],
            // type: ["polygon", "char"],
            // polygon: { nb_sides: 6 },
            character: {
              value: ["0", "1", "<", ">", "{", "}", "🔒"],
              font: "Verdana",
              style: "",
              weight: "400",
            },
          },
          opacity: {
            value: 0.8,
            random: true,
            animation: { enable: true, speed: 0.6, minimumValue: 0.3 },
          },
          size: {
            value: { min: 1, max: 10 },
            random: true,
            animation: { enable: true, speed: 2, minimumValue: 3 },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#3f5b5d0f",
            opacity: 0.5,
            width: 1.5,
            // shadow: { enable: true, color: "#6efdff2e", blur: 3 },
            warp: true,
            blink: true, 
            triangles: { enable: false },
            dash: { enable: true, length: 6, spacing: 4 },
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" },
            attract: { enable: false },
          },
          collisions: {
            enable: true, // allows collision jitters
          },
        },
        detectRetina: true,
      }}
    />
  );
}
