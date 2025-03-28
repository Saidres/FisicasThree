import { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader, SpriteMaterial, Sprite } from "three";

export default function useNotesAnimation({ gltf, speakerRef }) {
  // Cargar las texturas para las notas
  const noteTextures = [
    useLoader(TextureLoader, "/assets/note1.png"),
    useLoader(TextureLoader, "/assets/note2.png"),
    useLoader(TextureLoader, "/assets/note3.png"),
  ];

  const notesRef = useRef([]);
  const noteIntervalRef = useRef(null);

  // Actualizar la animación de las notas en cada frame
  useFrame(() => {
    notesRef.current.forEach((note, index) => {
      note.position.y += 0.02;             // Subir la nota
      note.material.opacity -= 0.005;      // Desvanecerla

      if (note.material.opacity <= 0) {
        gltf.scene.remove(note);
        notesRef.current.splice(index, 1);
      }
    });
  });

  const startNotes = () => {
    stopNotes(); // Limpiar intervalos anteriores
    noteIntervalRef.current = setInterval(() => {
      if (!speakerRef.current) return;

      const randomTexture = noteTextures[Math.floor(Math.random() * noteTextures.length)];
      const material = new SpriteMaterial({ map: randomTexture, transparent: true, opacity: 1 });
      const note = new Sprite(material);

      // Posicionar la nota en la parte superior del speaker
      const speakerPos = speakerRef.current.position.clone();
      note.position.set(speakerPos.x, speakerPos.y + 0.2, speakerPos.z);
      note.scale.set(0.3, 0.3, 0.3);

      gltf.scene.add(note);
      notesRef.current.push(note);
    }, 500);
  };

  const stopNotes = () => {
    if (noteIntervalRef.current) {
      clearInterval(noteIntervalRef.current);
      noteIntervalRef.current = null;
    }
  };

  // Limpiar el intervalo cuando se desmonte el componente
  useEffect(() => {
    return () => {
      stopNotes();
    };
  }, []);

  return { startNotes, stopNotes };
}
