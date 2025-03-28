import React, { useRef } from "react";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Camaras({ activeCamera }) {
  const cameraRef = useRef();

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.x = Math.sin(Date.now() * 0.001) * 5;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      {activeCamera === "perspective" ? (
        <PerspectiveCamera ref={cameraRef} makeDefault fov={75} position={[5, 2, 5]} />
      ) : (
        <OrthographicCamera ref={cameraRef} makeDefault zoom={50} position={[5, 2, 5]} />
      )}
    </>
  );
}
