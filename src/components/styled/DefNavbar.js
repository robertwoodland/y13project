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

                            <Nav.Link as={Link} to="/menu">
                                Menu
                            </Nav.Link>


                            <Nav.Link as={Link} to="/tasks-menu">
                                Tasks
                            </Nav.Link>

                            <Nav.Link as={Link} to="/timer">
                                Timer
                            </Nav.Link>

                            <Nav.Link as={Link} to="/projects">
                                Projects
                            </Nav.Link>

                            <Nav.Link as={Link} to="/preferences">
                                Preferences
                            </Nav.Link>

                            <Nav.Link as={Link} to="/logout">
                                Log Out
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    )
}