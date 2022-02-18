import React, { Fragment } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function RecentTask(props){
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


    return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={text} label={name} name={"task-radio"}/>
                </Col>
                
                <Col>
                    <Form.Label>{project + " - " + formatted}</Form.Label>
                </Col>
            </Row>
        </Fragment>
    )
}