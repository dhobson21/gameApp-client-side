import React, { useEffect, useState} from "react"
import Game from "./Game"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Collection.css"
import { Link } from 'react-router-dom'
import Message from "./Message"




const MessagePage = props => {
    const [myMessages, setMyMessages] = useState([])
    const {isAuthenticated} = useSimpleAuth()

    const getMyMessages = () => {
      if (isAuthenticated()) {

          fetch(`http://localhost:8000/messages`, {
              "method": "GET",
              "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

              }
          })
          .then(response => response.json())
          .then(setMyMessages)
      }
  }





      useEffect(getMyMessages, [])
      return(
        <>
          <h1 align='center'> BoardUp Inbox</h1>

          {isAuthenticated() ?
          <React.Fragment>

          <h3 align='center'>My Messages</h3>
          <div className="gmessage-List">

          {myMessages.map(message => {
            return(<Message {...props} key={message.id} message={message}/>)

          })
          }
          </div>

          <hr/>
          </React.Fragment>
          : ""}

        </>
    )
  }


  export default MessagePage