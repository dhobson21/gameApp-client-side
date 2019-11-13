import React, { useEffect, useState } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link } from "react-router-dom";
import MessageModal from "./MessageModal";
import "./MessagePage.css";
import { Container } from "reactstrap";

const MessagePage = props => {
  const [messages, setMessages] = useState([]);
  const [requests, setRequests] = useState([]);
  const { isAuthenticated } = useSimpleAuth();
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const getNewMessages = () => {
    if (isAuthenticated()) {
      fetch(`http://localhost:8000/messages?new=true`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("gameApp_token")}`
        }
      })
        .then(response => response.json())
        .then(setMessages);
    }
  };

  const readMessage = id => {
    fetch(`http://localhost:8000/messages/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gameApp_token")}`
      },
      body: JSON.stringify({
        is_approved: "anything"
      })
    }).then(props.getMessages)
      .then(setMessages);

  };

  useEffect(() => {
    getNewMessages()


  }, [props.messages]);

  return (
    <React.Fragment>
      <MessageModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message={message}
        onExited={() => {
          readMessage(message.id)
          props.getEvents();

        }}
        messages={props.messages}
      />

      <h2 align="center"> Board-Up Inbox</h2>

      <h3 align="center">My Messages</h3>
      <div className="container" stlye={{ border: "1px black solid" }}>
        <div className="row" align="center">
          <div className="col-lg">From</div>
          <div className="col-lg">Event</div>
          <div className="col-lg">Message Type</div>
        </div>


        {messages ? messages.map((m, i) => {
          return (
            <span
              onClick={() => {
                setMessage(m);
                setModalShow(true);
              }}
              key={m.id}
            >
              <div align="center">
                <div className="row">

                  <div className="col-lg">{m.sender.user.username}</div>
                  <div className="col-lg">{m.event.name}</div>
                  <div className="col-lg">{m.type}</div>
                </div>
              </div>
            </span>
          );
        }): ""}
      </div>

      <hr />
    </React.Fragment>
  );
};

export default MessagePage;
