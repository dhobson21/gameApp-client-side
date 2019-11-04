import React from "react"
// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"




const SearchResultsCard = props => {
    // const { isAuthenticated } = useSimpleAuth()

    return (
        <>
        <div className="card" style={{width: "15rem"}}>
        <h3 className="card-title" align="center">{props.game.name}</h3>
        <img  className="card-body" src={props.game.image } alt="Game"style={{height: "15rem", width: "15rem" }}  ></img>

        <div className="card-body">
        <p className="card-title" align="center">Min Players Needed: <b>{props.game.min_players}</b></p>
        <p className="card-title" align="center">Max Players Allowed: <b>{props.game.max_players}</b></p>
            {props.game.description.length > 50 ?
            <p className="card-text" align='center'>Description: {props.game.description.substring(0,50)}...</p> : <p className="card-text" align='center'>Description: {props.game.description}</p>
            }

        </div>
        </div>
    </>
    )
}

export default SearchResultsCard