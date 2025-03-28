import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Euler } from "three";

export default function TransformBox() {
  const boxRef = useRef();

  useFrame(({ clock }) => {
    if (boxRef.current) {
      const time = clock.getElapsedTime(); // Tiempo en segundos

      // POSICIÓN: Mover en el eje Y en forma de onda
      boxRef.current.position.y = Math.sin(time) * 1.5;

      // ROTACIÓN: Girar en los ejes X e Y
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;

      // ESCALA: Cambiar tamaño dinámicamente
      const scaleValue = Math.abs(Math.sin(time)) + 0.5;
      //console.log(scaleValue);
      boxRef.current.scale.set(scaleValue, scaleValue, scaleValue);

      // CUATERNION: Alternativa a rotación, aplicando giro en Z
      const quaternion = new Quaternion();
      quaternion.setFromEuler(new Euler(0, 0, Math.sin(time) * 2));
      boxRef.current.quaternion.copy(quaternion);
    }
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}
