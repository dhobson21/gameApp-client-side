import React, {useRef, useState, useEffect, useCallback} from "react"
import SearchResultsCard from "./SearchResultsCard"



const GameForm = props => {
    const [searchResults, setSearchResults] = useState([])
    const [APIGame, setAPIGame] = useState({
                                                name: "",
                                                min_players: "",
                                                max_players: "",
                                                api_id: "",
                                                description: "",
                                                thumbnail: ""
                                                        })
    const search = useRef("")
    const name = useRef()
    const host_descrip = useRef()
    let dialog = document.querySelector("#dialog--time")
    const [isOpen, setIsOpen] = useState(false)
    const[isEnabled, setIsEnabled] = useState(false)
    const[srchBtnEnabled, setSrchBtnEnabled] = useState(false)



    // functions for search results modal
    const toggleDialog = () => {


            setIsOpen(!isOpen)
            if (isOpen) {
                dialog.removeAttribute("open")
            } else {
                dialog.setAttribute("open", true)
            }
        }


    const searchGames = (event) => {
            event.preventDefault()
            fetch(`http://localhost:8000/games?search=${search.current.value}`, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

                }
            })
            .then(response => response.json())
            .then(setSearchResults)



        }

// Function to add new event to DB
    const addGame = (event) => {
        var format = /[!@#$%^&*()]+/;
        event.preventDefault()
        // convery price string to number and force $00.00 format
        // check on if user has selected a product category
        let idList= []
        props.games.forEach(game => idList.push(game.api_id))

        if (idList.includes(APIGame.api_id)) {
            window.alert("You  already have this game in your collection Please add a different game.")

        }



        else if ((host_descrip.current.value).match(format)) {
            window.alert("Please enter product name/details with no special characters; ie. no '!@#$%^&*()'")
        }

        else {

        fetch('http://localhost:8000/games', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gameApp_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "game": APIGame.api_id,
                "player": localStorage.getItem("id"),
                "host_descrip": host_descrip.current.value,

            })
        })
        .then(response => response.json())
        .then(() => {
            props.getGames()
        })
        .then(props.history.push("/collection"))
    }
}
    const enableSearchBtn = () => {
        search.current.value !== "" ? setSrchBtnEnabled(true) : setSrchBtnEnabled(false)}


    useEffect(() =>{
        if (searchResults.length > 0) {
            toggleDialog()}
        },[searchResults])

    return (
        <React.Fragment>
            <dialog id="dialog--time" className= "dialog--time" style={{width: "100%"}}>
                <div className="d-inline-flex justify-content-around">

                {searchResults.map((game, i) => {
                    return (<div key={i}>

                    <SearchResultsCard  game={game} {...props} />
                    <button   className="item"

                        onClick = {() => {
                            setIsEnabled(true)
                            setAPIGame({
                                        name: game.name,
                                        min_players: game.min_players,
                                        max_players: game.max_players,
                                        api_id: game.api_id,
                                        description: game.description,
                                        thumbnail: game.thumbnail
                                        })
                                toggleDialog()
                }}
                    >Select Game</button>
                    </div>)

                })

                }
                </div>
            </dialog>
            <form>
                <div>
                    <label htmlFor="search">Search for Game:</label>
                    <input
                    onChange = {enableSearchBtn}
                    ref={search}
                    name="search"
                    autoFocus
                    required

                    type="search"
                    />
                </div>
                <button
                    disabled={!srchBtnEnabled}
                    onClick = {(event) => {

                    searchGames(event)
                    }}>Find Game</button>

            </form>
            <hr/>
            <form>


                <div >
                    <label htmlFor="name">Game Name:</label>
                    <input
                    readOnly
                    ref={name}
                    value = {APIGame.name}
                    name="name"
                    type = "text"
                    required

                    />
                </div>
                <div>
                    <label htmlFor="min_players">Minimum Players:</label>
                    <input
                    readOnly
                    value={APIGame.min_players}
                    name="min_players"
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="max_players">Maximum Players:</label>
                    <input
                    readOnly
                    value={APIGame.max_players}
                    name="max_players"
                    required
                    type="text"

                    />
                </div>
                <div >
                    <label htmlFor="host_descrip">Description:</label>
                    <textarea
                    ref={host_descrip}
                    name="host_descrip"
                    required>

                    </textarea>
                </div>
                    <button disabled={!isEnabled} onClick={addGame}
                    >Add Game</button>
            </form>
        </React.Fragment>
    )
}


export default GameForm