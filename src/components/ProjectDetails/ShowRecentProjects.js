import React, { Fragment, useContext } from 'react'
import ThemedButton from '../styled/ThemedButton';
import { Form, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import RecentProject from '../ProjectDropdown/RecentProject';


export default function ShowRecentProjects(props){

    const {uid} = useContext(UserContext)

    const {recentProjects, selectedProject, setSelectedProject} = props
    const {pageNum, incPageNum, decPageNum, maxPageNum} = props
    const {handleShowDetails, deleteProject} = props
    const {projectId, setProjectId} = props

    function handleProjectSelect(e){
        // 0 is project name, 1 is accessed time, 2 is ID
        const value = e.target.value.split(",")
        setSelectedProject(value[0])
        setProjectId(value[2])
    }


    const len = recentProjects.length
    if (len > 0) {
        const names = recentProjects.map(function(project, index) {
            if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {
                return <RecentProject key={index} text={project}/>
            }
        })

        return(
        <Fragment>
            <div onChange={(e) => handleProjectSelect(e)}>{names}</div>
            <br></br>

            <Row>
                <Col>
                    <ThemedButton onClick={() => markComplete(selectedProject, setSelectedProject, uid)}>Mark As Complete</ThemedButton>
                </Col>
                <Col>
                    <ThemedButton onClick={handleShowDetails()}>Edit Details</ThemedButton>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <ThemedButton onClick={decPageNum()}>Previous Page</ThemedButton>
                    <Form.Label className="mx-3">{"Page " + (pageNum + 1) + " of " + maxPageNum}</Form.Label>
                </Col>

                <Col>
                    <ThemedButton onClick={incPageNum()}>Next Page</ThemedButton>
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