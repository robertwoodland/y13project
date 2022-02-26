import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';

export default function TasksMenuPage() {
    return (
        <ContainerPage>
            <Container align="center">

                <Row align="center">
                    <Col>
                        <h1 className="my-3">Welcome to the Tasks Page</h1>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col>
                        <Link to="/add-tasks">
                            <ThemedButton>Add Tasks</ThemedButton>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to="/show-tasks">
                            <ThemedButton>Show Tasks</ThemedButton>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </ContainerPage>
    )}