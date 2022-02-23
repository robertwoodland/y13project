import React, { Fragment } from "react";
import { Col, Row, Form } from "react-bootstrap";
import getHHMM from "./getHHMM";

export default function RecentTimer(props){

    // Text: 0 is timer name, 1 is project, 2 is id, 3 is projectId, 4 is start, 5 is end
    const {text} = props
    const name = text[0]
    const project = text[1]
    const startTime = getHHMM(text[4])
    const endTime = getHHMM(text[5])
    
    const date = new Date(text[5])
    const endDate = (date.getDate().toString()) + "/" +  (date.getMonth() + 1).toString()

    return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={text} label={name} name={"timer-radio"}/>
                </Col>
                
                <Col>
                    <Form.Label>{project + " - " + endDate}</Form.Label>
                </Col>

                <Col>
                    <Form.Label>{startTime + " - " + endTime}</Form.Label>
                </Col>
            </Row>
        </Fragment>
    )
}