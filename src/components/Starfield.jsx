import React, { useCallback } from "react";
import reactParticlesPkg from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function Starfield() {
  const particlesInit = useCallback(async (engine) => {
    console.log("Initializing particles engine");
    await loadFull(engine);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -10, color: 'white' }}>
        Particles component loaded
      </div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true }, // zIndex left default
          background: {
            //color: "rgba(0, 0, 0, 0.09)",
          },
          backgroundMask: {
            enable: false,
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: { enable: false },
              resize: true,
            },
          },
          particles: {
            number: {
              value: 400,
              density: {
                enable: true,
                area: 1000,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              //type: "circle",
              type: "star",
                options: {
                    sides: 5, // number of star points
                },
            },
            opacity: {
              value: { min: 0.3, max: 0.9 },
              animation: {
                enable: true,
                speed: 0.6,
                minimumValue: 0.4,
                sync: false,
              },
            },
            size: {
              value: { min: 0.5, max: 1.5 },
            },
            move: {
              enable: true,
              speed: 0.05,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
          detectRetina: true,
          background: {
            //color: "rgba(0, 0, 0, 0.09)",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
          },
          
          // ✨ parallax scroll bit ✨
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
              resize: true,
            },
            modes: {},
            detectsOn: "window",
            // Enable this for parallax effect
            parallax: {
              enable: true,
              force: 10,
              smooth: 50,
            },
          },
        }}
      />
    </>
  );
}
