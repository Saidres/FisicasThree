import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";

export default function Scene() {
  const meshRef = useRef();

  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      {/* 📌 Cámara inicial en ángulo */}
      <PerspectiveCamera makeDefault position={[2, 2, 5]} />

      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <mesh ref={meshRef} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" wireframe={true} />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
}
