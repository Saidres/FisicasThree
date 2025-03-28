import React from "react";
import Scene from "../threejs/Scene"; // 🔹 Importamos la escena 3D
function Proyectos() {
  return (
    <div className="text-center">
      <h1 className="text-primary">💻 Mis Proyectos</h1>
      <p>Aquí puedes ver los proyectos en los que he trabajado.</p>
      <div style={{ height: "60vh" }}>
        <Scene />
      </div>
    </div>
  );
}

export default Proyectos;