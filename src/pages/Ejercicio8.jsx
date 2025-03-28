import React from "react";
import Escenario from "../components/Escenario";

const Ejercicio8 = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ejercicio 8: Escenario con Base y Figuras Geométricas Texturizadas</h1>
      <p>
        Este ejercicio muestra un escenario 3D con una base y tres figuras geométricas (cubo, esfera y cono)
        a las que se les han aplicado texturas distintas.
      </p>
      <div style={{ height: "600px" }}>
        <Escenario />
      </div>
    </div>
  );
};

export default Ejercicio8;
