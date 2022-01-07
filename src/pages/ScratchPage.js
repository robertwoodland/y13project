import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import app from '../components/base';

export default function ScratchPage() {
    const [inputState, setInputState] = useState("")

    function handleInput(e){
        setInputState(e.target.value)
        console.log(e.target.value)
    }

    function handleSubmit(){
        console.log("Clicked submit")
        app.firestore().collection("tasks").add({
            name: inputState
        })
    }


    return (
        <ContainerPage>

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

                <Col align="right">
                    <Form>
                        <Form.Control onChange={handleInput} value={inputState} placeholder='Enter text here'/>
                    </Form>
                </Col>

                <Col align="left">
                        <ThemedButton onClick={handleSubmit}>Add task</ThemedButton>
                </Col>
            </Row>

            <Row>
                <h1>{inputState}</h1>
            </Row>

        </ContainerPage>
    )}