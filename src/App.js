import React, { Fragment, useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage'
import ScratchPage from "./pages/ScratchPage";
import AddTaskPage from "./pages/AddTaskPage";
import ShowTasksPage from "./pages/ShowTasksPage";
import TasksMenuPage from "./pages/TasksMenuPage";
import Secured from './components/Secured';
import app from "./components/base";

export const ThemeContext = createContext();
export const UserContext = createContext();

export default function App() {
    const [auth, setAuth] = useState(null)

    const [userColours, setUserColours] = useState(['#c4b5fd', '#9333ea']) // [backgroundColour, buttonColour]
    const [userId, setUserId] = useState()
    
    useEffect(() => {
        if (auth) {
            const email = auth.email
            const uid = auth.uid
            const firstName = auth.displayName.split(" ")[0]

            setUserId(uid)

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
        <Fragment>
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
                        <UserContext.Provider value={{userId: userId}}>

                            <Route exact path="/menu" component={MenuPage}/>
                            <Route exact path="/scratch" component={ScratchPage}/>
                            <Route exact path="/tasks-menu" component={TasksMenuPage}/>
                            <Route exact path="/add-tasks" component={AddTaskPage}/>
                            <Route exact path="/show-tasks" component={ShowTasksPage}/>
                        </UserContext.Provider>
                        </ThemeContext.Provider>
                    </Secured>
                </Switch>
            </Router>
        </Fragment>
    )}



    /* How to use setState():
    
    
    setUserColors(prevState => prevSate + 1)
     setUserColors(prevState => {
        return prevSate + 1
    })

    setUserColors("newColorID")


    */