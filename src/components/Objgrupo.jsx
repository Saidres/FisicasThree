import { useLoader } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";
import { TextureLoader } from "three";

const Objgrupo = () => {
  // Cargar las texturas para cada figura (asegúrate de tener estos archivos en /assets)
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");
  const boxRef = useRef();
  const esfeRef = useRef();
  const groupRef = useRef();
  //Controla rotacion de la esfera
  const [rotation, setRotation] = useState(0.01);
  useEffect(() => {
    let animationFrameId;
    const animate = () => {
      if (groupRef.current) {
        //groupRef.current.rotation.x += rotation;
        groupRef.current.rotation.y += rotation;
        console.log("useEffect:", rotation);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [rotation]);

  const handleClick = () => {
    setRotation(rotation === 0.01 ? 0.07 : 0.01);
    console.log("Click:", rotation);
  }

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Base: plano que actúa como suelo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
      <group ref={groupRef} position={[0, 0, 0]} castShadow>
        {/* Cubo con textura */}
        <mesh ref={boxRef} position={[-4, 2, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial map={cubeTexture} />
        </mesh>

        {/* Esfera con textura */}
        <mesh
          ref={esfeRef}
          position={[0, 2, 0]}
          castShadow
          onPointerDown={handleClick} // Asegura que el clic sea detectado
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial map={sphereTexture} />
        </mesh>


        {/* Cono con textura */}
        <mesh position={[4, 1, 0]} castShadow>
          <coneGeometry args={[1, 3, 32]} />
          <meshStandardMaterial map={coneTexture} />
        </mesh>
      </group>
    </>
  );
};

export default Objgrupo;
