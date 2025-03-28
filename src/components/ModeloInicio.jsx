import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, Sprite, SpriteMaterial, VideoTexture, Vector3 } from "three";

export default function ModeloInicio() {
  const gltf = useLoader(GLTFLoader, "/assets/model.glb");
  const texture = useLoader(TextureLoader, "/assets/baked.jpg");
  const texture2 = useLoader(TextureLoader, "/assets/picture2.png");
  const texture3 = useLoader(TextureLoader, "/assets/publicidad.jpg");
  const videoRef = useRef(document.createElement("video"));
  const modelRef = useRef();
  const chairRef = useRef();
  const speakerRef = useRef();
  const notesRef = useRef([]);
  const [chairInitialPos, setChairInitialPos] = useState(null);
  const [targetChairPosition, setTargetChairPosition] = useState(null);
  const audioRef = useRef(new Audio("/assets/ambiente.mp3"));
  const chairAudioRef = useRef(new Audio("/assets/chair-move.mp3"));
  const noteTextures = [
    useLoader(TextureLoader, "/assets/note1.png"),
    useLoader(TextureLoader, "/assets/note2.png"),
    useLoader(TextureLoader, "/assets/note3.png"),
  ];
  const noteIntervalRef = useRef(null);

  useEffect(() => {
    if (!gltf) return;

    texture.flipY = false;
    texture2.flipY = false;
    texture3.flipY = true;

    // 📌 Crear video y cargarlo como textura
    videoRef.current.src = "/assets/video.mp4"; // Cambia esto por un video real
    videoRef.current.crossOrigin = "anonymous";
    videoRef.current.loop = true;
    videoRef.current.muted = true;
    videoRef.current.play(); // 🔹 Autoplay
    const videoTexture = new VideoTexture(videoRef.current);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name === "desktop-plane-0") {
          child.material = child.material.clone();
          child.material.map = videoTexture;
        } else if (child.name === "desktop-plane-1") {
          child.material = child.material.clone();
          child.material.map = texture3;
        } else {
          child.material.map = texture;
        }
        child.material.needsUpdate = true;
        console.log("🔹 Objeto encontrado:", child.name);
      }
    });

    // 📌 Obtener referencias de los objetos
    chairRef.current = gltf.scene.getObjectByName("chair");
    speakerRef.current = gltf.scene.getObjectByName("speaker");

    if (!chairRef.current) console.warn("No se encontró la silla");
    if (!speakerRef.current) console.warn("No se encontró el speaker");

    // 📌 Guardar la posición inicial de la silla
    if (chairRef.current) {
      setChairInitialPos(chairRef.current.position.clone());
    }

    // Configurar audio en loop
    audioRef.current.loop = true;
  }, [gltf]);

  useFrame(() => {
    // 📌 Animación suave de la silla
    if (chairRef.current && targetChairPosition) {
      chairRef.current.position.lerp(targetChairPosition, 0.1);
      if (chairRef.current.position.distanceTo(targetChairPosition) < 0.01) {
        setTargetChairPosition(null); // Detener la animación
      }
    }

    // 📌 Animar las notas musicales
    notesRef.current.forEach((note, index) => {
      note.position.y += 0.02; // Subir
      note.material.opacity -= 0.005; // Desvanecerse

      if (note.material.opacity <= 0) {
        gltf.scene.remove(note);
        notesRef.current.splice(index, 1);
      }
    });
  });

  // 📌 Mover la silla cuando se hace clic en ella
  const handleChairClick = () => {
    if (chairRef.current) {
      setTargetChairPosition(new Vector3(
        chairRef.current.position.x + 1.5,
        chairRef.current.position.y,
        chairRef.current.position.z
      ));
      chairAudioRef.current.play().catch((error) => console.error("❌ Error al reproducir audio:", error));
      console.log("🪑 Silla moviéndose...");
    }
  };

  const handlePlantClick = () => {
    if (!chairRef.current || !chairInitialPos) return;

    // 📌 Verificar si la silla YA está en la posición inicial
    const distance = chairRef.current.position.distanceTo(chairInitialPos);
    if (distance < 0.01) {
      console.log("✅ La silla ya está en la posición inicial. No se mueve.");
      return; // 🔹 No hacemos nada si ya está en su posición original
    }

    console.log("🌿 Hiciste clic en la planta. Restaurando silla...");
    setTargetChairPosition(chairInitialPos.clone()); // Restaurar la posición de la silla
    chairAudioRef.current.play().catch((error) => console.error("❌ Error al reproducir audio:", error));
  };

  // 📌 Activar/Detener la música y las notas cuando se hace clic en el radio
  const handleSpeakerClick = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      console.log("🎵 Música activada");
      startNotes();
    } else {
      audioRef.current.pause();
      console.log("🔇 Música pausada");
      stopNotes();
    }
  };

  // 📌 Generar notas musicales en el speaker
  const startNotes = () => {
    stopNotes();
    noteIntervalRef.current = setInterval(() => {
      if (!speakerRef.current) return;

      const texture = noteTextures[Math.floor(Math.random() * 3)];
      const material = new SpriteMaterial({ map: texture, transparent: true, opacity: 1 });
      const note = new Sprite(material);

      const speakerPos = speakerRef.current.position.clone();
      note.position.set(speakerPos.x, speakerPos.y + 0.2, speakerPos.z);
      note.scale.set(0.3, 0.3, 0.3);

      gltf.scene.add(note);
      notesRef.current.push(note);
    }, 500);
  };

  // 📌 Detener la animación de notas
  const stopNotes = () => {
    clearInterval(noteIntervalRef.current);
  };

  // 📌 Detectar clic en los objetos del modelo
  const handleObjectClick = (event) => {
    event.stopPropagation();
    const clickedObject = event.object.name;

    if (clickedObject === "chair") {
      handleChairClick();
      console.log("🌿 Click en silla");
    } else if (clickedObject === "speaker") {
      handleSpeakerClick();
      console.log("🌿 Click en Speaker");
    } else if (clickedObject === "plant") {
      console.log("🌿 Click en planta: restaurando silla");
      handlePlantClick();
    } else if (clickedObject === "desktop-plane-1") {
      console.log("🖥️ Click en monitor 1");
    }
  };

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={1}
      position={[2.9, -1, 0]}
      onPointerDown={handleObjectClick} // 📌 Manejamos eventos aquí
    />
  );
}
