import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const FireSparks = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="firesparks"
      init={particlesInit}
      options={{
        fullScreen: { zIndex: -1 },
        particles: {
          number: { value: 30, density: { enable: true, area: 800 } },
          color: {
            value: ["#ff9933", "#ff6600", "#ffcc00"],
            animation: {
              enable: true,
              speed: 20,
              sync: false,
            },
          },
          opacity: {
            value: 0.7,
            random: true,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            direction: "top",
            outModes: { default: "out" },
            speed: { min: 0.5, max: 1.5 },
            angle: { value: 90, offset: 45 },
            random: true,
          },
          shape: { type: "circle" },
        },
        emitters: {
          position: { x: 50, y: 100 }, // % from top-left
          rate: {
            quantity: 2,
            delay: 0.2,
          },
          size: {
            width: 100,
            height: 0,
          },
          direction: "top",
        },
      }}
    />
  );
};

export default FireSparks;
