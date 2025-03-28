import { Outlet, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
  const location = useLocation();

  return (
    <div className="d-flex flex-column vh-100">
      {/* Cabecera fija */}
      <Navbar expand="lg" bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="#">Portafolio</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/proyectos">Proyectos</Nav.Link>
              {/* Menú desplegable con React-Bootstrap */}
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-custom">
                  Prácticas
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/ejercicio1">Práctica 1</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio2">Transformar Objetos</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio3">requestAnimationFrame</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio4">Cámaras</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio5">Pantalla Completa</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio6">Geometrías</Dropdown.Item> 
                  <Dropdown.Item href="/ejercicio7">Texturas</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio8">Plano y Figuras</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio9a">Agrupacion de Objetos - React</Dropdown.Item>
                  <Dropdown.Item href="/ejercicio9b">Agrupacion de Objetos - Three.js</Dropdown.Item>
                  <Dropdown.Item href="/luces">Luces</Dropdown.Item>
                  <Dropdown.Item href="/particulas">Partículas</Dropdown.Item>
                  <Dropdown.Item href="/manejofisicas">Físicas</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link} id="dropdown-custom">
                  Laboratorio
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/laboratorio1">Laboratorio 1</Dropdown.Item>
                  <Dropdown.Item href="/laboratorio2">Laboratorio 2</Dropdown.Item>
                  <Dropdown.Item href="/laboratorio3">Laboratorio 3</Dropdown.Item>
                  <Dropdown.Item href="/laboratorio4">Laboratorio 4</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link href="/contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor de las páginas con transiciones suaves */}
      <Container fluid className="flex-grow-1 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}

export default Layout;
