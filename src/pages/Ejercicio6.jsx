import React from "react";
import Geometrias from "../components/geometrias";

/**
 * Página de demostración del Ejercicio 6:
 * Se muestra la utilización de distintos tipos de geometrías en Three.js usando react-three-fiber.
 */
const Ejercicio6 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Tipos de Geometrías en Three.js</h1>
      <p>
        Geometrías disponibles en Three.js
      </p>
      <div style={{ height: "500px" }}>
        <Geometrias />
      </div>
    </div>
  );
};

export default Ejercicio6;
