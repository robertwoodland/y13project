import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import app from '../base';
import ThemedButton from '../styled/ThemedButton';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import getProjects from '../Firebase Functions/getProjects'
import taskSubmit from '../Firebase Functions/taskSubmit'

export default function TaskDetails(props) {
    const [recentProjects, setRecentProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [projectInput, setProjectInput] = useState();
    const [taskInput, setTaskInput] = useState();
    const [projectId, setProjectId] = useState();
    const [dateInput, setDateInput] = useState();
    const [taskSubmitted, setTaskSubmitted] = useState(false);
    const [taskInputName, setTaskInputName] = useState();

    const {taskInputPlaceholder} = props
    const {projectPlaceholder} = props
    const {dueDate} = props
    const {update, selectedTask, setSelectedTask} = props


    useEffect(() => {
      if (projectPlaceholder) {
          setSelectedProject(projectPlaceholder)
      }
    }, [projectPlaceholder]);

    useEffect(() => {
        if (dueDate) {
            setDateInput(dueDate)
        }
    }, [dueDate]);

    useEffect(() => {
        if (selectedTask) {
            setTaskInputName(selectedTask[0])
        } 
    }, [selectedTask]);
    
    useEffect(() => {
        if (taskInput) {
            let taskInputValid = taskInput.replace(',', '')
            setTaskInputName(taskInputValid)
        }
    }, [taskInput]);
    
    
    

    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID

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


    useEffect(() => {
      if (taskSubmitted && setSelectedTask) {
          setSelectedTask()
          setTaskSubmitted(false)
      } else if (taskSubmitted) {
          setTaskInput("")
          setSelectedProject()
          setDateInput("")
          setTaskSubmitted(false)
      }
    }, [taskSubmitted]);
    

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formProject">
                <Form.Label>Task:</Form.Label>
                <Row>
                    <Col>
                        <Form.Control onChange={(e) => setTaskInput(e.target.value)} value={taskInput} type="task" placeholder={taskInputPlaceholder ? taskInputPlaceholder : "Enter task name"}/>
                    </Col>
                </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDropdown">
                <Form.Label>Project:</Form.Label>
                
                <ProjectDropdown selectedProject={selectedProject} setSelectedProject={setSelectedProject}
                projectInput={projectInput} recentProjects={recentProjects}
                setProjectInput={setProjectInput} />

                <Form.Group className="mb-3 mt-3" controlId="formDueDate">
                    <Row>
                        <Form.Label>Due Date:</Form.Label>
                    </Row>

                    <input type="date" onChange={(e) => setDateInput(e.target.value)} value={dateInput}></input>

                </Form.Group>
            </Form.Group>

            <div className="mt-5">
                <ThemedButton onClick={() => taskSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName, selectedProject, dateInput, projectId, update, selectedTask)}>
                    {props.children}
                </ThemedButton>
            </div>
        </Form>
    )
}