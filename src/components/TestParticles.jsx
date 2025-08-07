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
import React, { useCallback } from "react";
import reactParticlesPkg from "react-tsparticles";
import { loadFull } from "tsparticles";

// Handle CommonJS/ESM interop
const Particles = reactParticlesPkg.default || reactParticlesPkg;

export default function MyParticles() {
  const particlesInit = useCallback(async (engine) => {
    console.log("Initializing engine");
    await loadFull(engine);
  }, []);

  console.log("Rendering Particles component");

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 10, color: 'white' }}>
        Particles component loaded
      </div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true }, // do NOT use zIndex here for now
          particles: {
            number: { value: 60 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
          },
        }}
      />
    </>
  );
}


