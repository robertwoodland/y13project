import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import { UserContext } from '../App';

export default function MenuPage() {
    const {username} = useContext(UserContext); // Gets username from UserContext provider
    return (
        <ContainerPage>
            <Container align="center">

                <Row align="center">
                    <h1 className="my-3">Hello {username}, Welcome to the Menu Page</h1>
                </Row>


                {/* 
                    All of the following are the button links to each area:
                */}

                <Row>
                    <Col>
                        <Link to='/logout'>
                            <ThemedButton>Log Out</ThemedButton>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/tasks-menu">
                            <Button variant='outline-primary my-1'>Tasks</Button>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/timer">
                            <Button variant='outline-primary my-1'>Timer</Button>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/projects">
                            <Button variant='outline-primary my-1'>Manage Projects</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </ContainerPage>
    )}
    