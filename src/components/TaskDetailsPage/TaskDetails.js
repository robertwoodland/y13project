import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import app from '../base';
import ThemedButton from '../styled/ThemedButton';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import getProjects from '../Firebase Functions/getProjects'
import taskSubmit from '../Firebase Functions/taskSubmit'

export default function TaskDetails(props) {
    const [recentProjectNames, setRecentProjectNames] = useState([])
    const [recentProjects, setRecentProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState()
    const [projectInput, setProjectInput] = useState()
    const [taskInput, setTaskInput] = useState()
    const [projectId, setProjectId] = useState()
    const [dateInput, setDateInput] = useState()


    function handleTaskInput(e){
        setTaskInput(e.target.value)
    }

    function handleDateInput(e){
        setDateInput(e.target.value)
    }


    getProjects(setRecentProjects, setRecentProjectNames)
    // 0 is project name, 1 is accessed time, 2 is ID

    /*
    function handleTaskSubmit(){
        if (taskInput && selectedProject && dateInput){
            updateProjectAccessed()
            const creationTime = Date.now()
            if (projectId) {
                app.firestore().collection("tasks").add({
                    name: taskInput,
                    projectName: selectedProject,
                    projectId: projectId,
                    creationTime: creationTime,
                    modifiedTime: creationTime,
                    dueDate: dateInput
                })
            }
        }
    }
    */

    useEffect(() => {
        if (selectedProject) {
            let docId = ""
            app.firestore().collection("projects").where("name", "==", selectedProject)
            .get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docId = doc.id
                });
                setProjectId(docId)
            });
        }
    }, [selectedProject])


    function updateProjectAccessed(){
        const accessedTime = Date.now();
        app.firestore().collection("projects").doc(projectId).update({
            accessedTime: accessedTime
        })
    }


    return (
        <Form>
            <Form.Group className="mb-3" controlId="formProject">
                <Form.Label>Task:</Form.Label>
                <Row>
                    <Col>
                        <Form.Control onChange={handleTaskInput} value={taskInput} type="project" placeholder="Enter task name"/>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDropdown">
                <Form.Label>Project:</Form.Label>
                
                <ProjectDropdown selectedProject={selectedProject} setSelectedProject={setSelectedProject}
                recentProjectNames={recentProjectNames} projectInput={projectInput} 
                setProjectInput={setProjectInput} />

                <Form.Group className="mb-3 mt-3" controlId="formDueDate">
                    <Row>
                        <Form.Label>Due Date:</Form.Label>
                    </Row>

                    <input type="date" onChange={handleDateInput} value={dateInput}></input>

                </Form.Group>
            </Form.Group>

            <div className="mt-5">
                <ThemedButton onClick={() => taskSubmit(updateProjectAccessed, taskInput, selectedProject, dateInput, projectId)}>
                    {props.children}
                </ThemedButton>
            </div>
        </Form>
    )
}