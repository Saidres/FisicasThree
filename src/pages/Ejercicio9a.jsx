import React from "react";
import Objgrupo from "../components/objgrupo";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const Ejercicio9a = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Ejercicio 9a: Agrupacion de Elementos con React</h1>
      <p>
        Este ejercicio muestra un escenario 3D con una base y tres figuras geométricas (cubo, esfera y cono)
        a las que se les han aplicado texturas distintas y se toma a todas como un todo.
      </p>
      <div style={{ height: "600px" }}>
        <Canvas
          className="position-absolute w-100 h-100"
          style={{ position: "fixed", width: "100vw", height: "100vh" }}
          camera={{ position: [10, 5, 10], fov: 40 }}
        >
          <axesHelper args={[7]} />
          <Environment preset="city" />
          <Objgrupo/>
          <OrbitControls enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
};

export default Ejercicio9a;
