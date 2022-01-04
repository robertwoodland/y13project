import React, {useEffect} from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default function LogoutPage(props) {
    const {setAuth, auth} = props
    useEffect(() => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful
            console.log("logged out")
            setAuth(null)
          }).catch((error) => {
            // An error happened.
          });
    }, [setAuth])
    return (
        <div>
            {auth ? <span/> : <Redirect to="/login"/>}
        </div>
    )
}
