import React, {useContext} from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../../App';

export default function ThemedButton(props) {
    const value = useContext(ThemeContext)
    return (
            <Button onClick={props.onClick} style={{backgroundColor: value.userColours[1]}}>

                {props.children}

            </Button>
    )
}
