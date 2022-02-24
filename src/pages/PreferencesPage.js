import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import { ThemeContext } from '../App';

export default function PreferencesPage() {
    const { primaryColour, setPrimaryColour, secondaryColour, setSecondaryColour } = useContext(ThemeContext)

    return (
        <ContainerPage>

            <Form className="ml-10">

                <Row align="center">
                    <Col className="col-6">
                        <Link to="/menu">
                            <ThemedButton>
                                <h2 className="text-center">
                                    Menu
                                </h2>
                            </ThemedButton>
                        </Link>
                    </Col>


                    <Col align="centre">
                            <ThemedButton>Add task</ThemedButton>
                    </Col>
                </Row>


      
                <Row>
                    
                        <Col>

                                <Form.Label className="mr-3">Background Colour:</Form.Label>
                                <input className="mt-3 ml-3" type="color" value={primaryColour} onChange={(e) => setPrimaryColour(e.target.value)} />

                        </Col>

                        <Col>
                            <Form.Label>Button Colour:</Form.Label>
                        </Col>
                </Row>

            </Form>

        </ContainerPage>
    )}