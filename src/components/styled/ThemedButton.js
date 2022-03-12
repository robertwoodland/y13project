import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../../App';

export default function ThemedButton(props) {
    const {secondaryColour} = useContext(ThemeContext)
    // Obtains colour themes from context defined in App.js
    return (
            <Button onClick={props.onClick} style={{backgroundColor: secondaryColour}}>

                {props.children}

            </Button>
    )
}
