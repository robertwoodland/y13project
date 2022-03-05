import React, { Fragment, useContext, useState } from 'react'
import RecentTask from './RecentTask';
import ThemedButton from '../styled/ThemedButton';
import { Form, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import decPageNum from '../PageNums/decPageNum';
import incPageNum from '../PageNums/incPageNum';


export default function ShowRecentTasks(props){

    const {uid} = useContext(UserContext)

    const [selectedRadio, setSelectedRadio] = useState();

    const {recentTasks} = props
    const {pageNum, setPageNum} = props
    const {handleShowDetails} = props
    const {markComplete} = props
    const {selectedTask, setSelectedProject, setSelectedTask, setDueDate} = props
    const {maxPageNum} = props
    const {taskCount} = props

    function handleTaskSelect(e){
        setSelectedRadio(e.target)

        // 0 is task name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID
        const value = e.target.value.split(",")
        setSelectedTask(value)
        setSelectedProject(value[1])
    
        const date = value[2].split("-")
        setDueDate(value[2])
    }

    function handleSubmit() {
        setSelectedRadio((radio) => {
            if (radio) {
                radio.checked = false
                return radio
            }
        })

        markComplete(selectedTask, setSelectedProject, setSelectedTask,
            setDueDate, taskCount, uid)
    }


    const len = recentTasks.length;
    if (len > 0) {
        const names = recentTasks.map(function(task, index) {
            if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {
                return <RecentTask key={index} text={task}/>
            }
        }) // This 'maps' all of the <RecentTask> components into an array to be shown

        return(
        <Fragment>
            <div onChange={(e) => handleTaskSelect(e)}>{names}</div>
            <br></br>

            <Row>
                <Col>
                    <ThemedButton onClick={() => handleSubmit()}>Mark As Complete</ThemedButton>
                </Col>
                <Col>
                    <ThemedButton onClick={handleShowDetails}>Edit Details</ThemedButton>
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
                <Form.Label className="ml-3 mt-2 disabled">No active tasks</Form.Label>
            </Row>
        </Fragment>)
    }
}