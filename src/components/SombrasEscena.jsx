import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const SombrasEscena = () => {
    const mountRef = useRef(null);
    const gui = new GUI()

    useEffect(() => {
        // Verificar que el elemento existe
        if (!mountRef.current) return;

        /**
         * Base
         */
        const scene = new THREE.Scene();

        // Tamaño
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        /**
         * Camera
         */
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(1, 1, 2);
        scene.add(camera);

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
        scene.add(ambientLight)


        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 1024
        directionalLight.shadow.mapSize.height = 1024
        directionalLight.shadow.camera.near = 1
        directionalLight.shadow.camera.far = 6
        directionalLight.shadow.camera.top = 2
        directionalLight.shadow.camera.right = 2
        directionalLight.shadow.camera.bottom = - 2
        directionalLight.shadow.camera.left = - 2
        directionalLight.shadow.radius = 10
        directionalLight.position.set(2, 2, - 1)
        gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
        gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
        gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
        gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
        scene.add(directionalLight)

        const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
        directionalLightCameraHelper.visible = false
        scene.add(directionalLightCameraHelper)

        // Spot light
        const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3)
        spotLight.castShadow = true
        spotLight.shadow.mapSize.width = 1024
        spotLight.shadow.mapSize.height = 1024
        spotLight.shadow.camera.near = 1
        spotLight.shadow.camera.far = 6
        spotLight.position.set(0, 2, 2)
        scene.add(spotLight)
        scene.add(spotLight.target)

        const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
        spotLightCameraHelper.visible = false
        scene.add(spotLightCameraHelper)

        // Point light
        const pointLight = new THREE.PointLight(0xffffff, 2.7)
        pointLight.castShadow = true
        pointLight.shadow.mapSize.width = 1024
        pointLight.shadow.mapSize.height = 1024
        pointLight.shadow.camera.near = 0.1
        pointLight.shadow.camera.far = 5
        pointLight.position.set(- 1, 1, 0)
        scene.add(pointLight)

        const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
        pointLightCameraHelper.visible = false
        scene.add(pointLightCameraHelper)

        /**
         * Materials
         */
        const material_1 = new THREE.MeshStandardMaterial()
        material_1.roughness = 0.7
        gui.add(material_1, 'metalness').min(0).max(1).step(0.001)
        gui.add(material_1, 'roughness').min(0).max(1).step(0.001)



        /**
         * Helpers
         */



        /**
         * Objects
         */
        const material_2 = new THREE.MeshStandardMaterial({ roughness: 0.4 });

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material_2);
        sphere.position.x = -1.5;
        sphere.castShadow = true

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material_2);
        plane.rotation.x = -Math.PI * 0.5;
        plane.position.y = -0.65;
        plane.receiveShadow = true

        

        scene.add(sphere, plane);

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        /**
         * GUI (Lil-GUI)
         */
        gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);

        /**
         * Resize Handling
         */
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        /**
         * Animate
         */
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = 0.1 * elapsedTime;
            sphere.rotation.x = 0.15 * elapsedTime;
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        /**
         * Cleanup on Unmount
         */
        return () => {
            //gui.destroy();
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default SombrasEscena;