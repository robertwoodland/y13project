import { Fragment, useEffect } from "react";
import { Row, Col, Form, } from "react-bootstrap";
import ThemedButton from "../styled/ThemedButton";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";
import timerSubmit from "../Firebase Functions/timerSubmit";
import app from '../base';

export default function ActiveTimer(props) {
    const {timerName, setTimerName} = props
    const {selectedProject, setSelectedProject} = props
    const {projectInput, setProjectInput} = props
    const {recentProjects} = props
    const {projectId, setProjectId} = props
    const {startTime, setStartTime} = props
    const {endTime, setEndTime} = props
    const {timerActive, setTimerActive} = props
    const {timerId, setTimerId} = props
    const {uid} = props


    function handleStartTimer() {
        if (timerName && selectedProject && startTime && projectId){
            setTimerActive(true)
            timerSubmit(setTimerActive, timerName, selectedProject, projectId, startTime, endTime, setTimerId, uid)
            
        }
    }



    useEffect(() => {
        const unsubscribe = app.firestore().collection("timers").where("active", "==", true)
        .onSnapshot((querySnapshot) => {
            if (querySnapshot.docs.length == 1) {

                querySnapshot.forEach((doc) => {
                    let id = doc.id
                    let start = doc.data().startTime
                    console.log(doc.data())
                })

            } else if (querySnapshot.docs.length > 1) {

                querySnapshot.forEach((doc) => {
                    // TO-DO:
                    console.log("NEED TO CLEAR ACTIVE TIMERS!!")
                })

            } else {

                setTimerActive(false)
            }
        })

        return () => unsubscribe()
    }, [])
    


    function handleEndTimer() {
        const now = Date.now()
        const hours = new Date(now).getHours()
        let minutes = new Date(now).getMinutes()

        if (String(hours).length == 1){
            hours = "0" + hours
        }
        
        if (String(minutes).length == 1) {
            minutes = '0' + minutes
        }

        setEndTime(hours + ":" + minutes)
    }

    function clearTimes() {
        setStartTime("")
        setEndTime("")
    }

    function ShowTimerCount() {
        // if (!timerActive) {
            return(
                <Fragment>
                    <Col align="right">
                        <ThemedButton onClick={() => handleStartTimer()}>{endTime? "Add Timer" : "Start Timer"}</ThemedButton>
                    </Col>
                </Fragment>
            )
        /*} else {
            return(
                <Fragment>
                    <Col>
                        <h1>Active</h1>
                    </Col>

                </Fragment>
            )
        }*/
    }

    return(
        <Fragment>
            <Row>
                <Col>
                    <Form>
                        <Row>
                            <Form.Label>Current Timer:</Form.Label>
                        </Row>
                        
                        <Row className="my-2">
                            <Col>
                                <Form.Control onChange={(e) => setTimerName(e.target.value)} value={timerName} placeholder='Enter timer name'/>
                            </Col>

                            <Col>
                                <ProjectDropdown selectedProject={selectedProject} setSelectedProject={setSelectedProject} projectInput={projectInput}
                                setProjectInput={setProjectInput} recentProjects={recentProjects} setProjectId={setProjectId} />
                            </Col>
                        </Row>

                        <Row>
                            <Col className="col-6">
                                <Row>
                                    <Col>
                                        <Form.Text>Start time:</Form.Text>
                                        <input className='mx-3' type="time" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                    </Col>

                                    <Col>
                                        <Form.Text>End time:</Form.Text>
                                        <input className='mx-3' type="time" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                    </Col>

                                    <Col>
                                        <Row>
                                            <Col className="mr-1 my-1">
                                                <ThemedButton onClick={clearTimes}>Clear</ThemedButton>
                                            </Col>
                                            
                                            <Col className="my-1">
                                                <ThemedButton onClick={handleEndTimer}>End Now</ThemedButton>
                                            </Col>

                                        </Row>
                                    </Col>

                                </Row>
                            </Col>

                            <ShowTimerCount/>

                        </Row>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
}