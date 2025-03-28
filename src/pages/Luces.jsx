import React from "react";
import TiposLuces from "../components/TiposLuces";


const Luces = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Introducción a las Luces</h1>
      <p>
      La iluminación es un componente crucial en cualquier entorno 3D, ya que determina cómo se ven los objetos, sus colores, sombras y texturas. En Three.js, las luces simulan diferentes fuentes de luz presentes en el mundo real, permitiendo crear ambientes realistas o estilizados según tus necesidades.      </p>
      <div style={{ height: "400px" }}>
        <TiposLuces />
      </div>
    </div>
  );
};

export default Luces;
