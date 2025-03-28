import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Camaras from "../components/Camaras";

function Ejercicio4() {
  const [activeCamera, setActiveCamera] = useState("perspective");

  return (
    <>
      <div style={{ position: "absolute", top: 60, left: 20, zIndex: 10, display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => setActiveCamera("perspective")}>
          Cámara Perspectiva
        </button>
        <p>
          Una cámara en perspectiva simula la visión humana, donde los objetos más lejanos parecen más pequeños.
        </p>
      </div>
      <div style={{ position: "absolute", top: 140, left: 20, zIndex: 10, display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => setActiveCamera("orthographic")}>
          Cámara Ortográfica
        </button>
        <p>
          Una cámara ortográfica no aplica perspectiva, por lo que los objetos mantienen su tamaño sin importar la distancia.
        </p>
      </div>

      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Camaras activeCamera={activeCamera} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      </Canvas>
    </>
  );
}

export default Ejercicio4;