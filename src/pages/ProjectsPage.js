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


    return (
        <ContainerPage>
            <SubmissionToast showToast={showToast} setShowToast={setShowToast}>Removed from database</SubmissionToast>
            <Form>
                <Form.Group className="mb-3">

                    <Form.Label>Recent projects:</Form.Label>
                    
                    <Row>
                        <Col>
                            <ShowRecentProjects recentProjects={recentProjects} pageNum={pageNum} handleShowDetails={handleShowDetails}
                            setPageNum={setPageNum} selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject} maxPageNum={maxPageNum} projectId={projectId} setProjectId={setProjectId} />
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
                </Form.Group>
            </Form>


        </ContainerPage>
    )}