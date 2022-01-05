import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
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
        app.firestore().collection("tasks").add({})
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
                        <input onChange={handleInput} value={inputState} placeholder='Enter text here'/>
                </Col>

                <Col align="left">
                        <ThemedButton onClick={handleSubmit}>Add task</ThemedButton>
                </Col>
            </Row>

        </ContainerPage>
    )}