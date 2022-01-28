import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form, Button, Dropdown } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import app from '../components/base';
import { UserContext } from '../App';
import ThemedDropdown from '../components/styled/ThemedDropdown';
import ProjectDropdown from '../components/ProjectDropdown/ProjectDropdown';






export default function ShowTasksPage() {
    const [recentTasks, setRecentTasks] = useState([]);
    const [recentProjects, setRecentProjects] = useState([]);

    const [selectedProject, setSelectedProject] = useState();
    const [projectInput, setProjectInput] = useState();

    const [recentProjectNames, setRecentProjectNames] = useState();
    const [selectedTask, setSelectedTask] = useState();
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [taskInput, setTaskInput] = useState();

    const userId = useContext(UserContext).userId;
    
    // Get tasks
    useEffect(() => {
        const unsubscribe = app.firestore().collection("tasks").orderBy("dueDate")
        .onSnapshot(querySnapshot => {
            const docIDs = querySnapshot.docs.map(doc => doc.id)
            const tasksList = querySnapshot.docs.map(doc => doc.data().name)
            const projectNames = querySnapshot.docs.map(doc => doc.data().projectName)
            const dueDates = querySnapshot.docs.map(doc => doc.data().dueDate)

            const tasks = tasksList.map((taskName, index) => {
                return [taskName, projectNames[index], dueDates[index], docIDs[index]]
            })

            setRecentTasks(tasks)
            setMaxPageNum(Math.floor(tasks.length/10) + 1)
        })
        // 0 is name, 1 is project name, 2 is due date, 3 is ID
    
      return () => unsubscribe()
    }, []);

    // Get projects
    useEffect(() => {
        const unsubscribe = app.firestore().collection("projects")
        .where("userId", "==", userId).onSnapshot(querySnapshot => {
            const projectIds = querySnapshot.docs.map(doc => doc.id)
            const projectNames = querySnapshot.docs.map(doc => doc.data().name)
            const accessedTimes = querySnapshot.docs.map(doc => doc.data().accessedTime)

            const projects = projectNames.map((projectName, index) => {
                return [projectName, accessedTimes[index], projectIds[index]]
            })

            setRecentProjects(projects)
            setRecentProjectNames(projectNames)
        })  
        // 0 is project name, 1 is accessed time, 2 is ID

      return () => unsubscribe()
    }, []);
    
    



    function handleTaskSelect(e){
        setSelectedTask(e.target.value)
    }

    function handleShowDetails(){
        if (selectedTask){
            setShowTaskDetails(true)
        }
    }

    function handleProjectInput(projectName){
        setProjectInput(projectName)
    }

    function handleMarkComplete(){
        if (selectedTask){
            console.log("Ok this is alright")
        }
    }

    function decPageNum(){
        if (pageNum > 0) {
            setPageNum((prevState) => prevState - 1)
        }
    }

    function incPageNum(){
        if (pageNum < maxPageNum) {
            setPageNum((prevState) => prevState + 1)
        }
    }

    function handleTaskInput(e){
        setTaskInput(e.target.value)
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


    function ShowRecentTasks(){
        const len = recentTasks.length;
        if (len > 0) {
            const names = recentTasks.map(function(task, index) {
                if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {return <RecentTask text={task}/>}
            }
            );
            return(
            <Fragment>
                <div onChange={handleTaskSelect}>{names}</div>
                <br></br>

                <Row>
                    <Col>
                        <ThemedButton onClick={handleMarkComplete}>Mark As Complete</ThemedButton>
                    </Col>
                    <Col>
                        <ThemedButton onClick={handleShowDetails}>Edit Details</ThemedButton>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <ThemedButton onClick={decPageNum}>Previous Page</ThemedButton>
                        <Form.Label className="mx-3">{"Page " + (pageNum + 1) + " of " + maxPageNum}</Form.Label>
                    </Col>

                    <Col>
                        <ThemedButton onClick={incPageNum}>Next Page</ThemedButton>
                    </Col>
                </Row>
            </Fragment>
            )

        } else {
            return(
            <Fragment>
                <Row>
                    <Form.Label className="ml-3 mt-2 disabled">No active tasks</Form.Label>
                </Row>
            </Fragment>)
        }
    }
    
    function RecentTask(props){
        const {text} = props
        const name = text[0]
        const project = text[1]
        const dueDate = text[2].split("-")
        const id = text[3]

        let formattedDueDate = ""
        if (dueDate){
            formattedDueDate = dueDate[2] + "/" + dueDate[1]
        }

        return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={id} label={name} name="selectedTask"/>
                </Col>
                
                <Col>
                    <Form.Label>{project + " - " + formattedDueDate}</Form.Label>
                </Col>
            </Row>
        </Fragment>
        )
    }


    function SelectedDetails(){
        if (showTaskDetails && selectedTask){


            
            return(
                <Fragment>
                    <Form>
                        <Form.Label>Task Name:</Form.Label>
                        <Form.Control className="mb-3" onChange={handleTaskInput} value={taskInput} type="name" placeholder="Test"/>
                        
                        <div className="mb-3">
                            <ProjectDropdown selectedProject={selectedProject} setSelectedProject={setSelectedProject}
                            recentProjectNames={recentProjectNames} projectInput={projectInput} 
                            setProjectInput={setProjectInput} />
                        </div>

                    </Form>
                    <ThemedButton>Update</ThemedButton>
                </Fragment>
            )
        } else {
            return(<Fragment/>)
        }
    }



    return (
        <ContainerPage>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Recent tasks:</Form.Label>
                    
                    <Row>
                        <Col>
                            <ShowRecentTasks/>
                        </Col>
                        <Col>
                            {SelectedDetails()}
                        </Col>
                    </Row>
                </Form.Group>
            </Form>


        </ContainerPage>
    )}