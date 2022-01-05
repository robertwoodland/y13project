import React, {useContext} from 'react';
import { Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../../App';

export default function ThemedButton(props) {
    const value = useContext(ThemeContext)
    return (
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>
                
            </Dropdown>
    )
}
