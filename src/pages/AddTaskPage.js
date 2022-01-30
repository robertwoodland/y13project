import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import app from '../components/base';
import ThemedButton from '../components/styled/ThemedButton';
import { UserContext } from '../App';
import ProjectDropdown from '../components/ProjectDropdown/ProjectDropdown';
import getProjects from '../components/Firebase Functions/getProjects';
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