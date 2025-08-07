// import React, { useCallback, useEffect } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// // export default function MyParticles({ type = "stars" }) {
// //   const particlesInit = useCallback(async (engine) => {
// //     await loadFull(engine);
// //   }, []);

// export default function MyParticles({ type = "stars" }) {
//     console.log("MyParticles mounted"); // should show in browser console

//     useEffect(() => {
//     console.log("Hydration happened — useEffect ran");
// }, []);

// const particlesInit = useCallback(async (engine) => {
// await loadFull(engine);
// }, []);

//   const starsOptions = {
//     particles: {
//         number: { value: 100 },
//         color: { value: "#ffffff" },
//         shape: { type: "circle" },
//         opacity: { value: 0.8, random: true },
//         size: { value: 1.5, random: true },
//         move: {
//           enable: true,
//           speed: 0.2,
//           direction: "top",
//           outModes: { default: "out" }
//         }
//       }
//   };

//   const fireOptions = {
//     particles: {
//         number: { value: 80 },
//         color: { value: ["#ff9900", "#ff6600", "#ff3300"] },
//         shape: { type: "circle" },
//         opacity: { value: 0.6, random: true },
//         size: { value: 3, random: true },
//         move: {
//           enable: true,
//           speed: 1,
//           direction: "top",
//           outModes: { default: "destroy" }
//         }
//       }
//   };

//   let particlesOptions;

//   switch (type) {
//     case "fire":
//       particlesOptions = fireOptions;
//       break;
//     case "stars":
//     default:
//       particlesOptions = starsOptions;
//   }

//   console.log("Particles is:", Particles);
//   return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
// }
// src/components/MyParticles.jsx


import React, { useCallback } from "react";
import Particles from "react-tsparticles";  // default import!
import { loadFull } from "tsparticles";

export default function MyParticles() {
  const particlesInit = useCallback(async (engine) => {
    console.log("engine:", engine);
    await loadFull(engine);
  }, []);

  const options = {
    particles: {
      number: { value: 20 },
      size: { value: 3 },
      move: { enable: true },
    },
  };

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
}

