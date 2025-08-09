import React, { useCallback } from "react";
import reactParticlesPkg from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function HellfireParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="hellfire"
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        fpsLimit: 60,
        detectRetina: true,
        background: {
          //color: "#1a1a1a",
        },
        particles: {
          number: {
            value: 50,
            density: { enable: true, area: 200 },
          },
          color: {
            value: ["#ac0000ff", "#ff4400c2", "#f45b14d9", "#ffc04cf0"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 2,
            random: true,
            anim: {
              enable: true,
              speed: 5,
              size_min: 0.4,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: 2,
            direction: "top",
            random: true,
            straight: false,
            outModes: { default: "out" },
            bounce: false,
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 50,
              duration: 0.6,
            },
            push: {
              quantity: 2,
            },
          },
        },
        emitters: {
        direction: "top",
        life: {
          count: 0,
          duration: 0,
          delay: 0,
        },
        rate: {
          delay: 0.6,
          quantity: 3,
        },
        size: {
          width: 100,
          height: 0,
        },
        position: {
          x: 50, // center horizontally %
          y: 95, // near bottom %
        },
      },
      }}
    />
  );
}
