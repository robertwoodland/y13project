import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import SubmissionToast from '../components/styled/SubmissionToast';
import TaskDetails from '../components/TaskDetails/TaskDetails';

export default function AddTaskPage() {
    document.body.style.overflow = "hidden"

    const [showToast, setShowToast] = useState(false);

    return (
        <ContainerPage>
            <SubmissionToast showToast={showToast} update={false} setShowToast={setShowToast}/>
            <Row>
                <Col>
                    <TaskDetails showToast={showToast} setShowToast={setShowToast}>Add Task</TaskDetails>
                </Col>
            </Row>
        </ContainerPage>
    )
}