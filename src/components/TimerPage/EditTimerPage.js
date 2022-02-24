import { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import updateTimer from "../Firebase Functions/updateTimer";
import ProjectDropdown from "../ProjectDropdown/ProjectDropdown";
import ThemedButton from "../styled/ThemedButton";
import getHHMM from "./getHHMM";
import getUnixTime from "./getUnixTime";


export default function EditTimerPage(props) {
    const {timerName, setTimerName} = props
    const {selectedProject, setSelectedProject} = props
    const {projectInput, setProjectInput} = props
    const {recentProjects} = props
    const {projectId, setProjectId} = props
    const {startTime, setStartTime} = props
    const {endTime, setEndTime} = props
    const {timerActive, setTimerActive} = props
    const {timerId, setTimerId} = props
    const {activeTimer, setActiveTimer} = props
    const {timerSubmitted, setTimerSubmitted} = props
    const {recentTimers, setRecentTimers} = props
    const {maxPageNum, setMaxPageNum} = props
    const {pageNum, setPageNum} = props
    const {selectedTimer, setSelectedTimer} = props
    const {editTimer, setEditTimer} = props
    const {uid} = props

    useEffect(() => {
        setTimerName(selectedTimer[0])
        setTimerId(selectedTimer[2])

        /* need to convert from unix
        setStartTime(selectedTimer[4])
        setEndTime(selectedTimer[5])
        */
       setStartTime(getHHMM(selectedTimer[4]))
       setEndTime(getHHMM(selectedTimer[5]))
       
    }, [selectedTimer])


    return(
        <Fragment>
            <Form>
                <Form.Label>Timer:</Form.Label>
                <Form.Control onChange={(e) => setTimerName(e.target.value)} value={timerName} />

                <Form.Label className="mt-3">Project:</Form.Label>
                <ProjectDropdown selectedProject={selectedProject} setSelectedProject={setSelectedProject}
                projectInput={projectInput} setProjectInput={setProjectInput} recentProjects={recentProjects}
                setProjectId={setProjectId} />

                <Form.Label>Start Time:</Form.Label>
                <input type="time" className="mx-3" onChange={(e) => setStartTime(e.target.value)} value={startTime} />


                <Form.Label>End Time:</Form.Label>
                <input type="time" className="mx-3" onChange={(e) => setEndTime(e.target.value)} value={endTime} />
            </Form>

            <div className="mt-3">
                <ThemedButton onClick={() => updateTimer(selectedTimer, timerName, startTime, endTime, selectedProject, projectId, setEditTimer)}>Update Timer</ThemedButton>
            </div>
        </Fragment>
    )
}