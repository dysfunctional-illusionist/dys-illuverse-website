import React, { useEffect } from "react";

export default function MyParticles() {
  useEffect(() => {
    console.log("react component hydrated");
  }, []);

  return <div>Hello from ParticlesTest</div>;
}
