import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ThemedButton from '../styled/ThemedButton';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import getProjects from '../Firebase Functions/getProjects';
import taskSubmit from '../Firebase Functions/taskSubmit';
import updateProjectAccessed from '../Firebase Functions/updateProjectAccessed';
import { UserContext, validateInput } from '../../App';

export default function TaskDetails(props) {

    const {uid} = useContext(UserContext)


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

    // Updates relevant states when a task is selected from the list
    useEffect(() => {
        if (selectedTask) {
            setTaskInputName(selectedTask[0])
            setProjectId(selectedTask[4])
        } 
    }, [selectedTask]);
    
    // Removes commas from where an array is passed back
    useEffect(() => {
        if (taskInput) {
            let taskInputValid = taskInput.replace(',', '')
            setTaskInputName(taskInputValid)
        }
    }, [taskInput]);
    

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

    // Clears fields when a task is submitted
    useEffect(() => {
        if (taskSubmitted && setSelectedTask) {
            setSelectedTask()
            setTaskSubmitted(false)
            setShowToast(true)
        } else if (taskSubmitted) {
            setTaskInput("")
            setSelectedProject()
            setDateInput("")
            setTaskSubmitted(false)
            setShowToast(true)
        }
    }, [taskSubmitted]);
    

    return (
        <Fragment>
            <Form.Group className="mb-3" controlId="formProject">
                <Form.Label>Task:</Form.Label>
                <Row>
                    <Col>
                        <Form.Control onChange={(e) => setTaskInput(validateInput(e.target.value))} value={taskInput} type="task" 
                        placeholder={taskInputPlaceholder ? taskInputPlaceholder : "Enter task name"}/>
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
                <ThemedButton onClick={() => taskSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName,
                    selectedProject, dateInput, projectId, update, selectedTask, uid)}>
                    {props.children}
                </ThemedButton>
            </div>
        </Fragment>
    )
}