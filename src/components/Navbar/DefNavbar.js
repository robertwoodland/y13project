import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

const linkStyle = {'text-decoration': 'initial', color: 'currentcolor'}

export default function DefNavbar() {
    return(
        <div class="mb-3">
            <Navbar bg="dark" variant="dark" expand="lg" class="mb-3">
                <Container>

                    <Link style={linkStyle} to='/home'>
                        <Navbar.Brand>Organiser</Navbar.Brand>
                    </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link>
                                <Link to="/home" style={linkStyle}>Home</Link>
                            </Nav.Link>


                            <Nav.Link>
                                <Link to="#/tasks" style={linkStyle}>Tasks</Link>
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

                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    )
}