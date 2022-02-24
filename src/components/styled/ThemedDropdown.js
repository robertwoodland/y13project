import React, {useContext} from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../../App';

export default function ThemedDropdown(props) {
    const {secondaryColour} = useContext(ThemeContext)
    return (
        <Dropdown.Toggle style={{backgroundColor: secondaryColour, minWidth:"100%"}}>
            {props.children}
        </Dropdown.Toggle>
    )
}
