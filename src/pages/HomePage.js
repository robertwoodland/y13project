import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default function HomePage() {
    return (
        <div>
            <div className="bg-purple-300 h-screen flex items-center justify-center">
                <div className="bg-white border border-gray-400 shadow-lg flex flex-col items-center justify-center w-11/12 h-5/6 rounded-md">
                    <h1>
                        This is the Home Page
                    </h1>
                    
                    <Link to='/logout'>
                        <Button variant='primary mt-1 mb-1'>Log Out</Button>
                    </Link>

                    <Link to="/scratch">
                        <Button variant='outline-primary my-1'>Scratch Page</Button>
                    </Link>

                    <Link to="/menu">
                        <Button variant='outline-primary my-1'>Menu Page</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}



