import React, {useRef, useState, useEffect} from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"



const EventForm = props => {
    const [myGames, setMyGames] = useState([])
    const name = useRef()
    const game = useRef()
    const description = useRef()
    const address = useRef()
    const zip_code = useRef()
    const date = useRef()
    const time = useRef()
    const has_played = useRef()
    const { isAuthenticated } = useSimpleAuth()


    // Need to get collection of user's games for game dropdown
    const getMyGames = () => {
        if (isAuthenticated()) {

            fetch(`http://localhost:8000/games?user=true`, {
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



// Function to add new event to DB
    const addEvent = (event) => {
        var format = /[!@#$%^&*()]+/;
        event.preventDefault()
        // convery price string to number and force $00.00 format
        // check on if user has selected a product category
        if ((name.current.value).match(format) || (description.current.value).match(format)) {
            window.alert("Please enter product name/details with no special characters; ie. no '!@#$%^&*()'")
        }
        else if (zip_code.current.value.length !== 5) {
            window.alert("Please enter a valid, 5-digit zip code")
        }
        else if (game.current.value === 0) {
            window.alert("Please select a game to host")
        }

        else {

        fetch('http://localhost:8000/events', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gameApp_token")}`
            },
            "body": JSON.stringify({
                "name": name.current.value,
                "game": game.current.value,
                "description": description.current.value,
                "address": address.current.value,
                "zip_code": zip_code.current.value,
                "date": date.current.value,
                "time": time.current.value,
                "has_played": has_played.current.value,
                "recurring": 0,
                "recurring_days": null

            })
        })
        .then(response => response.json())
        .then(() => {
            props.getEvents()
            props.history.push("/")
        })
    }
    }
    useEffect(getMyGames,[])
    return (
        <React.Fragment>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                    ref={name}
                    name="name"
                    autoFocus
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="game">Game:</label>
                    <select
                    name="game"
                    ref={game}
                    required>
                    <option defaultValue value = "0"> -- select a game -- </option>
                    {
                            myGames.map(game =>
                            <option  key={game.id} value={game.id}>{game.name}</option>
                        )
                    }
                    </select>
                </div>
                <div >
                    <label htmlFor="description">Description:</label>
                    <textarea
                    ref={description}
                    name="description"
                    required>

                    </textarea>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                    ref={address}
                    name="addres"
                    required
                    type="text"

                    />
                </div>
                <div>
                    <label htmlFor="zip_code">Zip Code:</label>
                    <input
                    name="zip_code"
                    ref={zip_code}
                    required
                    type= "text"

                    />
                </div>
                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                    name="time"
                    ref={time}
                    required
                    type= "time"

                    />
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                    type="date"
                    ref={date}
                    name="date"
                    min={new Date().toISOString().slice(0,10)}
                    required></input>
                </div>
                <div>
                <label htmlFor="has_played">Have you played this game before?</label>
                    <select
                    name="has_played"
                    ref={has_played}
                    required>
                    <option defaultValue value = "True">Yes</option>
                    <option  value = "False">No</option>
                    </select>
                </div>
                    <button onClick={addEvent}
                    >Create Event</button>
            </form>
        </React.Fragment>
    )
}


export default EventForm