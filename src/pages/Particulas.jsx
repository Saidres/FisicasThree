import React from "react";
import ThreeParticles from "../components/ParticulasEscena";

const Particulas= () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Introducción a Particulas</h1>
      <p>
      Las partículas son muy populares y se pueden usar para lograr varios efectos como estrellas, humo, lluvia, polvo, fuego y muchas otras cosas.
    </p>
      <div style={{ height: "400px" }}>
        <ThreeParticles />
      </div>
    </div>
  );
};

export default Particulas;
