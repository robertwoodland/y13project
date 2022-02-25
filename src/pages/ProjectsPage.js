import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import TaskDetails from '../components/TaskDetails/TaskDetails';
import getTasks from '../components/Firebase Functions/getTasks';
import markComplete from '../components/Firebase Functions/markComplete';
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
    
    const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [formattedDueDate, setFormattedDueDate] = useState();
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [dueDate, setDueDate] = useState();
    const [showToast, setShowToast] = useState(false);
    const [taskCount, setTaskCount] = useState(0)
    const [projectId, setProjectId] = useState()
    
    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID
    
    useEffect(() => {
        const num = Math.floor(recentProjects.length/10) + 1
        setMaxPageNum(num)
    }, [recentProjects])

    getTaskCount(uid, setTaskCount)

    function handleShowDetails(){
        if (selectedProject){
            setShowProjectDetails(true)
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
        if (showProjectDetails && selectedProject){
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
                    recentProjects={recentProjects} setRecentProjects={setRecentProjects}>
                        Update Project
                    </ProjectDetails>
                    

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
                            <ShowRecentProjects recentProjects={recentProjects} pageNum={pageNum} handleShowDetails={handleShowDetails}
                            incPageNum={incPageNum} decPageNum={decPageNum} selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject} maxPageNum={maxPageNum} projectId={projectId} setProjectId={setProjectId} />
                        </Col>
                        <Col>
                            {SelectedDetails()}
                            {/* Some weird bug makes it work only when the function is called like this :/ 
                            Still need to finish. */}
                        </Col>
                    </Row>
                </Form.Group>
            </Form>


        </ContainerPage>
    )}