import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';

export default function ScratchPage() {
    return (

        <ContainerPage>

            <Row align="center">
                <Col>
                    <Link to="/menu">
                        <ThemedButton>
                            <h2 class="text-center">
                                Menu
                            </h2>
                        </ThemedButton>
                    </Link>
                </Col>

                <Col>
                    <h1 class='text-center'>Sample Text</h1>
                </Col>
            </Row>



        </ContainerPage>
    )}