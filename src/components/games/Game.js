import React, {useRef, useState, useEffect, useCallback} from "react"
import { Link } from 'react-router-dom'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import GamePopOver from "./GamePopOver"


// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"




const Game = props => {
const [popoverOpen, setPopoverOpen] = useState(false);




    return (
        <>
        <React.Fragment>

        <GamePopOver {...props} />

        <div id={`Popover1-${props.game.id}`} className="card bg-white text-black" style={{width: "200px"}}>
        <img  className="card-img" src={props.game.image } alt="Game" style={{height: "10rem", vspace: "0px", hspace: "0px"}}  ></img>

        <div className="card-img-overlay">


        </div>
        <p className="card-text " align='center'>{props.game.name}</p>
        </div>
        </React.Fragment>
    </>
    )
}

export default Game
