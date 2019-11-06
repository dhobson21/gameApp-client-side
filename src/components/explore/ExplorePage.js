import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,  Container, Col, Form,
    FormGroup, Label, Input,
    Button, Row } from 'reactstrap';
import React, { useState, useEffect } from 'react';




const ExplorePage = props => {
    const [otherEvents, setOtherEvents] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);






    const getOtherEvents = () => {

              fetch(`http://localhost:8000/events?user_player=False`, {
                  "method": "GET",
                  "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("gameApp_token")}`

                  }
              })
              .then(response => response.json())
              .then(setOtherEvents)





      }




    useEffect(getOtherEvents, [])

    return (
        <React.Fragment>
<Container>
    <h4 textAlign='center'>Search for upcoming Events</h4>
</Container>
        <Form>
        <Row form>
          <Col md={2}>
            <FormGroup>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Filter
          </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Zip Code</DropdownItem>
          <DropdownItem>Game</DropdownItem>
          <DropdownItem>User</DropdownItem>
          <DropdownItem>Categories</DropdownItem>
        </DropdownMenu>
      </Dropdown>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>

              <Input
                type="text"
                name="searh"
                id="searchInput"
                placeholder="Pick a paramater and enter a search term to find events"
              />
            </FormGroup>
          </Col>
          <Col md={2}>

          <Button >Search</Button>
          </Col>
        </Row>
      </Form>

        </React.Fragment>



    );
  }

  export default ExplorePage;