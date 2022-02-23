import { Fragment } from "react";
import { Form } from "react-bootstrap";
import TimerHeader from "./TimerHeader";
import ShowRecentTimers from "./ShowRecentTimers";
import EditTimerPage from "./EditTimerPage";
import getHHMM from "./getHHMM";

export default function ShowTimersPage(props) {
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



    

    return(
        <Fragment>
            {timerActive ? <TimerHeader timerName={activeTimer[0]} selectedProject={activeTimer[1]} startTime={getHHMM(activeTimer[4])} /> 
            
            
            : 
            <Form>
                <Form.Label>
                    No active timer
                </Form.Label>
            </Form>}

            <hr/>


            {!editTimer ? 
            <ShowRecentTimers timerName={timerName} selectedProject={selectedProject} 
            setSelectedProject={setSelectedProject} projectInput={projectInput} setProjectInput={setProjectInput}
            recentProjects={recentProjects} projectId={projectId} setProjectId={setProjectId} startTime={startTime} 
            setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setTimerName={setTimerName} 
            timerActive={timerActive} setTimerActive={setTimerActive} timerId={timerId} setTimerId={setTimerId} 
            activeTimer={activeTimer} setActiveTimer={setActiveTimer} timerSubmitted={timerSubmitted}
            setTimerSubmitted={setTimerSubmitted} recentTimers={recentTimers} setRecentTimers={setRecentTimers} 
            maxPageNum={maxPageNum} setMaxPageNum={setMaxPageNum} pageNum={pageNum} setPageNum={setPageNum} 
            selectedTimer={selectedTimer} setSelectedTimer={setSelectedTimer} editTimer={editTimer}
            setEditTimer={setEditTimer} uid={uid} />
            
            : <EditTimerPage timerName={timerName} selectedProject={selectedProject} 
            setSelectedProject={setSelectedProject} projectInput={projectInput} setProjectInput={setProjectInput}
            recentProjects={recentProjects} projectId={projectId} setProjectId={setProjectId} startTime={startTime} 
            setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setTimerName={setTimerName} 
            timerActive={timerActive} setTimerActive={setTimerActive} timerId={timerId} setTimerId={setTimerId} 
            activeTimer={activeTimer} setActiveTimer={setActiveTimer} timerSubmitted={timerSubmitted}
            setTimerSubmitted={setTimerSubmitted} recentTimers={recentTimers} setRecentTimers={setRecentTimers} 
            maxPageNum={maxPageNum} setMaxPageNum={setMaxPageNum} pageNum={pageNum} setPageNum={setPageNum} 
            selectedTimer={selectedTimer} setSelectedTimer={setSelectedTimer} editTimer={editTimer}
            setEditTimer={setEditTimer} uid={uid} />}



        </Fragment>
    )
}