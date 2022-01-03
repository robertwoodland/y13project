import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row, Navbar, Nav, NavDropdown } from 'react-bootstrap'

const btn = {backgroundColor: '#9333ea'};
const background = {backgroundColor: '#c4b5fd'}
const linkStyle = {'text-decoration': 'initial', color: 'currentcolor'}






export default function MenuPage() {
    return (

        <div class="h-screen" style={background}>
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







            <div class="bg-white border shadow-lg w-11/12 h-5/6 rounded-md m-auto p-3">
                <Container align="center">
                    <Row align="center">
                        <h1 class="my-3">Welcome to the Menu Page</h1>
                    </Row>

                    <Row>
                        <Col align="center">
                                <Link to='/logout'>
                                    <Button variant='primary mt-1 mb-1'>Log Out</Button>
                                </Link>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Link to='/sample'>
                                <Button variant='outline-primary mt-1 mb-1'>Sample Page</Button>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Link to="/scratch">
                                <Button variant='outline-primary my-1'>Scratch Page</Button>
                            </Link>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Link to="/home">
                                <Button variant='outline-primary my-1'>Home Page</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>











        </div>
    )}