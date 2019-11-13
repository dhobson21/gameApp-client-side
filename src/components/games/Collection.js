import React, { useEffect, useState} from "react"
import Game from "./Game"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Collection.css"
import { Link } from 'react-router-dom'




const Collection = props => {
    const [myGames, setMyGames] = useState([])
    const {isAuthenticated} = useSimpleAuth()

    const getMyGames = () => {
      if (isAuthenticated()) {

          fetch(`http://localhost:8000/games?user_game=true`, {
              "method": "GET",
              "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

              }
          })
          .then(response => response.json())
          .then(setMyGames)
      }
  }





      useEffect(getMyGames, [])
      return(
        <>
          <h2 align='center'> Game Collection</h2>

          {isAuthenticated() ?
          <React.Fragment>
          <div className = 'button-NAME' float='right'>
            <Link to="/collection/add">Add New Game</Link>
          </div>


          <div className="game-collection">

          {myGames.map(game => {
            return(<Game {...props} key={game.id} game={game}/>)
          })
          }
          </div>
          <hr/>
          </React.Fragment>
          : ""}

        </>
    )
  }


  export default Collection