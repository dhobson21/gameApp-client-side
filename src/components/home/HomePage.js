import React, { useEffect, useState} from "react"
import "./HomePage.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import Event from "../event/Event"




const HomePage = props => {
    const [myEvents, setMyEvents] = useState([])
    const [otherEvents, setOtherEvents] = useState([])
    const {isAuthenticated} = useSimpleAuth()





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
              .then((response) => {
                var myEvents = []
                var otherEvents = []


                response.forEach(event => {event.user_player ? myEvents.push(event) : otherEvents.push(event)})
                setMyEvents(myEvents)
                setOtherEvents(otherEvents)
                console.log(myEvents)
                console.log(otherEvents)


                })

      }




    useEffect(getEvents, [])

      return(
        <>
          <h1> WELCOME TO BOARDUP</h1>

          {isAuthenticated() ?
          <React.Fragment>

          <h3 align='center'>My Upcoming Events</h3>
          <div className="user-events">

          {myEvents.map(event => {
            return(<Event key={event.id} event={event}/>)
          })
          }
          </div>
          <h3 align='center'> Events Happening Soon in Nashville</h3>
          <div className="other-events">

          {otherEvents.map(event => {
            return(<Event key={event.id} event={event}/>)
          })
          }
          </div>

          </React.Fragment>
          : ""}

        </>
    )
  }



export default HomePage