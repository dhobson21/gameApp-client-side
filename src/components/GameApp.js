import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import './GameApp.css';


const GameAppBuilder = () => {
    return (

        <div>

            <Route render={props => (
                <NavBar {...props} />
            )} />
            <ApplicationViews />
        </div>
    )
}

export default GameAppBuilder