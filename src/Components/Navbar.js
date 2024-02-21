import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

// This a react-bootstrap navbar used with Offcanvas.  I added an onClick to toggle the 
// offCanvas navbar closed when a link is clicked to navigate to user's selected page

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
                        <Navbar.Brand as={NavLink} to="/">Vehicle Maintenance Record</Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls={`offcanvasNavbar-expand-${expand}`}
                            onClick={toggleOffCanvas} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelled by={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            show={show}
                            onHide={toggleOffCanvas}>
                            <Offcanvas.Header closeButton>
                                {/* The header is also a NavLink to navigate to the homepage */}
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <Nav.Link as={NavLink} to="/" onClick={toggleOffCanvas}>
                                        Vehicle Maintenance Record
                                    </Nav.Link>
                                </Offcanvas.Title>
                            </Offcanvas.Header>

                            {/* These are the NavLinks which will toggle the offCanvas navbar 
                            to close when a selection is made */}

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
                                    <Nav.Link as={NavLink} to="/otherRecord" onClick={toggleOffCanvas} >
                                        Other Maintenance
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

