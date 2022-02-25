import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';

export default function MenuPage() {
    return (
        <ContainerPage>
            <Container align="center">

                <Row align="center">
                    <h1 className="my-3">Welcome to the Menu Page</h1>
                </Row>

                <Row>
                    <Col>
                        <Link to='/logout'>
                            <ThemedButton>Log Out</ThemedButton>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/add-tasks">
                            <Button variant='outline-primary my-1'>Add Task</Button>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/show-tasks">
                            <Button variant='outline-primary my-1'>Show Tasks</Button>
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
            </Container>
        </ContainerPage>
    )}