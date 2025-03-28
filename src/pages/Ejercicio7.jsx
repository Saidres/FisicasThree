import React from "react";
import Texturas from "../components/Texturas";

/**
 * Página de demostración del Ejercicio 7:
 * Se muestra un cubo animado que rota y se desplaza, mostrando dos texturas alternadas en sus caras.
 */
const Ejercicio7 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Texturas y Animación en un Cubo</h1>
      <p>
        En este ejercicio se demuestra cómo aplicar dos texturas alternadas a las caras de un cubo. El cubo rota y se mueve en un camino circular, permitiendo observar ambas texturas de forma dinámica.
      </p>
      <div style={{ height: "500px" }}>
        <Texturas />
      </div>
    </div>
  );
};

export default Ejercicio7;
