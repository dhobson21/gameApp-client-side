
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row
} from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import Event from "../event/Event";
import ExploreResults from "./ExploreResults"

const ExplorePage = props => {
  const [otherEvents, setOtherEvents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const query = useRef()
  const term = useRef()

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const getOtherEvents = () => {
      console.log("only 1 time")
    fetch(`http://localhost:8000/events?user_player=False`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gameApp_token")}`
      }
    })
      .then(response => response.json())
      .then(setOtherEvents);
  };







          const querySearchEvents = (event)  => {
              console.log("called")
              event.preventDefault()
            fetch(`http://localhost:8000/events?user_player=False&${query.current.value}=${term.current.value}`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("gameApp_token")}`
                }
              })
                .then(response => response.json())
                .then(setOtherEvents);

          }




  useEffect(getOtherEvents, []);

  return (
    <React.Fragment>
      <Container>
        <h4>Search for upcoming Events</h4>
      </Container>
      <Form>
        <Row form>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleSelect">Select</Label>
              <select  ref={query}>
                <option value="zip_code">Zip Code</option>
                <option value= "game">Game</option>
                <option value= "category">Category</option>
                <option value= "user">User</option>
              </select>

            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <input

                type="text"
                name="search"
                id="searchInput"
                ref={term}
                onChange = {() => {
                    console.log(term.current.value)
                }}
                placeholder="Pick a paramater and enter a search term to find events"
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <button onClick= {(event) => {querySearchEvents(event)}}
 >Search</button>
          </Col>
        </Row>
      </Form>
    <Container>
        <ExploreResults otherEvents={otherEvents} />
    </Container>

    </React.Fragment>
  );
};

export default ExplorePage;
