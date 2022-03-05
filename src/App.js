import React, { Fragment, useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage'
import AddTaskPage from "./pages/AddTaskPage";
import ShowTasksPage from "./pages/ShowTasksPage";
import TasksMenuPage from "./pages/TasksMenuPage";
import TimerPage from "./pages/TimerPage";
import ProjectsPage from "./pages/ProjectsPage";
import PreferencesPage from "./pages/PreferencesPage";
import Secured from './components/Secured';
import app from "./components/base";
import ReportsPage from "./pages/ReportsPage";

// Used to validate inputs for project names, task names and timer names
export function validateInput(input) {
    if (input.trim()) {
        return input.replaceAll(",", " ").substring(0, 100)
    } else {
        return ""
    }
}

export const ThemeContext = createContext(); // Creating Contexts
export const UserContext = createContext();

export default function App() {
    const [auth, setAuth] = useState(null);

    const [primaryColour, setPrimaryColour] = useState('#c4b5fd'); // background colour (as state hook)
    const [secondaryColour, setSecondaryColour] = useState('#9333ea'); // button colour
    const [uid, setUid] = useState();
    const [username, setUsername] = useState();
    
    useEffect(() => {
        if (auth) {
            const email = auth.email
            const uid = auth.uid
            const firstName = auth.displayName.split(" ")[0]

            setUid(uid)
            setUsername(firstName)

            app.firestore().collection("users").doc(uid).get().then((res) => {
                if (!res.exists) {
                    const taskCount = 0
                    app.firestore().collection("users").doc(uid).set({
                        username: firstName,
                        email,
                        taskCount,
                        primaryColour,
                        secondaryColour
                    })
                } else {
                    const data = res.data() // returns all qualities from users collection
                    setUsername(data.username)
                    setPrimaryColour(data.primaryColour)
                    setSecondaryColour(data.secondaryColour)
                }
            })
    }}, [auth])
    // THIS IS A SECURITY VULNERABILITY, AS USER CREATION CAN BE SPAMMED
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
                        <ThemeContext.Provider value={{primaryColour: primaryColour, setPrimaryColour: setPrimaryColour,
                        secondaryColour: secondaryColour, setSecondaryColour: setSecondaryColour}}>
                        <UserContext.Provider value={{username: username, setUsername: setUsername, uid: uid}}>
                        {/* Passes state and setState down through UseContext hook*/}

                            <Route exact path="/menu" component={MenuPage}/>
                            <Route exact path="/tasks-menu" component={TasksMenuPage}/>
                            <Route exact path="/add-tasks" component={AddTaskPage}/>
                            <Route exact path="/show-tasks" component={ShowTasksPage}/>
                            <Route exact path="/timer" component={TimerPage}/>
                            <Route exact path="/preferences" component={PreferencesPage} />
                            <Route exact path="/projects" component={ProjectsPage} />
                            <Route exact path="/reports" component={ReportsPage} />
                        </UserContext.Provider>
                        </ThemeContext.Provider>
                    </Secured>
                </Switch>
            </Router>
        </Fragment>
    )}
