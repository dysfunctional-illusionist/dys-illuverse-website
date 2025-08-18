import React, { useCallback } from "react";
import reactParticlesPkg from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function Starfield() {
  const particlesInit = useCallback(async (engine) => {
    //console.log("Initializing particles engine");
    await loadFull(engine);
  }, []);

  return (
    <>
      {/*{ <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -10, color: 'white' }}>
        //Particles component loaded
      </div> }*/}

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true }, // zIndex left default
          backgroundMask: {
            enable: false,
          },
          fpsLimit: 60,
          // interactivity: {
          //   events: {
          //     onHover: { enable: false },
          //     resize: true,
          //   },
          // },
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
          
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: true,
                mode: "bubble",
              },
              onClick: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 150,
                duration: 0.5,
                factor: 50, // strength
                speed: 0.3,
                maxSpeed: 20, 
                easing: "ease-out-back"
              },
              
            },
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
