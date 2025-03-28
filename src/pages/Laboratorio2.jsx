import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Lab2 from "../components/Lab_2";


const Laboratorio2 = () => {
  return (
    <Canvas
      className="position-absolute w-100 h-100"
      style={{ position: "fixed", width: "100vw", height: "100vh" }}
      camera={{ position: [10, 5, 10], fov: 40 }}
    >
      <ambientLight intensity={1} />
      <axesHelper args={[2]} />
      <directionalLight position={[5, 20, 5]} intensity={1.2} />
      <Environment preset="city" />
      <Lab2 />
      <OrbitControls enableRotate={true} />
    </Canvas>
  );
};

export default Laboratorio2;
