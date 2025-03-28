import React from "react";
import Objgrupothrjs from "../components/Objgrupothrjs";


const Ejercicio9b = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ejercicio 9b: Agrupacion de Elementos sin React</h1>
      <p>
        Este ejercicio muestra un escenario 3D con una base y tres figuras geométricas (cubo, esfera y cono)
        a las que se les han aplicado texturas distintas y se toma a todas como un todo, trabajadas completamente desde three.js.
      </p>
      <div style={{ height: "600px" }}>
        <Objgrupothrjs />
      </div>
    </div>
  );
};

export default Ejercicio9b;
