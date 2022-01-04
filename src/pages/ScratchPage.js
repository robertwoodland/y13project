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
        console.log("clicked submit")
        app.firestore().collection("preferences").doc("WGnshusimRRZuL4SCxNr").set({
            inputState: inputState
        })
    }


    return (
        <ContainerPage>

            <Row align="center">
                <Col class="col-6">
                    <Link to="/menu">
                        <ThemedButton>
                            <h2 class="text-center">
                                Menu
                            </h2>
                        </ThemedButton>
                    </Link>
                </Col>

                <Col align="right">
                        <input onChange={handleInput} value={inputState} placeholder='Enter text here'/>
                </Col>

                <Col align="left">
                        <ThemedButton onClick={handleSubmit}>Submit to Firebase</ThemedButton>
                </Col>
            </Row>



        </ContainerPage>
    )}