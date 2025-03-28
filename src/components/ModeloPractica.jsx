import React, { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, VideoTexture, Vector3 } from "three";
import useChairAnimation from "../hooks/useChairAnimation";
import useNotesAnimation from "../hooks/useNotesAnimation";
import useAudioManager from "../hooks/useAudioManager";

export default function ModeloPractica() {
  // ================= CARGA DE MODELO Y TEXTURAS ===================
  const gltf = useLoader(GLTFLoader, "/assets/model.glb");
  const [bakedTexture, pictureTexture, publicidadTexture] = useLoader(TextureLoader, [
    "/assets/baked.jpg",
    "/assets/picture2.png",
    "/assets/publicidad.jpg"
  ]);

  // ────────────── CREACIÓN DE VIDEO Y TEXTURA ──────────────
  const videoElement = useMemo(() => {
    const video = document.createElement("video");
    video.src = "/assets/video.mp4";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.play().catch((err) => console.error("Error al reproducir el video:", err));
    return video;
  }, []);

  const videoTexture = useMemo(() => new VideoTexture(videoElement), [videoElement]);

  // ────────────── GESTIÓN DE AUDIO ──────────────
  const { ambientAudio, chairAudio, playAmbient, pauseAmbient } = useAudioManager({
    ambientSrc: "/assets/ambiente.mp3",
    chairSrc: "/assets/chair-move.mp3",
  });

  // ────────────── REFS Y ESTADOS ──────────────
  const modelRef = useRef();
  const chairRef = useRef();
  const speakerRef = useRef();
  const [chairInitialPos, setChairInitialPos] = useState(null);
  const [targetChairPosition, setTargetChairPosition] = useState(null);

  // ────────────── CONFIGURACIÓN DE TEXTURAS ──────────────
  useEffect(() => {
    bakedTexture.flipY = false;
    pictureTexture.flipY = false;
    publicidadTexture.flipY = true;
  }, [bakedTexture, pictureTexture, publicidadTexture]);

  // ────────────── ASIGNACIÓN DE MATERIALES Y REFERENCIAS EN GLTF ──────────────
  useEffect(() => {
    if (!gltf) return;
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        // Clonamos el material para evitar efectos colaterales
        child.material = child.material.clone();
        if (child.name === "desktop-plane-0") {
          child.material.map = videoTexture;
        } else if (child.name === "desktop-plane-1") {
          child.material.map = publicidadTexture;
        } else {
          child.material.map = bakedTexture;
        }
        child.material.needsUpdate = true;
      }
    });

    // Extraer referencias de objetos clave
    chairRef.current = gltf.scene.getObjectByName("chair");
    speakerRef.current = gltf.scene.getObjectByName("speaker");

    if (chairRef.current) {
      setChairInitialPos(chairRef.current.position.clone());
    }
  }, [gltf, videoTexture, bakedTexture, publicidadTexture]);

  // ────────────── ANIMACIONES ──────────────
  useChairAnimation(chairRef, targetChairPosition, setTargetChairPosition);
  const { startNotes, stopNotes } = useNotesAnimation({ gltf, speakerRef });

  // ────────────── MANEJADOR CENTRALIZADO DE CLICS ──────────────
  const handleObjectClick = useCallback(
    (event) => {
      event.stopPropagation();
      const clickedObject = event.object.name;

      switch (clickedObject) {
        case "chair":
          if (chairRef.current) {
            const newTarget = new Vector3(
              chairRef.current.position.x + 1.5,
              chairRef.current.position.y,
              chairRef.current.position.z
            );
            setTargetChairPosition(newTarget);
            chairAudio.play().catch((error) =>
              console.error("Error al reproducir audio de la silla:", error)
            );
          }
          break;

        case "speaker":
          if (ambientAudio.paused) {
            playAmbient();
            startNotes();
          } else {
            pauseAmbient();
            stopNotes();
          }
          break;

        case "plant":
          if (chairRef.current && chairInitialPos) {
            const distance = chairRef.current.position.distanceTo(chairInitialPos);
            if (distance >= 0.01) {
              setTargetChairPosition(chairInitialPos.clone());
              chairAudio.play().catch((error) =>
                console.error("Error al reproducir audio de la silla:", error)
              );
            }
          }
          break;

        default:
          break;
      }
    },
    [
      ambientAudio,
      chairInitialPos,
      playAmbient,
      pauseAmbient,
      startNotes,
      stopNotes,
      chairAudio,
    ]
  );

  // ────────────── RENDERIZADO ──────────────
  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={1}
      position={[2.9, -1, 0]}
      onPointerDown={handleObjectClick}
    />
  );
}
