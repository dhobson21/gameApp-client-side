import { Route } from "react-router-dom"
import React, {  useState, useEffect } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import EventForm from    "./event/EventForm"
import EventDetail from "./event/EventDetail"
import MessagesPage from "./messages/MessagesPage"
import GameForm from    "./games/GameForm"
import GameDetail from    "./games/GameDetail"
import HomePage from "./home/HomePage"
import Collection from "./games/Collection"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import ExplorePage from "./explore/ExplorePage"

const ApplicationViews = () => {
    const [games, setGames] = useState([])
    const [messages, setMessages] = useState([])
    const [categories, setCategories] = useState([])
    const [events, setEvents] = useState([])
    const { isAuthenticated } = useSimpleAuth()


    const getEvents = (event) => {
        if (event) {
          event.preventDefault()
        }
          fetch(`http://localhost:8000/events`, {
              "method": "GET",
              "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

              }
          })
          .then(response => response.json())
          .then(setEvents)

  }

    const getGames = () => {


            fetch(`http://localhost:8000/games`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

                }
            })
            .then(response => response.json())
            .then(setGames)

    }
    const getMessages = () => {


            return fetch(`http://localhost:8000/messages?new=true`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

                }
            })
            .then(response => response.json())
            .then(setMessages)

    }

    const getCategories = () => {
        fetch(`http://localhost:8000/categories`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

            }
        })
        .then(response => response.json())
        .then(setCategories)

    }


    useEffect(() => {
        getEvents()
        getGames()
        getCategories()
        getMessages()
    }, [])
    return(
        <React.Fragment>

            <Route
                exact path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                exact path="/login" render={props => {
                    return <Login {...props} />
                }}
            />
            <Route
                exact path="/" render={props => {
                    if(isAuthenticated()) return (
                        <HomePage {...props} />
                    )
                    else return<Redirect to="/login" />
                }}
            />
             <Route exact path="/events/:eventId(\d+)" render={(props) => {
                if (isAuthenticated()) {
                let event = events.find(e => e.id === +props.match.params.eventId)
                if (event) {
                    return <EventDetail getEvents={getEvents} {...props} event={event}/>

                }
                else {
                    event = {id:404, name:"Product Not Found." }
                    }
                }
                else return <Redirect to="/login" />
                }}
            />

            <Route
                exact path="/collection" render={props => {
                    if(isAuthenticated()) return (
                        <Collection {...props}    />
                    )
                    else return <Redirect to="/login" />
                }}
            />
              <Route exact path="/collection/:gameId(\d+)" render={(props) => {
                if (isAuthenticated()) {
                let game = games.find(g => g.id === +props.match.params.gameId)
                if (game) {
                    return <GameDetail getGames={getGames} {...props} game={game}/>

                }
                else {
                    game = {id:404, name:"Game Not Found." }
                    }
                }
                else return <Redirect to="/login" />
                }}
            />
            <Route
                exact path="/collection/add" render={props => {
                    if(isAuthenticated()) return (
                        <GameForm {...props} getGames={getGames}    />
                    )
                    else return <Redirect to="/login" />
                }}
            />
            <Route
                exact path="/host-form" render={props => {
                    if(isAuthenticated()) return (
                        <EventForm {...props} events={events} getEvents={getEvents}   />
                    )
                    else return <Redirect to="/login" />
                }}
            />
            <Route
                exact path="/messages" render={props => {
                    if(isAuthenticated()) return (
                        <MessagesPage {...props} getMessages={getMessages} messages={messages}  />
                    )
                    else return <Redirect to="/login" />
                }}
            />
            <Route
                exact path="/explore" render={props => {
                    if(isAuthenticated()) return (
                        <ExplorePage {...props} getEvents={getEvents}   />
                    )
                    else return <Redirect to="/login" />
                }}
            />





        </React.Fragment>
    )


}

export default withRouter(ApplicationViews)
