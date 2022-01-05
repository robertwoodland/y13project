import React, {useContext} from 'react';
import DefNavbar from './DefNavbar';
import { ThemeContext } from '../../App';

export default function ContainerPage(props) {
    const value = useContext(ThemeContext)
    return (
        <div className="h-screen" style={{backgroundColor: value.userColours[0]}}>        
            <DefNavbar/>

            <div className="bg-white border shadow-lg w-11/12 h-5/6 rounded-md m-auto p-5">

                {props.children}

            </div>
        </div>
    )
}
