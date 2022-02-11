import React, { useState, useEffect, Fragment } from 'react';
import { Col, Row, Form, Toast, ToastContainer } from 'react-bootstrap';
import ThemedButton from '../styled/ThemedButton';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import getProjects from '../Firebase Functions/getProjects';
import taskSubmit from '../Firebase Functions/taskSubmit';
import updateProjectAccessed from '../Firebase Functions/updateProjectAccessed';

export default function TaskDetails(props) {
    const [recentProjects, setRecentProjects] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [projectInput, setProjectInput] = useState();
    const [taskInput, setTaskInput] = useState();
    const [projectId, setProjectId] = useState();
    const [dateInput, setDateInput] = useState();
    const [taskSubmitted, setTaskSubmitted] = useState(false);
    const [taskInputName, setTaskInputName] = useState();

    const {setShowToast} = props
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
            setProjectId(selectedTask[4])
        } 
    }, [selectedTask]);
    
    useEffect(() => {
        if (taskInput) {
            let taskInputValid = taskInput.replace(',', '')
            setTaskInputName(taskInputValid)
        }
    }, [taskInput]);
    
    function handleSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName, selectedProject, dateInput, projectId, update, selectedTask){
        if (selectedTask || taskInputName) {
            setShowToast(true)
        }
        taskSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName, selectedProject, dateInput, projectId, update, selectedTask)
    }
    

    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID


    // Sets projectId after project selected from dropdown
    useEffect(() => {
        if (selectedProject && recentProjects) {
            const projectNames = recentProjects.map((project) => project[0])
            let index = projectNames.indexOf(selectedProject)

            if (index >= 0) {
                setProjectId(recentProjects[index][2])
            }
        }
    }, [selectedProject]);
    

    // Sets projectId after project is created and added to database
    useEffect(() => {
        
    
    }, [])

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
        <Fragment>
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
                setProjectInput={setProjectInput} setProjectId={setProjectId} />

                <Form.Group className="mb-3 mt-3" controlId="formDueDate">
                    <Row>
                        <Form.Label>Due Date:</Form.Label>
                    </Row>

                    <input type="date" onChange={(e) => setDateInput(e.target.value)} value={dateInput}></input>

                </Form.Group>
            </Form.Group>

            <div className="mt-5">
                <ThemedButton onClick={() => handleSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName, selectedProject, dateInput, projectId, update, selectedTask)}>
                    {props.children}
                </ThemedButton>
            </div>
        </Fragment>
    )
}