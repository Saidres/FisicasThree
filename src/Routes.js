import Inicio from "./pages/Inicio";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";
import Ejercicio1 from "./pages/Ejercicio1";
import Ejercicio2 from "./pages/Ejercicio2";
import Ejercicio3 from "./pages/Ejercicio3";
import Ejercicio4 from "./pages/Ejercicio4";
import Ejercicio5 from "./pages/Ejercicio5";
import Ejercicio6 from "./pages/Ejercicio6";
import Ejercicio7 from "./pages/Ejercicio7";

const routes = [
  { path: "/", element: <Inicio />, index: true },
  { path: "proyectos", element: <Proyectos /> },
  { path: "contacto", element: <Contacto /> },
  { path: "ejercicio1", element: <Ejercicio1 /> },
  { path: "ejercicio2", element: <Ejercicio2 /> },
  { path: "ejercicio3", element: <Ejercicio3 /> },
  { path: "ejercicio4", element: <Ejercicio4 /> },
  { path: "ejercicio5", element: <Ejercicio5 /> },
  { path: "ejercicio6", element: <Ejercicio6 /> },
  { path: "ejercicio7", element: <Ejercicio7 /> },
];

export default routes; // ✅ Asegúrate de exportar correctamente
