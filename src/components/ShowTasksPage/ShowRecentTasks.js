import React, { Fragment, useContext } from 'react'
import RecentTask from './RecentTask';
import ThemedButton from '../styled/ThemedButton';
import { Form, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../App';


export default function ShowRecentTasks(props){

    const {taskCount, setTaskCount, uid} = useContext(UserContext)

    const {recentTasks} = props
    const {pageNum} = props
    const {handleShowDetails} = props
    const {markComplete} = props
    const {incPageNum, decPageNum} = props
    const {selectedTask, setSelectedProject, setSelectedTask, setDueDate} = props
    const {maxPageNum} = props
    const {setFormattedDueDate} = props

    function handleTaskSelect(e){
        // 0 is name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID
        const value = e.target.value.split(",")
        setSelectedTask(value)
        setSelectedProject(value[1])
    
        const date = value[2].split("-")
        setDueDate(value[2])
        setFormattedDueDate(date[1] + "/" + date[2])
    }


    const len = recentTasks.length;
    if (len > 0) {
        const names = recentTasks.map(function(task, index) {
            if (index >= 10 * pageNum && index < (10 * pageNum) + 10) {
                return <RecentTask key={index} text={task}/>
            }
        })

        return(
        <Fragment>
            <div onChange={(e) => handleTaskSelect(e)}>{names}</div>
            <br></br>

            <Row>
                <Col>
                    <ThemedButton onClick={() => markComplete(selectedTask, setSelectedProject, setSelectedTask, setDueDate, taskCount, setTaskCount, uid)}>Mark As Complete</ThemedButton>
                </Col>
                <Col>
                    <ThemedButton onClick={handleShowDetails}>Edit Details</ThemedButton>
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
                <Form.Label className="ml-3 mt-2 disabled">No active tasks</Form.Label>
            </Row>
        </Fragment>)
    }
}