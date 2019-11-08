import React, { useState, useEffect, useRef } from "react";
// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import { Link } from 'react-router-dom'
import "./EventDetail.css";

const EventDetail = props => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const name = useRef();
    const description = useRef();
    const date = useRef();
    const time = useRef();
    const address = useRef();
    const zip_code = useRef();
    let edit = null;
    let del = null;
    let join = null;
    let dialog = null
    let joinDialog = null


  // Functions for edit modal
  const toggleDialog = () => {
    setIsOpen(!modalIsOpen)

    if (modalIsOpen) {
        dialog.removeAttribute("open")
    } else {
        dialog.setAttribute("open", true)
    }
}



    // function to delete an event---also deletes playerEvents
  const deleteEvent = () => {
    window.confirm(`are you sure you want to cancel ${props.event.name}`);
    fetch(`http://localhost:8000/events/${props.event.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("gameApp_token")}`
      }
    }).then(() => {
      props.getEvents();
      props.history.push("/");
      window.alert(`${props.event.name} has been removed from Calendar`);
    });
  };

//   Post to playerEvent Table which alsos creates a message to approve for the host
  const requestJoinEvent = () => {

    if(!props.event.user_player) {
        window.confirm("You must be approved by host before joining")

            fetch('http://localhost:8000/playerevents', {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gameApp_token")}`
            },
            "body": JSON.stringify({
                "event": props.event.id,
                "has_played": false

            })
        })
        .then(response => response.json())
        .then(() => {
            window.alert("Request sent to host")
            props.getEvents()
            props.history.push("/")
        })


    }
  }


  //   Function to PUT changed event
  const editEvent = (event) => {
    var format = /[!@#$%^&*()]+/;
    var q = new Date()
    var m = q.getMonth();
    var d = q.getDay();
    var y = q.getFullYear();
    var today_date = new Date(y,m,d);

        event.preventDefault()
        // convery price string to number and force $00.00 format
        // check on if user has selected a product category
        if ((name.current.value).match(format) || (description.current.value).match(format)) {
            window.alert("Please enter product name/details with no special characters; ie. no '!@#$%^&*()'")
        }
        else if (zip_code.current.value.length !== 5) {
            window.alert("Please enter a valid, 5-digit zip code")
        }
        else if (Date.parse(date.current.value) <= Date.parse(today_date)) {
            window.alert("Please select a future date")
        }
        else {
        fetch(`http://localhost:8000/events/${props.event.id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("gameApp_token")}`
            },
            "body": JSON.stringify({
                "description": description.current.value,
                "address": address.current.value,
                "zip_code": zip_code.current.value,
                "date": date.current.value,
                "time": time.current.value,
                "name": name.current.value

            })

        })
        .then(() => {
            props.getEvents()
            toggleDialog()
        })
    }
  }

//   Function on render that places buttons where they need to be depending on the user's relation to the event
  const renderHostBtn = () => {
      edit = document.getElementById("edit");
      del = document.getElementById("delete");
      join = document.getElementById("join-btn")
    if (+props.event.game.owner.id !== +localStorage.getItem("id")) {

      edit.style.visibility = "hidden";
      del.style.visibility = "hidden";
        }
    if(join !== null) {
        join.addEventListener('click', requestJoinEvent)

    }
    if (props.event.is_full === true & join !== null) {

        join.style.visibility = 'hidden'
    }



    }

  useEffect(() => {
    console.log(props.event)
    renderHostBtn()
    dialog = document.querySelector("#dialog--time")
    const handler = e => {
        // Close all dialogs when ESC is pressed, and close search field
        if (e.keyCode === 27) {
            if (modalIsOpen) {
                toggleDialog()
            }
        }
    }

    window.addEventListener("keyup", handler)
    return () => window.removeEventListener("keyup", handler)
});
  return (
    <>

        <dialog id="dialog--time" className="dialog--time" >
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input ref={name} defaultValue={props.event.name} name="name" autoFocus required type="text" />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea ref={description} defaultValue = {props.event.description} name="description" required></textarea>
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input ref={address} name="address" defaultValue={props.event.address} required type="text" />
          </div>
          <div>
            <label htmlFor="zip_code">Zip Code:</label>
            <input name="zip_code" ref={zip_code} defaultValue={props.event.zip_code}required type="text" />
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <input name="time" ref={time} defaultValue={props.event.real_time}  required type="time" />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              ref={date}
              name="date"
              min={new Date().toISOString().slice(0, 10)}
              defaultValue= {props.event.real_date.slice(0,10)}
              required
            ></input>
          </div>

          <button onClick={editEvent}>Update Event</button>
        </form>
            </dialog>


      <div className="container">
        <header>
          <h2 align="center">{props.event.name}</h2>
        </header>
        <div className="body">
          <nav className="outer-col-1">
            <h6 align="center">Event Details</h6>
            <div className="d-flex flex-column">
              <div>
              {props.event.user_player ?
               ( <p>
                  <b>Address: </b>
                  {props.event.address}
                </p>)
                :
                (<p>

                  <h3>
                          <span className="badge badge-danger">RESTRICTED ADDRESS</span>

                        </h3>
                </p>)

              }
                <p>
                  <b>Date: </b>
                  {props.event.date}
                </p>
                <p>
                  <b>Time: </b>
                  {props.event.time}
                </p>
              </div>
              <div>
                <p>
                  <b>Host: </b>
                  {props.event.game.owner.user.username}
                </p>
                <p>
                  <b>Location: </b>
                  {props.event.zip_code}
                </p>
              </div>
              <div>
                <p>
                  <b>Player Count:</b> {props.event.player_list.length}
                </p>
                {props.event.need_players > 0 ? (
                    <div>
                  <p>
                    <b>Players Needed:</b> {props.event.need_players}
                  </p>

                    </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                <div>
                <b>Player List </b>
                <ol>
                  {props.event.player_list.map(player => {
                    return <li key={player.id}>{player.user.username}</li>;
                  })}
                </ol>
                </div>
                  { !props.event.user_player & !props.event.pending_request ? (
                  <div>
                <button width='auto' id='join-btn'>Join Event</button>
                </div>) : ""
                  }
                </div>
              <hr></hr>
              </div>
              <div >

              </div>
            </div>
          </nav>
          <div className="outer-col-2">
            <div className="inner-row">
              <div className="inner-col">
                <article>
                  <div>
                    <div className="d-flex justify-content-between">
                      {props.event.user_player == true ? (
                        <h5>
                          <span className="badge badge-primary">+ Player</span>

                        </h5>
                      ) : "" }
                      {props.event.pending_request ? (
                        <h5>
                          <span className="badge badge-warning">+ Pending</span>

                        </h5>

                      ) : ""}
                      {props.event.is_full ? (
                        <h5>
                          <span className="badge badge-success">Full Game</span>
                        </h5>
                      ) : (
                        ""
                      )}
                    </div>

                    <h5 align="center">{props.event.game.name}</h5>
                    <img
                      className="game-image"
                      src={props.event.game.image}
                      alt="Game"
                    ></img>
                    <p>
                      <b>Event Description:</b> {props.event.description}
                    </p>
                  </div>
                </article>
              </div>
              <aside>
                <h6 align="center">Game Info</h6>
                <div className="d-flex flex-column">
                  <div>
                    <p>
                      <b>Date:</b> {props.event.date}
                    </p>
                    <p>
                      <b>Time:</b> {props.event.time}
                    </p>
                  </div>
                  <div>
                    <b>
                      {props.event.game.owner.user.username}'s game description:
                    </b>
                    <p>{props.event.game.owner_descrip}</p>
                  </div>
                  <div>
                    <b>Categories: </b>
                    <ol>
                      {props.event.game.categories.map((category, i) => {
                        return <li key={i}>{category}</li>;
                      })}
                    </ol>
                  </div>
                  <div>
                    <p>
                      <b>Minimum Players:</b> {props.event.game.min_players}
                    </p>
                    <p>
                      <b>Maximum Players:</b> {props.event.game.max_players}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
            <footer>

              <button
                id="edit"
                onClick={() => {
                  toggleDialog();
                }}
              >
                Edit Event
              </button>
              <button
                id="delete"
                onClick={() => {
                  deleteEvent();
                }}
              >
                Delete Event
              </button>
            </footer>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default EventDetail;
