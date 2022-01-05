import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Dropdown, Row, Form, Button } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import app from '../components/base';

export default function TasksPage() {

    const [nameState, setNameState] = useState("");

    function handleNameInput(e){
        setNameState(e.target.value)
        console.log(e.target.value)
    }

    function handleSubmit(){
        app.firestore().collection("tasks").add({
            name: nameState
        })
    }


    return (
        <ContainerPage>

            <Row>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Task name</Form.Label>
                        <Form.Control type="name" placeholder="Enter task name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProject">
                        <Form.Label>Project</Form.Label>
                        <Form.Control type="project" placeholder="Enter" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDropdown">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <div className="mt-5">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Row>

        </ContainerPage>
    )}