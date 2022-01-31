import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const linkStyle = {'textDecoration': 'initial', color: 'currentcolor'}

export default function DefNavbar() {
    return(
        <div className="mb-3">
            <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
                <Container>

                    <Link style={linkStyle} to='/menu'>
                        <Navbar.Brand>Organiser</Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link>
                                <Link to="/menu" style={linkStyle}>Menu</Link>
                            </Nav.Link>


                            <Nav.Link>
                                <Link to="/tasks-menu" style={linkStyle}>Tasks</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="#/timer" style={linkStyle}>Timer</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="#/projects" style={linkStyle}>Projects</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="#/preferences" style={linkStyle}>Preferences</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/logout" style={linkStyle}>Log Out</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    )
}