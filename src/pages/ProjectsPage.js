import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import SubmissionToast from '../components/styled/SubmissionToast';
import getProjects from '../components/Firebase Functions/getProjects';
import { UserContext } from '../App';
import getTaskCount from '../components/Firebase Functions/getTaskCount';
import ProjectDetails from '../components/ProjectDetails/ProjectDetails';
import ShowRecentProjects from '../components/ProjectDetails/ShowRecentProjects';

export default function ShowTasksPage() {

    const [recentProjects, setRecentProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    
    const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [projectId, setProjectId] = useState()
    
    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID
    
    useEffect(() => {
        const num = Math.floor(recentProjects.length/10) + 1
        setMaxPageNum(num)
    }, [recentProjects])

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
            <SubmissionToast showToast={showToast} setShowToast={setShowToast}>Removed from database</SubmissionToast>
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