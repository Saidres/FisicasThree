import React from "react";
import { useGLTF } from "@react-three/drei";

export default function ProgrammerModel() {
  const { scene, materials } = useGLTF("/assets/office.glb");

  // 🔹 Recorremos los materiales para asegurarnos de que están activados
  Object.values(materials).forEach((material) => {
    material.roughness = 0.8; // Ajusta la rugosidad para evitar brillos raros
    material.metalness = 0.1; // Evita que parezca un metal
  });

  return <primitive object={scene} scale={1} />;
}
