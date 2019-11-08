import React, { useState, useEffect, useRef } from "react";
import Event from "../event/Event";
import {Container} from "reactstrap"

const ExploreResults = props => {


  return (
    <Container >
            <React.Fragment>
            {props.otherEvents.Length > 0 ?
            <h2 align="center"> Events For You</h2>: ""}
            <div className="other-events">
                {props.otherEvents.map(event => {
                return <Event key={event.id} event={event} />;
                })}
            </div>
            </React.Fragment>
        </Container>
  );
};

export default ExploreResults;
