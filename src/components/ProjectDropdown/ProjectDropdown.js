import React, { useContext, Fragment } from 'react';
import { Col, Dropdown, Row, Form } from 'react-bootstrap';
import ThemedDropdown from '../styled/ThemedDropdown';
import ThemedButton from '../styled/ThemedButton';
import { UserContext, validateInput } from '../../App';
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
                            {/* When a project is selected from the list, assign the ID to the state */}
                            <Form.Control onChange={(e) => {setProjectInput(validateInput(e.target.value))}} 
                            value={projectInput} placeholder="Project name" 
                            className="mx-1 overflow-hidden"/>
                        </Col>

                        <Col align="centre" className="col-4">
                            <ThemedButton onClick={() => handleProjectSubmit(uid, projectInput, recentProjects, setSelectedProject, setProjectId)}>
                                Submit
                            </ThemedButton>
                        </Col>
                    </Row>

                    <RecentProjectsMenu recentProjects={recentProjects} setSelectedProject={setSelectedProject}/>
                
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}


