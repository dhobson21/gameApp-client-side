import React, {useRef, useState, useEffect, useCallback} from "react"
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';




const GamePopOver = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [cardDeets, setCardDeets] = useState([]);

  const toggle = () => setPopoverOpen(!popoverOpen);
  // const { isAuthenticated } = useSimpleAuth()

  return (
    <>
      <div>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target={`Popover1-${props.game.id}`}
          toggle={toggle}
        >
          <PopoverHeader>{props.game.name}</PopoverHeader>
          <PopoverBody>
            <p>
              Min Players: <b>{props.game.min_players}</b>
            </p>
            <p>
              Max Players: <b>{props.game.max_players}</b>
            </p>

            <p>
              Description: <b>{props.game.host_descrip}</b>
            </p>
          </PopoverBody>

        </Popover>
      </div>
    </>
  );
};

export default GamePopOver;
