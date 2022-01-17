import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Dropdown, Row, Form, FormLabel } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import app from '../components/base';
import ThemedDropdown from '../components/styled/ThemedDropdown';
import ThemedButton from '../components/styled/ThemedButton';
import { UserContext } from '../App';

export default function AddTaskPage() {
    const [recentProjectNames, setRecentProjectNames] = useState([])
    const [selectedProject, setSelectedProject] = useState()
    const [projectInput, setProjectInput] = useState()
    const [taskInput, setTaskInput] = useState()
    const [projectId, setProjectId] = useState()
    const [dateInput, setDateInput] = useState()
    const userId = useContext(UserContext).userId

    function handleProjectInput(e){
        setProjectInput(e.target.value)
    }

    function handleProjectSelect(projectName){
        setSelectedProject(projectName)
    }

    function handleTaskInput(e){
        setTaskInput(e.target.value)
    }

    function handleDateInput(e){
        setDateInput(e.target.value)
    }

    // Gets list of projects from Firebase each time they update
    useEffect(() => { 
           const unsubscribe = app.firestore().collection("projects").orderBy("accessedTime", "desc")
           .onSnapshot(querySnapshot => {
                const namesList = querySnapshot.docs.map(doc => doc.data().name)
                setRecentProjectNames(namesList)
           });
           //remember to unsubscribe from your realtime listener
           return () => unsubscribe()
    }, []);

    // Component: list of recent projects
    function RecentProjectsMenu() {
        let len = recentProjectNames.length;
        if (len > 0 && len <= 5) {            
            const names = recentProjectNames.map((projectName) => 
                <RecentProject text={projectName}/>
            );
            return(<div>{names}</div>)
            
        } else if (len > 5){
            const recentNames = recentProjectNames.slice(0, 5).map((projectName) =>
            <RecentProject text={projectName}/>
            );
            return(<div>{recentNames}</div>)

        } else {
            return(<Form.Label className="ml-3 mt-2 disabled">No recent projects.</Form.Label>)
        }
    }

    // Dropdown items for recent projects
    function RecentProject(props) {
        const {text} = props
        return <Dropdown.Item onClick={() => handleProjectSelect(text)}>{text}</Dropdown.Item>;
    }
      

    function handleProjectSubmit(){
        if (projectInput && !recentProjectNames.includes(projectInput)){
            const creationTime = Date.now()
            handleProjectSelect(projectInput)
            app.firestore().collection("projects").add({
                name: projectInput,
                creationTime: creationTime,
                accessedTime: creationTime,
                userId: userId
            })
        } else {
            handleProjectSelect(projectInput)
        }
    }

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
        <ContainerPage>

            <Row>
                <Col>
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
                            <Dropdown>
                                <ThemedDropdown>
                                    {selectedProject? selectedProject : "Select Project"}
                                </ThemedDropdown>

                                <Dropdown.Menu style={{minWidth: "100%"}}> 
                                    <Row>
                                        <Col className="col-8">
                                            <Form.Control onChange={handleProjectInput} value={projectInput} placeholder="Project Name" className="mx-1 overflow-hidden"/>
                                        </Col>
                                        
                                        <Col align="centre" className="col-4">
                                            <ThemedButton onClick={handleProjectSubmit}>Submit</ThemedButton>
                                        </Col>
                                    </Row>

                                    <RecentProjectsMenu/>

                                </Dropdown.Menu>
                            </Dropdown>


                            <Form.Group className="mb-3 mt-3" controlId="formDueDate">
                                <Row>
                                    <Form.Label>Due Date:</Form.Label>
                                </Row>

                                <input type="date" onChange={handleDateInput} value={dateInput}></input>

                            </Form.Group>
                        </Form.Group>

                        <div className="mt-5">
                            <ThemedButton onClick={handleTaskSubmit}>
                                Add Task
                            </ThemedButton>
                        </div>
                    </Form>
                </Col>
            </Row>

        </ContainerPage>
    )
}