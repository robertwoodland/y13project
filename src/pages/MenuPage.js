import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default function MenuPage() {
    return (
        <div>
            <div class="bg-purple-300 h-screen flex items-center justify-center">
                <div class="bg-white border border-gray-400 shadow-lg flex flex-col items-center justify-center w-11/12 h-5/6 rounded-md">
                    <h1>
                        This is the Menu Page
                    </h1>
                    <Link to='/logout'>
                        <Button variant='primary mt-1 mb-1'>Log Out</Button>
                    </Link>

                    <Link to='/sample'>
                        <Button variant='outline-primary mt-1 mb-1'>Sample Page</Button>
                    </Link>

                    <Link to="scratch">
                        <Button variant='outline-primary my-1'>Scratch Page</Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}



