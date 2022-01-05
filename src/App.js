import React, {useState, createContext, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage'
import ScratchPage from "./pages/ScratchPage";
import Secured from './components/Secured';
import app from "./components/base";

export const ThemeContext = createContext();

export default function App() {
    const [auth, setAuth] = useState(null)

    const [userColours, setUserColours] = useState(['#c4b5fd', '#9333ea']) // [backgroundColour, buttonColour]
    
    useEffect(() => {
        if (auth) {
            const email = auth.email
            const uid = auth.uid
            const firstName = auth.displayName.split(" ")[0]

            app.firestore().collection("users").doc(uid).get().then((data) => {
                if (!data.exists) {
                    app.firestore().collection("users").doc(uid).set({
                        firstName,
                        email
                    })
                }})
    }}, [auth])
    // THIS IS BIG SECURITY VULNERABILITY, AS USER CREATION CAN BE SPAMMED
    // Use a cloud function in future


    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <LoginPage
                            auth={auth}
                            setAuth={setAuth}/>
                        
                    </Route>
                    
                    <Route exact path="/logout">
                            <LogoutPage setAuth={setAuth} auth={auth}/>
                    </Route>

                    <Secured auth={auth}>
                        <ThemeContext.Provider value={{userColours: userColours, setUserColours: setUserColours}}>

                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/menu" component={MenuPage}/>
                        <Route exact path="/scratch" component={ScratchPage}/>
                        
                        </ThemeContext.Provider>
                    </Secured>
                </Switch>
            </Router>
        </div>
    )}



    /* How to use setState():
    
    
    setUserColors(prevState => prevSate + 1)
     setUserColors(prevState => {
        return prevSate + 1
    })

    setUserColors("newColorID")


    */