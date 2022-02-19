import { Fragment, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import ThemedButton from "../styled/ThemedButton";
import timerSubmit from "../Firebase Functions/timerSubmit";
import app from '../base';
import endTimer from "../Firebase Functions/endTimer";
import TimerHeader from "./TimerHeader";
import ShowRecentTimers from "./ShowRecentTimers";

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
    const {recentTimers, setRecentTimers} = props
    const {maxPageNum, setMaxPageNum} = props
    const {pageNum, setPageNum} = props
    const {selectedTimer, setSelectedTimer} = props
    const {uid} = props





    return(
        <Fragment>
            {timerActive ? <TimerHeader timerName={timerName} selectedProject={selectedProject} startTime={startTime} /> 
            
            
            : <Fragment/>}

            <hr/>

            <ShowRecentTimers timerName={timerName} selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject} projectInput={projectInput} setProjectInput={setProjectInput}
                recentProjects={recentProjects} projectId={projectId} setProjectId={setProjectId} startTime={startTime} 
                setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setTimerName={setTimerName} 
                timerActive={timerActive} setTimerActive={setTimerActive} timerId={timerId} setTimerId={setTimerId} 
                activeTimer={activeTimer} setActiveTimer={setActiveTimer} timerSubmitted={timerSubmitted}
                setTimerSubmitted={setTimerSubmitted} recentTimers={recentTimers} setRecentTimers={setRecentTimers} 
                maxPageNum={maxPageNum} setMaxPageNum={setMaxPageNum} pageNum={pageNum} setPageNum={setPageNum} 
                selectedTimer={selectedTimer} setSelectedTimer={setSelectedTimer} uid={uid} />


        </Fragment>
    )
}