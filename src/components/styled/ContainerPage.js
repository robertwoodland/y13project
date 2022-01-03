import React from 'react'
import DefNavbar from '../Navbar/DefNavbar'

export default function ContainerPage(props) {
    const {background} = props
    return (
        <div class="h-screen" style={background}>        
            <DefNavbar/>

            <div class="bg-white border shadow-lg w-11/12 h-5/6 rounded-md m-auto p-3">

            {props.children}

            </div>
        </div>
    )
}
