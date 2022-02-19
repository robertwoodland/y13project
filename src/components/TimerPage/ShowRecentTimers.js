import React, { Fragment, useContext } from 'react'
import ThemedButton from '../styled/ThemedButton';
import { Form, Col, Row } from 'react-bootstrap';
import getTimers from '../Firebase Functions/getTimers';
import RecentTimer from './RecentTimer';
import removeTimer from '../Firebase Functions/removeTimer';


export default function ShowRecentTimers(props){

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


    getTimers(setRecentTimers, setMaxPageNum, uid)


    function decPageNum(){
        if (pageNum > 0) {
            setPageNum((prevState) => prevState - 1)
        }
    }

    function incPageNum(){
        if (pageNum + 1 < maxPageNum) {
            setPageNum((prevState) => prevState + 1)
        }
    }




    function handleTimerSelect(e){
        // 0 is timer name, 1 is project, 2 is id, 3 is projectID, 4 is start, 5 is end
        const value = e.target.value.split(",")
        setSelectedTimer(value)
        setSelectedProject(value[1])
    }


    const len = recentTimers.length;
    if (len > 0) {
        const names = recentTimers.map(function(timer, index) {
            if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {
                return <RecentTimer key={index} text={timer}/>
            }
        })

        return(
        <Fragment>
            <div onChange={(e) => handleTimerSelect(e)}>{names}</div>
            <br></br>

            <Row>
                <Col>
                    <ThemedButton onClick={() => removeTimer(selectedTimer, setSelectedProject, setSelectedTimer)}>Mark As Complete</ThemedButton>
                </Col>
                <Col>
                    <ThemedButton>Edit Details</ThemedButton>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <ThemedButton onClick={decPageNum}>Previous Page</ThemedButton>
                    <Form.Label className="mx-3">{"Page " + (pageNum + 1) + " of " + maxPageNum}</Form.Label>
                </Col>

                <Col>
                    <ThemedButton onClick={incPageNum}>Next Page</ThemedButton>
                </Col>
            </Row>
        </Fragment>
        )

    } else {
        return(
        <Fragment>
            <Row>
                <Form.Label className="ml-3 mt-2 disabled">No active timer</Form.Label>
            </Row>
        </Fragment>)
    }
}