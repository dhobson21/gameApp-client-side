import React, {useState, useEffect} from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import './GameApp.css';


const GameAppBuilder = () => {
    const [messages, setMessages]    = useState([])

    const callBack = (messageData) => {
        console.log('callback')
        setMessages(messageData)
    }

    return (

        <div>

            <Route render={props => (
                <NavBar {...props} myMessages = {messages} />
            )} />
            <Route render={props => (
            <ApplicationViews {...props} callBack= {callBack} />
            )}/>
        </div>
    )
}

export default GameAppBuilder