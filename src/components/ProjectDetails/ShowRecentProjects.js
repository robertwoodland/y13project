import React, { Fragment } from 'react'
import ThemedButton from '../styled/ThemedButton';
import { Form, Col, Row } from 'react-bootstrap';
import deleteProject from '../Firebase Functions/deleteProject';
import RecentProjectItem from './RecentProjectItem';
import decPageNum from '../PageNums/decPageNum';
import incPageNum from '../PageNums/incPageNum';


export default function ShowRecentProjects(props){
    const {recentProjects} = props
    const {pageNum, setPageNum, maxPageNum} = props
    const {projectId, setProjectId} = props

    function handleProjectSelect(e){
        // 0 is project name, 1 is accessed time, 2 is ID
        const value = e.target.value.split(",")
        setProjectId(value[2])
    }


    const len = recentProjects.length
    if (len > 0) {
        const names = recentProjects.map(function(project, index) {
            if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {
                return <RecentProjectItem key={index} text={project}/>
            }
        })

        return(
        <Fragment>
            <div onChange={(e) => handleProjectSelect(e)}>
                {names}
            </div>
            <br></br>

            <Row>
                <Col>
                    <ThemedButton onClick={() => deleteProject(projectId, setProjectId)}>Delete</ThemedButton>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <ThemedButton onClick={() => decPageNum(pageNum, setPageNum)}>Previous Page</ThemedButton>
                    <Form.Label className="mx-3">{"Page " + (pageNum + 1) + " of " + maxPageNum}</Form.Label>
                </Col>

                <Col>
                    <ThemedButton onClick={() => incPageNum(pageNum, setPageNum, maxPageNum)}>Next Page</ThemedButton>
                </Col>
            </Row>
        </Fragment>
        )

    } else {
        return(
        <Fragment>
            <Row>
                <Form.Label className="ml-3 mt-2 disabled">No active projects</Form.Label>
            </Row>
        </Fragment>)
    }
}