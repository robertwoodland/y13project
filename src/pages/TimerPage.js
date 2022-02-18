import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import ContainerPage from '../components/styled/ContainerPage';
import ThemedButton from '../components/styled/ThemedButton';
import ProjectDropdown from '../components/ProjectDropdown/ProjectDropdown';
import getProjects from '../components/Firebase Functions/getProjects';
import { UserContext } from '../App';
import ActiveTimer from '../components/TimerPage/ActiveTimer';
import HistoricTimer from '../components/TimerPage/HistoricTimer';
import getHHMM from '../components/TimerPage/getHHMM';

export default function TimerPage() {

    const {uid} = useContext(UserContext);

    const [activeTimer, setActiveTimer] = useState(); 
    // 0 is timer name, 1 is project, 2 is id, 3 is projectID, 4 is start, 5 is end

    const [selectedProject, setSelectedProject] = useState();
    const [projectInput, setProjectInput] = useState();
    const [recentProjects, setRecentProjects] = useState();
    const [projectId, setProjectId] = useState();
    const [timerName, setTimerName] = useState();
    const [timerId, setTimerId] = useState();
    const [timerActive, setTimerActive] = useState(false);
    
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const [showTimer, setShowTimer] = useState(true);
    const [timerSubmitted, setTimerSubmitted] = useState(false);


    getProjects(setRecentProjects)
    // 0 is project name, 1 is accessed time, 2 is ID

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

    useEffect(() => {
        if (timerActive && activeTimer) {
            setTimerName(activeTimer[0])
            setSelectedProject(activeTimer[1])
            setTimerId(activeTimer[2])
            setProjectId(activeTimer[3])
            
            let start = activeTimer[4]
            setStartTime(getHHMM(start))
        }
    }, [activeTimer])

    useEffect(() => {
        if (timerSubmitted) {
            setStartTime("")
            setEndTime("")
            setTimerName("")
            setSelectedProject()
            setTimerActive(false)
            setTimerSubmitted(false)
            setActiveTimer()
        }
    }, [timerSubmitted])


    return (
        <ContainerPage>

            <Row>
                {showTimer ? 
                
                <ActiveTimer timerName={timerName} selectedProject={selectedProject} 
                setSelectedProject={setSelectedProject} projectInput={projectInput} setProjectInput={setProjectInput}
                recentProjects={recentProjects} projectId={projectId} setProjectId={setProjectId} startTime={startTime} 
                setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} setTimerName={setTimerName} 
                timerActive={timerActive} setTimerActive={setTimerActive} timerId={timerId} setTimerId={setTimerId} 
                activeTimer={activeTimer} setActiveTimer={setActiveTimer} timerSubmitted={timerSubmitted}
                setTimerSubmitted={setTimerSubmitted} uid={uid} /> 
                
                : <HistoricTimer/>}
            </Row>

            <hr/>

            <Row className="my-3">
                <ThemedButton onClick={() => setShowTimer(prev => !prev)}>
                    <h2>Toggle View</h2>
                </ThemedButton>
            </Row>




        </ContainerPage>
    )}