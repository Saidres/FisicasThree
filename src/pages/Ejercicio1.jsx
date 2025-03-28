import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ModeloPractica from "../components/ModeloPractica";
import CuboInteractivo from "../components/CuboInteractivo";
function Ejercicio1() {
  return (
    <Canvas
      className="position-absolute w-100 h-100"
      style={{ position: "fixed", width: "100vw", height: "100vh" }}
      camera={{ position: [10, 5, 10], fov: 40 }}
    >
      <ModeloPractica />
      <CuboInteractivo />
      <OrbitControls enableRotate={true} />
    </Canvas>);
}
export default Ejercicio1;     