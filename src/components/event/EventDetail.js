import React, { useState, useEffect, useRef } from "react";
// import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
// import { Link } from 'react-router-dom'
import "./EventDetail.css";

const EventDetail = props => {
    const name = useRef();
  const description = useRef();
  const date = useRef();
  const time = useRef();
  const address = useRef();
  const zip_code = useRef();
  let ed = null;
  let de = null;
  let dialog = null
  const [modalIsOpen, setIsOpen] = useState(false)


  // Functions for edit modal


  const toggleDialog = () => {
    setIsOpen(!modalIsOpen)

    if (modalIsOpen) {
        dialog.removeAttribute("open")
    } else {
        dialog.setAttribute("open", true)
    }
}

useEffect(() => {
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
})


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

  const editEvent = (event) => {
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
            props.history.push("/")
        })
    }
  }
  const renderHostBtn = () => {
    if (+props.event.game.owner.id !== +localStorage.getItem("id")) {
      ed = document.getElementById("edit");
      de = document.getElementById("delete");
      ed.style.visibility = "hidden";
      de.style.visibility = "hidden";

    }

  };

  useEffect(() => {
    renderHostBtn()
    dialog = document.querySelector("#dialog--time")
    console.log(props)

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
            <input ref={address} name="addres" defaultValue={props.event.address} required type="text" />
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
                <p>
                  <b>Date: </b>
                  {props.event.date}{" "}
                </p>
                <p>
                  <b>Time: </b>
                  {props.event.time}{" "}
                </p>
              </div>
              <div>
                <p>
                  <b>Host: </b>
                  {props.event.game.owner.user.username}{" "}
                </p>
                <p>
                  <b>Location: </b>
                  {props.event.zip_code}{" "}
                </p>
              </div>
              <div>
                <p>
                  <b>Player Count:</b> {props.event.player_list.length}
                </p>
                {props.event.need_players > 0 ? (
                  <p>
                    <b>Players Needed:</b> {props.event.need_players}{" "}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <hr></hr>
                <b>Player List </b>
                <ol>
                  {props.event.player_list.map(player => {
                    return <li key={player.id}>{player.user.username}</li>;
                  })}
                </ol>
              <hr></hr>
              </div>


              <div></div>
            </div>
          </nav>
          <div className="outer-col-2">
            <div className="inner-row">
              <div className="inner-col">
                <article>
                  <div>
                    <div className="d-flex justify-content-between">
                      {props.event.user_player ? (
                        <h5>
                          <span className="badge badge-primary">+ Player</span>
                        </h5>
                      ) : (
                        ""
                      )}
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
