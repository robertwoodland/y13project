import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage'
import ScratchPage from "./pages/ScratchPage";
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
                        <Route exact path="/menu" component={MenuPage}/>
                        <Route exact path="/scratch" component={ScratchPage}/>
                        
                    </Secured>
                </Switch>
            </Router>
        </div>
    )}