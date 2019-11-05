import React, { useState, useEffect, useRef } from "react";
import "./GameDetail.css";


const GameDetail = props => {






    const  replaceDescrip = () => {
        let current = document.querySelector("#current-descrip")
        let input = <input id="stuff"
                    type="text"></input>
        let newOne = document.querySelector("#stuff")
        let parentDiv = document.querySelector("#descrip-div")
        parentDiv.replaceChild(newOne, current)

    }



  useEffect(() => {


});
console.log(props)
  return (
    <>
        <button onClick={replaceDescrip}>Replace</button>
        <div className="container " style={{height: "10rem", border: "11px red solid"}}>
        <div className ="d-flex justify-content-center">
            <h3  className='game-title' >{props.game.name}</h3>
        </div>
        </div>
        {/* <div className="container d-flex justify-content-between"> */}
            <div className = "d-flex justify-content-between row col-md-12" style={{border: "3px yellow solid"}}>
           <div  className='col-md-3' style={{border: "3px green solid", textAlign: 'center'}}>Your Game Description
           <div>
                <p id="current-descrip">{props.game.host_descrip}</p>
            </div>
           </div>

           <div className='col-md-3' style={{border: "3px blue solid", textAlign: 'center'}}>{props.game.name}'s Game Description
            <div id="descrip-div">
                {props.game.game_descrip}
            </div>


           </div>
            </div>
        {/* </div> */}
    </>
  );
};

export default GameDetail;
