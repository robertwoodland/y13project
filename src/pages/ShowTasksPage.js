import React, { Fragment, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import TaskDetails from '../components/TaskDetails/TaskDetails';
import getTasks from '../components/Firebase Functions/getTasks';
import markComplete from '../components/Firebase Functions/markComplete';
import SubmissionToast from '../components/styled/SubmissionToast';
import ShowRecentTasks from '../components/ShowTasksPage/ShowRecentTasks';
import getProjects from '../components/Firebase Functions/getProjects';


export default function ShowTasksPage() {
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
    
    getProjects(setRecentProjects)
    getTasks(setRecentTasks, setMaxPageNum, recentProjects)

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
            <SubmissionToast showToast={showToast} setShowToast={setShowToast} update={true}/>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Recent tasks:</Form.Label>
                    
                    <Row>
                        <Col>
                            
                            <ShowRecentTasks recentTasks={recentTasks} pageNum={pageNum} handleShowDetails={handleShowDetails}
                            markComplete={markComplete} incPageNum={incPageNum}
                            decPageNum={decPageNum} selectedTask={selectedTask} setSelectedProject={setSelectedProject}
                            setSelectedTask={setSelectedTask} setDueDate={setDueDate} maxPageNum={maxPageNum}
                            setFormattedDueDate={setFormattedDueDate} />
                            
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