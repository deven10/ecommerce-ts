import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CartSidebar from "./CartSidebar";

export const Navbar = () => {
  return (
    <NavbarBs sticky="top" bg="dark" data-bs-theme="dark">
      <Container className="py-2">
        <NavbarBs.Brand href="#home">Ecommerce TS</NavbarBs.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store">
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>

        <CartSidebar />
      </Container>
    </NavbarBs>
  );
};
