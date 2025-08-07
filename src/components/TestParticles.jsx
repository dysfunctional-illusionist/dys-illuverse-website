// import React from "react";
// import reactParticlesPkg from "react-tsparticles";

// // Handle CommonJS default export fallback
// const Particles = reactParticlesPkg.default || reactParticlesPkg;

// export default function MyParticles() {
//   return (
//     <Particles
//       id="tsparticles"
//       options={{
//         particles: {
//           number: { value: 50 },
//           size: { value: 3 },
//         },
//       }}
//     />
//   );
// }

// import React, { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadStarsPreset } from "tsparticles-preset-stars";

// export default function TestParticles() {
//   const particlesInit = useCallback(async (engine) => {
//     console.log("Init:", engine);
//     await loadStarsPreset(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {
//     console.log("Loaded:", container);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       options={{
//         preset: "stars",
//         fullScreen: {
//           enable: true,
//           zIndex: -1,
//         },
//       }}
//     />
//   );
// }

// src/components/TestParticles.jsx
import React from "react";
import { Particles } from "react-tsparticles"; // ✅ named import

export default function TestParticles() {
  return (
    <Particles
      id="tsparticles-basic"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: "#000000",
        },
        particles: {
          number: {
            value: 80,
          },
          size: {
            value: 3,
          },
          move: {
            enable: true,
            speed: 1,
          },
          color: {
            value: "#ffffff",
          },
        },
      }}
    />
  );
}
