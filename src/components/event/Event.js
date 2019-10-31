import React from "react"
import { Link } from 'react-router-dom'
// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Event.css"



const Event = props => {
    // const { isAuthenticated } = useSimpleAuth()

    // Function to determine if and how many players are needed to meet min_player property of game---added to bottom of card if more players are needed
    const playersNeeded = () => {

        if (props.event.need_players > 0) {
            return <p>NEEDS AT LEAST {props.event.need_players} MORE PLAYER TO PLAY</p>
        }

  }


    return (
        <>
          <div className={`card product-${props.event.id}`} style={{width: "20rem", height: "13rem"}}>

                  <Link className="nav-link" to={`/events/${props.event.id}`}>
                      <h5 align="center">{props.event.name}</h5>
                  </Link>


                <div className="d-inline-flex justify-content-around">
                    <div>

                    <p align="center">Game: {props.event.game.name}</p>
                    <img  className=" img-fluid card-img-bottom" src={props.event.game.thumb_nail } alt="Game" style={{width: "7rem", height: "6rem"}} ></img>

                    </div>
                    <div >
                        <p>Date: <b>{props.event.date}</b></p>
                        <p>Time: <b>{props.event.time}</b></p>
                    </div>

            </div>
            <div>
                        {playersNeeded()}

            </div>
          </div>

        </>
    )
}

export default Event
