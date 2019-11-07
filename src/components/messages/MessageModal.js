import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Alert } from 'react-bootstrap'


const MessageModal = (props) => {
  const [message, setMessage] = useState([props.message])


  const updatePlayerEvent = (value) => {


  fetch(`http://localhost:8000/playerevents/${props.message.player_event.id}`, {
    "method": "PUT",
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("gameApp_token")}`
    },
    "body": JSON.stringify({
        "is_approved": value

    })

})


props.onHide()




  }

    return (
      <>
      {props.message !== "" ?

      (
  <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Message from {props.message.sender.user.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Subject: {props.message.event.name}</h4>
          <p>
            {props.message.message}
          </p>
          {props.message.type==="request" ?  <div>
          <Button
          onClick = {(event) => updatePlayerEvent(event.target.value)}
          value= 'true' className="float-left" >Approve</Button>
          <Button
          onClick = {(event) => updatePlayerEvent(event.target.value)}
          value = 'false'>Reject</Button></div> : ""
          }
        </Modal.Body>
        <Modal.Footer>
          {props.message.type!== "request" ? <>
          <Button onClick={props.onHide}>Close</Button> </> : ""}
        </Modal.Footer>
      </Modal>) : ""}
      </>


    );
  }

export default MessageModal

