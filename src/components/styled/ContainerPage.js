import React, {useContext} from 'react';
import DefNavbar from './DefNavbar';
import { ThemeContext } from '../../App';

export default function ContainerPage(props) {
    const {primaryColour} = useContext(ThemeContext)
    return (
        <div className="h-screen" style={{backgroundColor: primaryColour}}>        
            <DefNavbar/>

            <div className="bg-white border shadow-lg w-11/12 h-5/6 rounded-md m-auto p-5">

                {props.children}

            </div>
        </div>
    )
}
