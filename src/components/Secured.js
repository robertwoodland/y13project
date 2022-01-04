import React from 'react';
import {Redirect} from 'react-router-dom';

export default function Secured(props) {
    return (
        <div>
            {props.auth ? (props.children) : (<Redirect
                to={"/login"}/>)}
        </div>
    )
}