import React, { useEffect, useState, useRef } from "react";
import "./actions.css";

export default function Actions(props) {
  const [actionClicked, setActionClicked] = useState();

  const look = document.querySelector(".look");
  const use = document.querySelector(".use");
  const take = document.querySelector(".take");
  const hit = document.querySelector(".hit");
  const speak = document.querySelector(".speak");

  const actionDOMObject = {
    look: look,
    use: use,
    take: take,
    hit: hit,
    speak: speak,
  };

  //handles player actions, highlights and un-highlights action buttons
  const handleClick = (e) => {
    props.updatePlayerAction(e.target.textContent);
    if (!actionClicked) {
      e.target.setAttribute("id", "clicked");
      setActionClicked(e.target.className);
    } else {
      console.log(actionDOMObject[actionClicked]);
      actionDOMObject[actionClicked].removeAttribute("id");
      e.target.setAttribute("id", "clicked");
      setActionClicked(e.target.className);
    }
  };

  //unclicks player action buttons when changing rooms
  useEffect(() => {
    if (actionClicked) {
      actionDOMObject[actionClicked].removeAttribute("id");
    }
  }, [props.roomEvaluateDetails]);

  return (
    <div className="player-actions">
      <div className="look" value="look" onClick={handleClick}>
        Look
      </div>
      <div className="use" value="use" onClick={handleClick}>
        Use
      </div>
      <div className="take" value="take" onClick={handleClick}>
        Take
      </div>
      <div className="hit" value="hit" onClick={handleClick}>
        Hit
      </div>
      <div className="speak" value="hit" onClick={handleClick}>
        Speak
      </div>
    </div>
  );
}
