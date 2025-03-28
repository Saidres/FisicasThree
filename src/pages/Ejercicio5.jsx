import React from "react";
import ScreenChange from "../components/screenchange";

const Ejercicio5 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pantalla Completa y Cambio de Tamaño</h1>
      <p>
        En este ejercicio se demuestra cómo alternar entre pantalla completa y
        detectar los cambios de tamaño de la ventana.
      </p>
      <ScreenChange />
    </div>
  );
};

export default Ejercicio5;
