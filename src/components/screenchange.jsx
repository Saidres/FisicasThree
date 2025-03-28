import React, { useState, useEffect } from "react";

const ScreenChange = () => {
  // Estado para controlar si estamos en pantalla completa
  const [isFullScreen, setIsFullScreen] = useState(false);
  // Estado para almacenar el tamaño actual de la ventana
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Función para alternar pantalla completa
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Solicita pantalla completa al elemento raíz del documento
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error("Error al activar pantalla completa:", err));
    } else {
      // Sale de pantalla completa
      document.exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch((err) => console.error("Error al salir de pantalla completa:", err));
    }
  };

  // Efecto para actualizar el tamaño de la ventana en cada cambio
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
      <h2>
        {isFullScreen
          ? "Pantalla completa activada"
          : "Pantalla completa desactivada"}
      </h2>
      <button onClick={toggleFullScreen} style={{ marginBottom: "1rem" }}>
        {isFullScreen
          ? "Salir de pantalla completa"
          : "Activar pantalla completa"}
      </button>
      <p>
        Tamaño de la ventana: {windowSize.width}px x {windowSize.height}px
      </p>
    </div>
  );
};

export default ScreenChange;
