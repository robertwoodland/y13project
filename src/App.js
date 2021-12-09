import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage'
import Secured from './components/Secured'

export default function App() {
    const [auth, setAuth] = useState(null)
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
                        <Route exact path="/home" component={HomePage}/>

                    </Secured>
                </Switch>
            </Router>
        </div>
    )}