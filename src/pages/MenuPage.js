import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Row, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import DefNavbar from '../components/Navbar/DefNavbar'

const background = {backgroundColor: '#c4b5fd'}

export default function MenuPage() {
    return (

        <div class="h-screen" style={background}>
        
            <DefNavbar/>


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