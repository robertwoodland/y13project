import React, {useEffect, useState} from 'react'
import app from '../components/base'
import firebase from "firebase";
import {Redirect} from "react-router-dom";
import LoginBox from "../components/LoginPage/LoginBox";
import Loading from "../components/LoginPage/Loading";

export default function LoginPage(props) {
    const {setAuth, auth} = props
    const [loading, setLoading] = useState(true)

    const provider = new firebase
    .auth
    .GoogleAuthProvider()

useEffect(() => {
    const unsubscribe = firebase
        .auth()
        .onAuthStateChanged(function (user) {
            if (user) {
                // HERE ADD BACKGROUND COLOUR SETTING THROUGH CONTEXT
                setAuth(user)
            } else {
                setAuth(false);
                setLoading(false)
            }
        });
    return () => {
        unsubscribe()
    }
}, [setAuth])

app
    .auth()
    .getRedirectResult()
    .catch(function (error) {
        console.log(error)
    });

function signin() {
    app
        .auth()
        .signInWithRedirect(provider)
}

    return (
        <div>
            {auth
                ? <Redirect to="/home"/>
                : (loading ? <Loading/> : <LoginBox signin={signin}/>)}
        </div>
    )
}
