import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeJSGrupo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración del renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Crear la escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Ejes de ayuda
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    // Grupo de objetos
    const group = new THREE.Group();
    group.position.y = 1;
    scene.add(group);

    // Crear cubos
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    group.add(cube1);

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    cube2.position.x = -2;
    group.add(cube2);

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    cube3.position.x = 2;
    group.add(cube3);

    // Escalar y rotar cubo1
    cube1.scale.set(1, 1, 1);
    cube1.rotation.x = Math.PI;

    // Configuración de la cámara
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;
    scene.add(camera);

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Manejo de limpieza al desmontar el componente
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeJSGrupo;
