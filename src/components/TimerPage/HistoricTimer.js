import { Fragment, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ThemedButton from "../styled/ThemedButton";
import timerSubmit from "../Firebase Functions/timerSubmit";
import app from '../base';
import endTimer from "../Firebase Functions/endTimer";
import TimerHeader from "./TimerHeader";

export default function HistoricTimer(props) {
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
    const {uid} = props





    return(
        <Fragment>
            {timerActive ? <TimerHeader timerName={timerName} selectedProject={selectedProject} startTime={startTime} /> 
            
            
            : <Fragment/>}
            <h1>HistoricTimer</h1>
        </Fragment>
    )
}