import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ThemedButton from '../styled/ThemedButton';
import ProjectDropdown from '../ProjectDropdown/ProjectDropdown';
import getProjects from '../Firebase Functions/getProjects';
import taskSubmit from '../Firebase Functions/taskSubmit';
import updateProjectAccessed from '../Firebase Functions/updateProjectAccessed';
import { UserContext } from '../../App';

export default function ProjectDetails(props) {

    const {uid} = useContext(UserContext)


    const [selectedProject, setSelectedProject] = useState();
    const [projectInput, setProjectInput] = useState();
    const [projectId, setProjectId] = useState();
    const [dateInput, setDateInput] = useState();
    const [taskSubmitted, setTaskSubmitted] = useState(false);

    const {setShowToast} = props
    const {projectPlaceholder} = props
    const {recentProjects, setRecentProjects} = props
    const {update, selectedTask, setSelectedTask} = props


    useEffect(() => {
        if (projectPlaceholder) {
            setSelectedProject(projectPlaceholder)
        }
    }, [projectPlaceholder]);

    

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

    
    useEffect(() => {
        if (taskSubmitted && setSelectedTask) {
            setSelectedTask()
            setTaskSubmitted(false)
            setShowToast(true)
        } else if (taskSubmitted) {
            setProjectInput("")
            setSelectedProject()
            setDateInput("")
            setTaskSubmitted(false)
            setShowToast(true)
        }
    }, [taskSubmitted]);
    

    return (
        <Fragment>
            <Form.Group className="mb-3" controlId="formProject">
                <Form.Label>Project Name:</Form.Label>
                <Row>
                    <Col>
                        <Form.Control onChange={(e) => setProjectInput(e.target.value)} value={projectInput} type="task"/>
                    </Col>
                </Row>
            </Form.Group>

            <div className="mt-3">
                <ThemedButton onClick={() => console.log("Need complete") /*taskSubmit(updateProjectAccessed, setTaskSubmitted, taskInputName, selectedProject, dateInput, projectId, update, selectedTask, uid)*/}>
                    {props.children}
                </ThemedButton>
            </div>
        </Fragment>
    )
}