import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import getProjects from '../components/Firebase Functions/getProjects';
import { UserContext } from '../App';
import ActiveTimer from '../components/TimerPage/ActiveTimer';
import ShowTimersPage from '../components/TimerPage/ShowTimersPage';
import getHHMM from '../components/TimerPage/getHHMM';
import getTimers from '../components/Firebase Functions/getTimers';

export default function TimerPage() {

    const {uid} = useContext(UserContext);

    const [activeTimer, setActiveTimer] = useState(); 
    // 0 is timer name, 1 is project, 2 is id, 3 is projectId, 4 is start, 5 is end

    const [selectedProject, setSelectedProject] = useState();
    const [projectInput, setProjectInput] = useState();
    const [recentProjects, setRecentProjects] = useState();
    const [projectId, setProjectId] = useState();
    const [timerName, setTimerName] = useState();
    const [timerActive, setTimerActive] = useState(false);
    const [selectedTimer, setSelectedTimer] = useState();
    
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const [showTimer, setShowTimer] = useState(true);
    const [timerSubmitted, setTimerSubmitted] = useState(false);

    const [recentTimers, setRecentTimers] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [maxPageNum, setMaxPageNum] = useState(0);

    const [editTimer, setEditTimer] = useState(false);


    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID    

    getTimers(setRecentTimers, setMaxPageNum, uid)
    // 0 is timer name, 1 is project, 2 is id, 3 is projectId, 4 is start time, 5 is end time

    // Sets project ID when a project is selected
    useEffect(() => {
        if (recentProjects) {
            const recentProjectNames = recentProjects.map(project => project[0])
            if (recentProjectNames.includes(selectedProject)) {
                let index = recentProjectNames.indexOf(selectedProject)
                setProjectId(recentProjects[index][2])
            }
        }
    }, [selectedProject])

    // Updates states when a timer is selected
    useEffect(() => {
        if (timerActive && activeTimer) {
            setTimerName(activeTimer[0])
            setSelectedProject(activeTimer[1])
            setProjectId(activeTimer[3])
            
            let start = activeTimer[4]
            setStartTime(getHHMM(start))
        }
    }, [activeTimer])

    // Clears states when a timer is added
    useEffect(() => {
        if (timerSubmitted) {
            setStartTime("")
            setEndTime("")
            setTimerName("")
            setSelectedProject()
            setProjectId()
            setTimerActive(false)
            setTimerSubmitted(false)
            setActiveTimer()
        }
    }, [timerSubmitted])

    // Clears states when the page changes
    function handleToggle() {
        setShowTimer(prev => !prev)
        setStartTime("")
        setEndTime("")
        setTimerName("")
        setSelectedProject()
        setProjectId()
    }


    return (
        <ContainerPage>

            <Row>
                {showTimer ? 
                
                <ActiveTimer timerName={timerName} selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject} projectInput={projectInput} setProjectInput={setProjectInput}
                recentProjects={recentProjects} projectId={projectId} setProjectId={setProjectId} startTime={startTime} 
                setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setTimerName={setTimerName} 
                timerActive={timerActive} setTimerActive={setTimerActive}
                activeTimer={activeTimer} setActiveTimer={setActiveTimer}
                setTimerSubmitted={setTimerSubmitted} uid={uid} /> 
                
                
                : <ShowTimersPage timerName={timerName} selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject} projectInput={projectInput} setProjectInput={setProjectInput}
                recentProjects={recentProjects} projectId={projectId} setProjectId={setProjectId} startTime={startTime} 
                setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setTimerName={setTimerName} 
                activeTimer={activeTimer} recentTimers={recentTimers} setRecentTimers={setRecentTimers}
                pageNum={pageNum} setPageNum={setPageNum} maxPageNum={maxPageNum} setMaxPageNum={setMaxPageNum} 
                selectedTimer={selectedTimer} setSelectedTimer={setSelectedTimer} editTimer={editTimer}
                setEditTimer={setEditTimer} uid={uid} />}
            </Row>

            <hr/>

            <Row className="my-3">
                <ThemedButton onClick={() => handleToggle()}>
                    <h2>{showTimer ? "Show Previous Timers" : "Add Timer Page"}</h2>
                </ThemedButton>
            </Row>




        </ContainerPage>
    )}