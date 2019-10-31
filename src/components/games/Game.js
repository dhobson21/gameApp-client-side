import React from "react"
import { Link } from 'react-router-dom'
// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"




const Game = props => {
    // const { isAuthenticated } = useSimpleAuth()


    console.log(props)
    return (
        <>
        <div className="card" style={{width: "200px"}}>
        {/* <img className="card-img-top" src={props.game.image} alt="Game"> </img> */}
        <img  className=" card-img-top img-fluid" src={props.game.image } alt="Game"style={{height: "10rem", vspace: "0px", hspace: "0px"}}  ></img>

        <div className="card-body">
        <Link className="nav-link" to={`/games/${props.game.id}`}>
                      <h4 className="card-title" align="center">{props.game.name}</h4>
                  </Link>
            <p className="card-text" align='center'>{props.game.host_descrip}</p>

        </div>
        </div>
    </>
    )
}

export default Game
