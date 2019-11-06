import React, { useState, useEffect, useRef } from "react";
import Event from "../event/Event";
import {Container} from "reactstrap"

const ExploreResults = props => {





// useEffect()
  return (
    <Container style={{ border: "4px red solid" }}>
            <React.Fragment>
            <h3 align="center"> Events Happening Soon in Nashville</h3>
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
