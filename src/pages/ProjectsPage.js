import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import TaskDetails from '../components/TaskDetails/TaskDetails';
import getTasks from '../components/Firebase Functions/getTasks';
import markComplete from '../components/Firebase Functions/markComplete';
// import deleteProject from '../components/Firebase Functions/deleteProject'
import SubmissionToast from '../components/styled/SubmissionToast';
import ShowRecentTasks from '../components/ShowTasksPage/ShowRecentTasks';
import getProjects from '../components/Firebase Functions/getProjects';
import { UserContext } from '../App';
import getTaskCount from '../components/Firebase Functions/getTaskCount';
import ProjectDetails from '../components/ProjectDetails/ProjectDetails';
import ShowRecentProjects from '../components/ProjectDetails/ShowRecentProjects';

export default function ShowTasksPage() {

    const {uid} = useContext(UserContext)
    
    const [recentTasks, setRecentTasks] = useState([]);
    const [recentProjects, setRecentProjects] = useState([]);

    const [selectedTask, setSelectedTask] = useState();
    const [selectedProject, setSelectedProject] = useState();
    
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [formattedDueDate, setFormattedDueDate] = useState();
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [dueDate, setDueDate] = useState();
    const [showToast, setShowToast] = useState(false);
    const [taskCount, setTaskCount] = useState(0)
    const [projectId, setProjectId] = useState()
    
    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID
    
    getTasks(setRecentTasks, setMaxPageNum, uid)

    getTaskCount(uid, setTaskCount)

    function handleShowDetails(){
        if (selectedTask){
            setShowTaskDetails(true)
        }
    }

    function decPageNum(){
        if (pageNum > 0) {
            setPageNum((prevState) => prevState - 1)
        }
    }

    function incPageNum(){
        if (pageNum + 1 < maxPageNum) {
            setPageNum((prevState) => prevState + 1)
        }
    }


    function SelectedDetails(){
        if (showTaskDetails && selectedTask){
            return(
                <Fragment>
                    {/* 

                    <TaskDetails taskInputPlaceholder={selectedTask[0]} projectPlaceholder={selectedProject}
                    dueDate={dueDate} update={true} selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                    setShowToast={setShowToast} selectedProject={selectedProject}>

                        Update Task
                    </TaskDetails>

                    */}


                    <ProjectDetails projectPlaceholder={selectedProject} update={true} selectedProject={selectedProject}
                    recentProjects={recentProjects} setRecentProjects={setRecentProjects} />
                    

                </Fragment>
            )
        } else {
            return(<Fragment/>)
        }
    }



    return (
        <ContainerPage>
            <SubmissionToast showToast={showToast} setShowToast={setShowToast} update={true}/>
            <Form>
                <Form.Group className="mb-3">

                    <Form.Label>Recent projects:</Form.Label>
                    
                    <Row>
                        <Col>
                            {/*
                            <ShowRecentTasks recentTasks={recentTasks} pageNum={pageNum} handleShowDetails={handleShowDetails}
                            markComplete={markComplete} incPageNum={incPageNum}
                            decPageNum={decPageNum} selectedTask={selectedTask} setSelectedProject={setSelectedProject}
                            setSelectedTask={setSelectedTask} setDueDate={setDueDate} maxPageNum={maxPageNum}
                            setFormattedDueDate={setFormattedDueDate} taskCount={taskCount} />
                             */}

                            {/* 
                            <ShowRecentProjects recentProjects={recentProjects} pageNum={pageNum} handleShowDetails={handleShowDetails}
                            deleteProject={deleteProject} incPageNum={incPageNum} decPageNum={decPageNum} selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject} maxPageNum={maxPageNum} projectId={projectId} setProjectId={setProjectId} />
                            */}
                            
                        </Col>
                        <Col>
                            {SelectedDetails()}
                            {/* Some weird bug makes it work only when the function is called like this :/ */}
                        </Col>
                    </Row>
                </Form.Group>
            </Form>


        </ContainerPage>
    )}