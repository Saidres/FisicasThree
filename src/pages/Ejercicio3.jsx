import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import AnimationFrame from "../components/AnimationFrame";

function Ejercicio3() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera makeDefault fov={75} position={[0, 0, 3]} />
      <AnimationFrame />
    </Canvas>
  );
}

export default Ejercicio3;
