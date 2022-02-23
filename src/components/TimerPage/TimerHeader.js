import { Fragment, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import getDuration from "./getDuration";

export default function TimerHeader(props) {
    const {timerName} = props
    const {selectedProject} = props
    const {startTime} = props

    const [duration, setDuration] = useState()


    useEffect(() => {

        setInterval(() => {
            getDuration(startTime, null, setDuration)
        }, 1000);

    }, [])



    



    return(
        <Fragment>
            <Form>
                <Row>
                    <Col className="col-1">
                        <Form.Label>Active timer:</Form.Label>
                    </Col>

                    <Col>
                        <Form.Label>Name: {timerName}</Form.Label>
                    </Col>

                    <Col>
                        <Form.Label>Project: {selectedProject}</Form.Label>
                    </Col>

                    <Col className="col-2">  
                        <Form.Label>Start time: {startTime}</Form.Label>
                    </Col>

                    <Col className="col-3">
                        <Form.Label>Duration: {duration}</Form.Label>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}