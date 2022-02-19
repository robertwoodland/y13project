import React, { Fragment } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function RecentTimer(props){
    const {formattedDueDate} = props

    // Text: 0 is timer name, 1 is project, 2 is id, 3 is projectID, 4 is start, 5 is end
    const {text} = props
    const name = text[0]
    const project = text[1]
    const endTime = text[5] // TO-DO: Need to format

    return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={text} label={name} name={"timer-radio"}/>
                </Col>
                
                <Col>
                    <Form.Label>{project + " - " + endTime}</Form.Label>
                </Col>
            </Row>
        </Fragment>
    )
}