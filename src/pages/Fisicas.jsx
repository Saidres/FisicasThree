import React from "react";
import ManejoFisicas from "../components/ManejoFisicas";


const Fisicas = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Introducción a las Físicas</h1>
      <p>
      La física puede ser una de las características más interesantes que puedes añadir a una experiencia WebGL. A la gente le gusta jugar con los objetos, verlos chocar, colapsar, caer y rebotar como en mi portafolio </p>
      <div style={{ height: "400px" }}>
        <ManejoFisicas/>
      </div>
    </div>
  );
};

export default Fisicas;
