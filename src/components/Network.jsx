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
      id="tsparticles"
      init={particlesInit}

      options={{
        fullScreen: { enable: true },
        fpsLimit: 60,
        detectRetina: true,
        particles: {
            number: {
            value: 120,
            density: { enable: true, area: 800 },
            },
            color: {
            value: ["#7ce9ff68", "#f287f848"], // neon cyan + magenta
            },
            shape: {
            type: ["circle", "square"], // chips + nodes
            },
            opacity: {
            value: 0.8,
            animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.4,
                sync: false,
            },
            },
            size: {
            value: { min: 2, max: 4 },
            animation: {
                enable: true,
                speed: 2,
                minimumValue: 2,
                sync: false,
            },
            },
            links: {
            enable: true,
            distance: 180, // traces between nodes
            color: "#00fff7",
            opacity: 0.3,
            width: 1.5,
            triangles: { enable: false },
            },
            move: {
            enable: true,
            speed: 0.15, // faint drift
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "out" },
            },
        },

        interactivity: {
            detectsOn: "canvas",
            events: {
            onHover: {
                enable: true,
                mode: "grab", // pull neon lines towards cursor
            },
            onClick: {
              enable: true,
              mode: "attract",
            },
            resize: true,
            },
            modes: {
              grab: {
                  distance: 200,
                  links: { opacity: 0.6 },
              },
              attract: {
                distance: 200, // how far the attraction reaches
                duration: 0.7,
                factor: 1,     // attraction force multiplier
                easing: "ease-out-circ"
              }
            },
        },
        }}

    />
  );
}
