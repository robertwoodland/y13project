import React, { Fragment, useEffect } from 'react'
import ThemedButton from '../styled/ThemedButton';
import { Form, Col, Row } from 'react-bootstrap';
import getTimers from '../Firebase Functions/getTimers';
import RecentTimer from './RecentTimer';
import removeTimer from '../Firebase Functions/removeTimer';
import decPageNum from '../PageNums/decPageNum';
import incPageNum from '../PageNums/incPageNum';


export default function ShowRecentTimers(props){

    const {setSelectedProject} = props
    const {recentTimers, setRecentTimers} = props
    const {maxPageNum, setMaxPageNum} = props
    const {pageNum, setPageNum} = props
    const {selectedTimer, setSelectedTimer} = props
    const {setEditTimer} = props
    const {uid} = props


    getTimers(setRecentTimers, setMaxPageNum, uid)


    useEffect(() => {
        if ((pageNum >= maxPageNum) && pageNum != 0) {
            console.log(pageNum, maxPageNum)
            setPageNum((prevState) => prevState - 1)
        }
    }, [maxPageNum, pageNum])
    

     
    function handleEditTimer(){
        if (selectedTimer) {
            setEditTimer(true)
        }
    }


    function handleTimerSelect(e){
        // 0 is timer name, 1 is project, 2 is id, 3 is projectId, 4 is start, 5 is end
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

            <Row className="mt-3">
                <Col>
                    <ThemedButton onClick={() => removeTimer(selectedTimer, setSelectedProject, setSelectedTimer)}>Delete</ThemedButton>
                </Col>
                <Col>
                    <ThemedButton onClick={() => handleEditTimer()}>Edit Details</ThemedButton>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <ThemedButton onClick={() => decPageNum(pageNum, setPageNum)}>Previous Page</ThemedButton>
                    <Form.Label className="mx-3">{"Page " + (pageNum + 1) + " of " + maxPageNum}</Form.Label>
                </Col>

                <Col>
                    <ThemedButton onClick={() => incPageNum(pageNum, setPageNum, maxPageNum)}>Next Page</ThemedButton>
                </Col>
            </Row>
        </Fragment>
        )

    } else {
        return(
        <Fragment>
            <Row>
                <Form.Label className="ml-3 mt-2 disabled">No previous timers</Form.Label>
            </Row>
        </Fragment>)
    }
}