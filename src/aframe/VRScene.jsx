// src/aframe/VRScene.jsx
import "aframe";
import { useEffect } from "react";

export default function VRScene() {
  useEffect(() => {
    // Puedes añadir componentes personalizados aquí
  }, []);

  return (
    <a-scene>
      <a-assets>
        <img id="skyTexture" src="/sky.jpg" alt="Sky" />
      </a-assets>
      
      <a-sky src="#skyTexture"></a-sky>
      <a-box position="0 1 -3" rotation="0 45 0" color="blue"></a-box>
      <a-sphere position="2 1 -5" radius="1.25" color="red"></a-sphere>
      <a-cylinder position="-2 0.75 -5" radius="0.5" height="1.5" color="green"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="10" height="10" color="gray"></a-plane>
      <a-camera position="0 1.6 0">
        <a-cursor></a-cursor>
      </a-camera>
    </a-scene>
  );
}