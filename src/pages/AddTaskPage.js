import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import TaskDetails from '../components/TaskDetailsPage/TaskDetails';

export default function AddTaskPage() {
    document.body.style.overflow = "hidden"

    return (
        <ContainerPage>
            <Row>
                <Col>
                    <TaskDetails>Add Task</TaskDetails>
                </Col>
            </Row>
        </ContainerPage>
    )
}