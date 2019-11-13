import React, {useRef, useState, useEffect} from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./EventForm.css"




const EventForm = props => {
    const [myGames, setMyGames] = useState([])
    const name = useRef()
    const game = useRef()
    const description = useRef()
    const address = useRef()
    const zip_code = useRef()
    const date = useRef()
    const time = useRef()
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
        let d = new Date().toISOString().slice(0,10);
        console.log("date", date.current.value)
        console.log("date", d)

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
        else if (date.current.value < d) {
            window.alert("Please select a future date")
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
                "has_played": true,
                "recurring": 0,
                "recurring_days": null

            })
        })
        .then(response => response.json())
        .then(props.getEvents())
         .then(props.history.push("/"))
    }
    }
    useEffect(getMyGames,[])
    return (
        <React.Fragment>
            <h2 align='center'>Host an Event</h2>
            <form className = 'event-form'>
                <div className='event-div'>
                    <label className='event-label' htmlFor="name">Name:</label>
                    <input className='event-input'
                    ref={name}
                    name="name"
                    autoFocus
                    required
                    type="text"

                    />
                </div>
                <div className= 'event-div'>
                    <label className= 'event-label' htmlFor="game">Game:</label>
                    <select className='event-input'
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
                <div className= 'event-div'>
                    <label className= 'event-label' htmlFor="description">Description:</label>
                    <textarea className= 'event-input'
                    ref={description}
                    name="description"
                    required>

                    </textarea>
                </div>
                <div className= 'event-div'>
                    <label className= 'event-label' htmlFor="address">Address:</label>
                    <input className= 'event-input'
                    ref={address}
                    name="addres"
                    required
                    type="text"

                    />
                </div>
                <div className= 'event-div'>
                    <label className= 'event-label' htmlFor="zip_code">Zip Code:</label>
                    <input className= 'event-input'
                    name="zip_code"
                    ref={zip_code}
                    required
                    type= "text"

                    />
                </div>
                <div className = 'event-div'>
                    <label className = 'event-label' htmlFor="time">Time:</label>
                    <input className = 'event-input'
                    name="time"
                    ref={time}
                    required
                    type= "time"

                    />
                </div>
                <div className = 'event-div'>
                    <label className= 'event-label' htmlFor="date">Date:</label>
                    <input className= 'event-input'
                    type="date"
                    ref={date}
                    name="date"
                    min={new Date().toISOString().slice(0,10)}
                    required></input>
                </div>

                    <button className = 'event-button' onClick={addEvent}
                    >Create Event</button>
            </form>
        </React.Fragment>
    )
}


export default EventForm