import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Lab_3 = () => {
    const canvas = useRef();

    useEffect(() => {
        if (!canvas.current) return;

        // Configuración del renderizador
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvas.current.appendChild(renderer.domElement);

        // Configuración de la escena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb); // Azul claro como fondo

        // Luz ambiental para mejorar la visualización
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        // Luz direccional para sombras
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Crear el plano (superficie de la mesa)
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, side: THREE.DoubleSide }); // Verde tipo mesa de billar
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        // Función para crear barreras de la mesa
        const createBarrier = (width, height, depth, x, y, z) => {
            const barrier = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, depth),
                new THREE.MeshStandardMaterial({ color: 0x8b4513 }) // Marrón tipo madera
            );
            barrier.position.set(x, y, z);
            scene.add(barrier);
        };

        // Altura de las barreras
        const barrierHeight = 0.5;

        // Crear las 4 barreras estilo mesa de billar
        createBarrier(10.5, barrierHeight, 1, 0, barrierHeight / 2, 5.5); // Borde superior
        createBarrier(10.5, barrierHeight, 1, 0, barrierHeight / 2, -5.5); // Borde inferior
        createBarrier(1, barrierHeight, 10.5, 5.5, barrierHeight / 2, 0); // Borde derecho
        createBarrier(1, barrierHeight, 10.5, -5.5, barrierHeight / 2, 0); // Borde izquierdo

        // Crear cámara
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        // Configurar OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Animación
        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return <div ref={canvas} />;
};

export default Lab_3;
