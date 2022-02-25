import React, { Fragment } from "react";
import { Col, Row, Form } from "react-bootstrap";

export default function RecentProjectItem(props){
    const {text} = props
    const projectName = text[0]
    const accessedTime = new Date(text[1])

    let date = accessedTime.getDate().toString()
    if (date.length == 1) {
        date = "0" + date
    }

    let month = (accessedTime.getMonth() + 1).toString()
    if (month.length == 1) {
        month = "0" + month
    }

    const accessedFormatted = date + "/" + month


    return(
        <Fragment>
            <Row>
                <Col>
                    <Form.Check type="radio" value={text} label={projectName} name={"project-radio"}/>
                </Col>
                
                <Col>
                    <Form.Label>{"Last accessed: " + accessedFormatted}</Form.Label>
                </Col>
            </Row>
        </Fragment>
    )
}