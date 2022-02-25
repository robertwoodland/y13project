import React, { Fragment } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function RecentProject(props){
    /*
    const {formattedDueDate} = props

    // Text: 0 is task name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID
    const {text} = props
    const name = text[0]
    const project = text[1]
    const dueDate = text[2].split("-")

    let formatted = ""
    if (dueDate) {
        formatted = dueDate[2] + "/" + dueDate[1]
    }
    */

    const {selectedTask} = props

    console.log(selectedTask)


    return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={selectedTask} label={selectedTask[0]} name={"project-radio"}/>
                </Col>
                
                <Col>
                    <Form.Label>{project}</Form.Label>
                </Col>
            </Row>
        </Fragment>
    )
}