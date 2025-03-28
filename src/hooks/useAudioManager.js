import { useRef, useEffect } from "react";

export default function useAudioManager({ ambientSrc, chairSrc }) {
  const ambientAudioRef = useRef(new Audio(ambientSrc));
  const chairAudioRef = useRef(new Audio(chairSrc));

  useEffect(() => {
    ambientAudioRef.current.loop = true;
  }, []);

  const playAmbient = () => {
    ambientAudioRef.current.play().catch((error) =>
      console.error("Error al reproducir audio ambiental:", error)
    );
  };

  const pauseAmbient = () => {
    ambientAudioRef.current.pause();
  };

  return {
    ambientAudio: ambientAudioRef.current,
    chairAudio: chairAudioRef.current,
    playAmbient,
    pauseAmbient,
  };
}
