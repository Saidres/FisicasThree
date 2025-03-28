import React from "react";
import { Canvas } from "@react-three/fiber";

/**
 * Componente que renderiza varios ejemplos de geometrías de Three.js.
 * Se muestran distintos tipos de geometrías para ilustrar cómo usarlas.
 */
const Geometrias = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      {/* Luces para iluminar la escena */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Caja (BoxGeometry) */}
      <mesh position={[-3, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="tomato" />
      </mesh>

      {/* Esfera (SphereGeometry) */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      {/* Cono (ConeGeometry) */}
      <mesh position={[3, 2, 0]}>
        <coneGeometry args={[0.75, 1.5, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>

      {/* Cilindro (CylinderGeometry) */}
      <mesh position={[-3, -2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Toro (TorusGeometry) */}
      <mesh position={[0, -2, 0]}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="purple" />
      </mesh>

      {/* Dodecaedro (DodecahedronGeometry) */}
      <mesh position={[3, -2, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
};

export default Geometrias;
