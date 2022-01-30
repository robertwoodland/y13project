import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import getProjects from '../components/Firebase Functions/getProjects';
import TaskDetails from '../components/TaskDetailsPage/TaskDetails';
import getTasks from '../components/Firebase Functions/getTasks';



// To do: Make updating tasks work





export default function ShowTasksPage() {
    const [recentTasks, setRecentTasks] = useState([]);
    const [recentProjects, setRecentProjects] = useState([]);
    const [projectInput, setProjectInput] = useState();

    const [recentProjectNames, setRecentProjectNames] = useState();
    const [selectedTask, setSelectedTask] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [taskInput, setTaskInput] = useState();
    

    getTasks(setRecentTasks, setMaxPageNum)

    
    getProjects(setRecentProjects, setRecentProjectNames)
    

    function handleTaskSelect(e){
        const value = e.target.value.split(",")
        setSelectedTask(value[0])
        setSelectedProject(value[1])
    }


    function handleShowDetails(){
        if (selectedTask){
            setShowTaskDetails(true)
        }
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


    function ShowRecentTasks(){
        const len = recentTasks.length;
        if (len > 0) {
            const names = recentTasks.map(function(task, index) {
                if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {
                    return <RecentTask text={task}/>
                }
            })

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
        // Text: 0 is name, 1 is project, 2 is dueDate, 3 is ID

        let formattedDueDate = ""
        if (dueDate){
            formattedDueDate = dueDate[2] + "/" + dueDate[1]
        }

        return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={[name, project]} label={name} name={name}/>
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
                    <TaskDetails taskInputPlaceholder={selectedTask} projectPlaceholder={selectedProject}>Update Task</TaskDetails>
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