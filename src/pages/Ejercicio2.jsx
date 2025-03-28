// 📂 src/components/Scene.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import TransformBox from "../components/TransformBox";

function Ejercicio2() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera makeDefault fov={75} position={[0, 0, 3]} />
      <TransformBox />
    </Canvas>
  );
}
export default Ejercicio2;  