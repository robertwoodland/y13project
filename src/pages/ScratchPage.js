import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import DefNavbar from '../components/Navbar/DefNavbar'

const btn = {backgroundColor: '#9333ea'}
const background = {backgroundColor: '#c4b5fd'}

export default function ScratchPage() {
    return (

        <div class="h-screen" style={background}>


            <DefNavbar/>


            <div class="bg-white border shadow-lg w-11/12 h-5/6 rounded-md m-auto p-3">
                <Row align="center">
                    <Col>
                        <Link to="/menu">
                            <Button style={btn}>
                                <h2 class="text-center">
                                    Menu
                                </h2>
                            </Button>
                        </Link>
                    </Col>

                    <Col>
                        <h1 class='text-center'>Sample Text</h1>
                    </Col>
                </Row>
            </div>


        </div>
    )}