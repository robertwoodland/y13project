import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row, Navbar, Nav, NavDropdown } from 'react-bootstrap'

const btn = {backgroundColor: '#9333ea'};
const background = {backgroundColor: '#c4b5fd'}
const linkStyle = {'text-decoration': 'initial', color: 'currentcolor'}

export default function ScratchPage() {
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
                                <Nav.Link href="#link">Sample</Nav.Link>
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






            <Container fluid align="center">
                <Row class="mt-3">
                    <Col>
                        <Link to="/sample">
                            <Button style={btn}>
                                <h2 class="text-center">
                                    Sample Page
                                </h2>
                            </Button>
                        </Link>
                    </Col>

                    <Col>
                        <h1 class='text-center'>Sample Text</h1>
                    </Col>
                </Row>

            </Container>










        </div>
    )}