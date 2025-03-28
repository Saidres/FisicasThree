import { Canvas, useLoader } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { TextureLoader} from "three";

const Lab1 = () => {
  // Cargar las texturas para cada figura (asegúrate de tener estos archivos en /assets)
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/alpha.png");
  const coneTexture1 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const albedoTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png");

  const boxRef = useRef();
  const esfeRef = useRef();

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (boxRef.current && esfeRef.current) {
        boxRef.current.rotation.x += 0.01;
        boxRef.current.rotation.y += 0.01;
        esfeRef.current.rotation.x += 0.01;
        esfeRef.current.rotation.y += 0.01;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
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

      {/* Cubo con textura */}
      <mesh ref={boxRef} position={[-4, 2, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={cubeTexture} />
      </mesh>

      {/* Esfera con textura */}
      <mesh ref={esfeRef} position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial map={sphereTexture} />
      </mesh>

      {/* Cono con textura */}
      <mesh position={[4, 1, 0]} castShadow>
        <coneGeometry args={[1, 3, 32]} />
        <meshStandardMaterial map={coneTexture} />
      </mesh>
      {/* Cono con textura */}
      <mesh position={[8, 1, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial map={coneTexture1} />
      </mesh>
      {/* Torus con textura */}
      <mesh position={[-8, 1, 0]} castShadow>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial map={albedoTexture}
          alphaMap={alphaTexture}
          transparent={true} />
      </mesh>

    </>
  );
};

export default Lab1;
