import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ModeloInicio from "../components/ModeloInicio";

export default function Inicio() {

  return (
      <Canvas
        className="position-absolute w-100 h-100"
        style={{ position: "fixed", width: "100vw", height: "100vh" }}
        camera={{ position: [10, 5, 10], fov: 40 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 20, 5]} intensity={1.2} />
        <Environment preset="city" />
        <ModeloInicio />
        <OrbitControls enableRotate={true} />
      </Canvas>
  );
}
