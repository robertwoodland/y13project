import React, { useContext, Fragment } from 'react';
import { Col, Dropdown, Row, Form } from 'react-bootstrap';
import ThemedDropdown from '../styled/ThemedDropdown';
import ThemedButton from '../styled/ThemedButton';
import { UserContext } from '../../App';
import handleProjectSubmit from '../Firebase Functions/handleProjectSubmit';
import RecentProjectsMenu from './RecentProjectsMenu';

export default function ProjectDropdown(props) {
    const {uid} = useContext(UserContext)

    const {selectedProject, setSelectedProject} = props
    const {projectInput, setProjectInput} = props
    const {recentProjects, setProjectId} = props


    return(
        <Fragment>
            <Dropdown>
                <ThemedDropdown>
                    {selectedProject? selectedProject : "Select Project"}
                </ThemedDropdown>

                <Dropdown.Menu style={{minWidth: "100%"}}>
                    <Row>
                        <Col className="col-8">
                            <Form.Control onChange={(e) => {setProjectInput(e.target.value)}} 
                            value={projectInput} placeholder="Project name" 
                            className="mx-1 overflow-hidden"/>
                        </Col>

                        <Col align="centre" className="col-4">
                            <ThemedButton onClick={() => handleProjectSubmit(uid, projectInput, recentProjects, setSelectedProject, setProjectId)}>Submit</ThemedButton>
                        </Col>
                    </Row>

                    <RecentProjectsMenu recentProjects={recentProjects} setSelectedProject={setSelectedProject}/>
                
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}


