import React, {useContext} from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../../App';

export default function ThemedDropdown(props) {
    const value = useContext(ThemeContext)
    return (
        <Dropdown.Toggle style={{backgroundColor: value.userColours[1], minWidth:"100%"}}>
            {props.children}
        </Dropdown.Toggle>
    )
}
