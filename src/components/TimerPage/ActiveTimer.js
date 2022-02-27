import { Fragment, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ThemedButton from "../styled/ThemedButton";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";
import timerSubmit from "../Firebase Functions/timerSubmit";
import app from '../base';
import endTimer from "../Firebase Functions/endTimer";
import updateActiveTimer from "../Firebase Functions/updateActiveTimer";

export default function ActiveTimer(props) {
    const {timerName, setTimerName} = props
    const {selectedProject, setSelectedProject} = props
    const {projectInput, setProjectInput} = props
    const {recentProjects} = props
    const {projectId, setProjectId} = props
    const {startTime, setStartTime} = props
    const {endTime, setEndTime} = props
    const {timerActive, setTimerActive} = props
    const {activeTimer, setActiveTimer} = props
    const {setTimerSubmitted} = props
    const {uid} = props


    // Checks all the necessary information is present, then starts a timer
    function handleStartTimer() {
        if (timerName && selectedProject && startTime && projectId && endTime) {
            setTimerActive(false)
            setActiveTimer()
            setTimerSubmitted(true)
            timerSubmit(setTimerActive, timerName, selectedProject, projectId, startTime, endTime, uid)
        } else if (timerName && selectedProject && startTime && projectId){
            setTimerActive(true)
            timerSubmit(setTimerActive, timerName, selectedProject, projectId, startTime, endTime, uid)
            
        }
    }


    // Subscribes to the database, on parameters of the active timer
    // This also deals with a case where there are multiple timers marked active
    useEffect(() => {
        const unsubscribe = app.firestore().collection("timers").where("uid", "==", uid)
        .where("active", "==", true).onSnapshot((querySnapshot) => {
            if (querySnapshot.docs.length == 1) {

                querySnapshot.forEach((doc) => {
                    setTimerActive(true)

                    let id = doc.id

                    let name = doc.data().name
                    let projName = doc.data().projectName
                    let projId = doc.data().projectId
                    let end = doc.data().endTime
                    let start = doc.data().startTime

                    setActiveTimer([name, projName, id, projId, start, end])
                    // 0 is timer name, 1 is project, 2 is id, 3 is projectId, 4 is start, 5 is end

                })

            } else if (querySnapshot.docs.length > 1) {

                querySnapshot.forEach((doc) => {
                    let docId = doc.id

                    app.firestore().collection("timers").doc(docId).update({
                        active: false
                    }).then(() => {
                        setStartTime("")
                        setEndTime("")
                        setTimerName("")
                        setSelectedProject()
                        setProjectId()
                        setTimerActive(false)
                        setTimerSubmitted(false)
                        setActiveTimer()
                    })
                })

            } else {
                setTimerActive(false)
            }
        })



        return () => unsubscribe()
    }, [])
    

    // Gets the current time, and then ends the timer
    function handleEndTimer() {
        if (!activeTimer) {
            const now = Date.now()
            let hours = new Date(now).getHours()
            let minutes = new Date(now).getMinutes()

            if (String(hours).length == 1){
                hours = "0" + hours
            }
            
            if (String(minutes).length == 1) {
                minutes = '0' + minutes
            }

            setEndTime(hours + ":" + minutes)
        } else {
            endTimer (activeTimer, endTime, setTimerSubmitted)
        }
    }

    function clearTimes() {
        setStartTime("")
        setEndTime("")
    }

    function ShowTimerCount() {
        return(
            <Fragment>
                <Col align="right">
                    {!activeTimer ? 
                    <ThemedButton onClick={() => handleStartTimer()}>{endTime ? "Add Timer" : "Start Timer"}</ThemedButton>
                    
                    : <ThemedButton onClick={() => handleEndTimer()}>End Timer</ThemedButton>}
                </Col>
            </Fragment>
        )
    }

    // If there is an active timer and something changes, then it updates it in the database
    useEffect(() => {
        updateActiveTimer(timerName, selectedProject, projectId, startTime, uid)
    }, [timerName, projectId, startTime])
    

    return(
        <Fragment>
            <Row>
                <Col>
                    <Form>
                        <Row>
                            <Form.Label>{timerActive ? "Active timer:" : "Set a timer:"}</Form.Label>
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
                                                <ThemedButton onClick={() => handleEndTimer()}>End Now</ThemedButton>
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