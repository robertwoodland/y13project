import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';

export default function TasksMenuPage() {
    return (
        <ContainerPage>
            <Container align="center">

                <Row align="center">
                    <Col>
                        <h1 className="my-3">Welcome to the Tasks Page</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/add-tasks">
                            <Button variant='outline-primary my-1'>Add Tasks</Button>
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
            </Container>
        </ContainerPage>
    )}