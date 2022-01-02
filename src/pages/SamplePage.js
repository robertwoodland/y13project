import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Navbar, Container, Nav, NavDropdown, Row, Col} from 'react-bootstrap'

export default function SamplePage() {
    return (
        <div class="bg-purple-300 h-screen w-screen">
            
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
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


            <Container fluid class="p-2 mt-2 px-2" align="center">
                    <Row>
                        <Container class="my-4">
                            <Row>
                                <h1>
                                    This is the Sample Page
                                </h1>
                            </Row>


                            <Row>
                                <Col align="right">
                                    <Link to='/home'>
                                        <Button variant='primary'>Home</Button>
                                    </Link>                         
                                </Col>

                                <Col align="left">
                                    <Link to="/scratch">
                                        <Button variant='outline-primary'>Scratch Page</Button>
                                    </Link>
                                </Col>
                            </Row>


                        </Container>
                    </Row>
            </Container>


        </div>

    )
}