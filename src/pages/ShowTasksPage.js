import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import TaskDetails from '../components/TaskDetails/TaskDetails';
import getTasks from '../components/Firebase Functions/getTasks';
import markComplete from '../components/Firebase Functions/markComplete';
import SubmissionToast from '../components/styled/SubmissionToast';
import ShowRecentTasks from '../components/ShowTasksPage/ShowRecentTasks';
import { UserContext } from '../App';
import getTaskCount from '../components/Firebase Functions/getTaskCount';

export default function ShowTasksPage() {

    const {uid} = useContext(UserContext)
    
    const [recentTasks, setRecentTasks] = useState([]);

    const [selectedTask, setSelectedTask] = useState();
    const [selectedProject, setSelectedProject] = useState();
    
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [dueDate, setDueDate] = useState();
    const [showToast, setShowToast] = useState(false);
    const [taskCount, setTaskCount] = useState(0)
        
    getTasks(setRecentTasks, setMaxPageNum, uid)
    getTaskCount(uid, setTaskCount)

    function handleShowDetails(){
        if (selectedTask){
            setShowTaskDetails(true)
        }
    }


    function SelectedDetails(){
        if (showTaskDetails && selectedTask){
            return(
                <Fragment>
                    <TaskDetails taskInputPlaceholder={selectedTask[0]} projectPlaceholder={selectedProject}
                    dueDate={dueDate} update={true} selectedTask={selectedTask} setSelectedTask={setSelectedTask}
                    setShowToast={setShowToast} selectedProject={selectedProject}>Update Task
                    </TaskDetails>
                </Fragment>
            )
        } else {
            return(<Fragment/>)
        }
    }



    return (
        <ContainerPage>
            <SubmissionToast showToast={showToast} setShowToast={setShowToast}>Updated in database</SubmissionToast>
            <Form>
                <Form.Group className="mb-3">
                    <Row>
                        <Form.Label>Number of tasks completed: {taskCount}</Form.Label>
                    </Row>

                    <Form.Label>Recent tasks:</Form.Label>
                    
                    <Row>
                        <Col className="col-12 col-md-6">
                            
                            <ShowRecentTasks recentTasks={recentTasks} pageNum={pageNum} handleShowDetails={handleShowDetails} 
                            markComplete={markComplete} setPageNum={setPageNum} selectedTask={selectedTask} 
                            setSelectedProject={setSelectedProject} setSelectedTask={setSelectedTask} setDueDate={setDueDate}
                            maxPageNum={maxPageNum} taskCount={taskCount} />
                            
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