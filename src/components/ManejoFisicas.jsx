import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'lil-gui';
import * as CANNON from 'cannon-es';

import popSound from '../assets/crash.mp3';

const ManejoFisicas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Debug UI
        const gui = new GUI();
        const debugObject = {};

        // Base
        const scene = new THREE.Scene();

        // Configuración igual que antes...
        const textureLoader = new THREE.TextureLoader();
        const cubeTextureLoader = new THREE.CubeTextureLoader();

        const environmentMapTexture = cubeTextureLoader.load([
            '/static/textures/environmentMaps/0/px.png',
            '/static/textures/environmentMaps/0/nx.png',
            '/static/textures/environmentMaps/0/py.png',
            '/static/textures/environmentMaps/0/ny.png',
            '/static/textures/environmentMaps/0/pz.png',
            '/static/textures/environmentMaps/0/nz.png'
        ]);

        // Físicas
        const world = new CANNON.World();
        world.gravity.set(0, -9.82, 0);

        const defaultMaterial = new CANNON.Material('default');
        const defaultContactMaterial = new CANNON.ContactMaterial(
            defaultMaterial,
            defaultMaterial,
            {friction: 0.1, restitution: 0.6}
        );
        world.addContactMaterial(defaultContactMaterial);
        world.defaultContactMaterial = defaultContactMaterial;

        // Piso
        const floorShape = new CANNON.Plane();
        const floorBody = new CANNON.Body({mass: 0});
        floorBody.addShape(floorShape);
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
        world.addBody(floorBody);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({
                color: '#777777',
                metalness: 0.3,
                roughness: 0.4,
                envMap: environmentMapTexture,
                envMapIntensity: 0.5
            })
        );
        floor.receiveShadow = true;
        floor.rotation.x = -Math.PI * 0.5;
        scene.add(floor);

        // Luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
        scene.add(ambientLight);
        gui.add(ambientLight, 'intensity').min(0).max(3).step(0.1).name('Amb. Light');

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.camera.far = 15;
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Tamaños
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Cámara
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(-3, 3, 3);
        scene.add(camera);

        // Renderizador
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Controles
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Control de teclado
        const keyStates = {};

        window.addEventListener('keydown', (event) => {
            keyStates[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            keyStates[event.code] = false;
        });
        // Funciones de creación de objetos
        const createBarrier = (width, height, depth, x, y, z) => {
            // Crear la malla Three.js
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(width, height, depth),
                new THREE.MeshStandardMaterial({
                    color: '#000000',
                    metalness: 0.3,
                    roughness: 0.4,
                    envMap: environmentMapTexture,
                    envMapIntensity: 0.5,
                    transparent: true,
                    opacity: 0.5
                })
            );
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);

            // Crear el cuerpo físico Cannon.js
            const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
            const body = new CANNON.Body({
                mass: 0, // Masa 0 = objeto estático
                position: new CANNON.Vec3(x, y, z),
                shape: shape,
                material: defaultMaterial
            });
            world.addBody(body);

            // Guardar referencia para actualizar
            objectsToUpdate.push({mesh, body});
        };

        // Cuerpo físico del jugador (coche)
        const playerShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.25, 1));
        const playerBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 1, 0),
            shape: playerShape,
            material: defaultMaterial
        });
        playerBody.angularDamping = 0.5;
        playerBody.fixedRotation = true;
        playerBody.angularFactor.set(0, 1, 0);
        playerBody.angularDamping = 0.9;
        world.addBody(playerBody);

        // Manejo de Resize
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        // Objeto temporal mientras se carga el modelo
        let playerMesh = new THREE.Object3D();
        scene.add(playerMesh);

        // Cargar el modelo GLTF
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            '/src/car/scene.gltf',
            (gltf) => {
                // Eliminar el objeto temporal
                scene.remove(playerMesh);

                // Usar el modelo cargado
                playerMesh = gltf.scene;

                // Ajustar escala según el tamaño del modelo
                playerMesh.scale.set(0.01, 0.01, 0.01);

                // Configurar sombras
                playerMesh.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                // Posicionamiento inicial
                playerMesh.position.copy(playerBody.position);

                // Añadir a la escena
                scene.add(playerMesh);
            },
            (progress) => {
                console.log('Cargando modelo:', (progress.loaded / progress.total * 100).toFixed(2) + '%');
            },
            (error) => {
                console.error('Error al cargar el modelo:', error);
            }
        );

        // Resto del código para crear objetos...
        const objectsToUpdate = [];

        // Funciones de creación de objetos
        // (createSphere, createbox, createBarrier, etc.)

        // Crear barreras
        const barrierHeight = 10;
        createBarrier(10.5, barrierHeight, 1, 0, barrierHeight / 2, 5.5);
        createBarrier(10.5, barrierHeight, 1, 0, barrierHeight / 2, -5.5);
        createBarrier(1, barrierHeight, 10.5, 5.5, barrierHeight / 2, 0);
        createBarrier(1, barrierHeight, 10.5, -5.5, barrierHeight / 2, 0);

        // Animación
        const clock = new THREE.Clock();
        let oldElapsedTime = 0;
        let animationId;

        const tick = () => {
            animationId = requestAnimationFrame(tick);
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = elapsedTime - oldElapsedTime;
            oldElapsedTime = elapsedTime;

            world.step(1 / 60, deltaTime, 3);

            // Controles del coche
            const acceleration = 50;
            const turnSpeed = 1.5;

            // Dirección del coche
            let forward = new CANNON.Vec3(
                -Math.sin(playerBody.quaternion.y),
                0,
                -Math.cos(playerBody.quaternion.y)
            );

            if (keyStates['KeyW']) {
                playerBody.applyForce(forward.scale(acceleration), playerBody.position);
            }
            if (keyStates['KeyS']) {
                playerBody.applyForce(forward.scale(-acceleration), playerBody.position);
            }
            if (keyStates['KeyA']) {
                playerBody.angularVelocity.set(0, turnSpeed, 0);
            }
            if (keyStates['KeyD']) {
                playerBody.angularVelocity.set(0, -turnSpeed, 0);
            }

            // Simulación de fricción
            playerBody.velocity.x *= 0.98;
            playerBody.velocity.z *= 0.98;

            // Actualizar posición de la malla en Three.js
            if (playerMesh) {
                playerMesh.position.copy(playerBody.position);
                playerMesh.quaternion.copy(playerBody.quaternion);
            }

            // Actualizar objetos
            for (const object of objectsToUpdate) {
                object.mesh.position.copy(object.body.position);
                object.mesh.quaternion.copy(object.body.quaternion);
            }

            controls.update();
            renderer.render(scene, camera);
        };

        animationId = requestAnimationFrame(tick);

        // Crear objeto de audio para colisiones
        const collisionSound = new Audio(popSound);
        collisionSound.volume = 0.5; // Ajusta el volumen según necesites

        // Configurar detector de colisiones
        playerBody.addEventListener('collide', (event) => {
            // Verificar si la colisión es con una barrera
            const contactBodies = [event.body, event.target];

            // Comprobar si alguno de los cuerpos en contacto es una barrera
            const isBarrierCollision = objectsToUpdate.some(object =>
                contactBodies.includes(object.body)
            );

            if (isBarrierCollision) {
                // Evitar que el sonido se superponga reiniciándolo
                collisionSound.currentTime = 0;
                // Reproducir sonido
                collisionSound.play().catch(error =>
                    console.error("Error al reproducir sonido:", error)
                );
            }
        });
        // Cleanup
        return () => {
            gui.destroy();
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <div ref={mountRef}/>;
};

export default ManejoFisicas;