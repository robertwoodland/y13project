import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import { ThemeContext, UserContext } from '../App';
import updatePreferences from '../components/Firebase Functions/updatePreferences';

export default function PreferencesPage() {
    const { primaryColour, setPrimaryColour, secondaryColour, setSecondaryColour } = useContext(ThemeContext)
    const { username, setUsername, uid } = useContext(UserContext)

    function restoreDefault(){
        setPrimaryColour("#c4b5fd")
        setSecondaryColour("#9333ea")
    }
    
    return (
        <ContainerPage>

            <Form className="ml-10">

                <Row>
                    <h1>User preferences:</h1>
                </Row>

                <Row className="my-3">
                        <Col className="col-lg-3">
                            <Form.Label>Change Preferred Name:</Form.Label>
                        </Col>
                        <Col className="col-lg-3">
                            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Col>
                </Row>
      
                <Row>
                        <Col className="col-lg-3">
                            <Form.Group>
                                <Form.Label className="mr-3">Background Colour:</Form.Label>
                                <input className="ml-3" type="color" value={primaryColour} onChange={(e) => setPrimaryColour(e.target.value)} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Button Colour:</Form.Label>
                                <input className="ml-3" type="color" value={secondaryColour} onChange={(e) => setSecondaryColour(e.target.value)} />
                            </Form.Group>
                        </Col>
                </Row>

                <Row>
                    <Col className="col-lg-3">
                        <ThemedButton onClick={() => restoreDefault()}>Reset Defaults</ThemedButton>
                    </Col>
                    <Col>
                        <ThemedButton onClick={() => updatePreferences(primaryColour, secondaryColour, uid)}>Save Changes</ThemedButton>
                    </Col>
                </Row>
            </Form>

        </ContainerPage>
    )}