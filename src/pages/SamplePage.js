import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default function SamplePage() {
    return (
        <div>
            <div class="bg-purple-300 h-screen flex items-center justify-center">
                <div class="bg-white border border-gray-400 shadow-lg flex flex-col items-center justify-center w-11/12 h-5/6 rounded-md">
                    <h1>
                        This is the Sample Page
                    </h1>
                    <Link to='/home'>
                        <Button variant='primary'>Home</Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}