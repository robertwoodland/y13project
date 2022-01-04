import React, {useContext} from 'react';
import DefNavbar from '../Navbar/DefNavbar';
import { ThemeContext } from '../../App';

export default function ContainerPage(props) {
    const value = useContext(ThemeContext)
    return (
        <div class="h-screen" style={{backgroundColor: value.userColours[0]}}>        
            <DefNavbar/>

            <div class="bg-white border shadow-lg w-11/12 h-5/6 rounded-md m-auto p-3">

                {props.children}

            </div>
        </div>
    )
}
