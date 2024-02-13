import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../App.css';

export default function Navigation() {
    const [show, setShow] = useState(false);

    const toggleOffCanvas = () => {
        setShow((show) => !show);
    };

    return (
        <>
            {[false].map((expand) => (
                <Navbar bg="dark" data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Brand as={NavLink} to="/home">Vehicle Maintenance Record</Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            onClick={toggleOffCanvas} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            show={show}
                            onHide={toggleOffCanvas}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Vehicle Maintenance Record
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="NavBody">
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link as={NavLink} to="/oilChange" onClick={toggleOffCanvas}>
                                        Oil Change Records
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/tires" onClick={toggleOffCanvas}>
                                        Tire Records
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/preventativeMaintenance" onClick={toggleOffCanvas} >
                                        Preventative Maintenance
                                    </Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

