import React, { useEffect, useState } from "react";
import "./actions.css";

export default function Actions(props) {
  const handleClick = (e) => {
    props.updatePlayerAction(e.target.textContent);
    console.log("click");
  };

  return (
    <div className="player-actions">
      <div value="look" onClick={handleClick}>
        Look
      </div>
      <div value="open" onClick={handleClick}>
        Open
      </div>
      <div value="use" onClick={handleClick}>
        Use
      </div>
      <div value="take" onClick={handleClick}>
        Take
      </div>
      <div value="hit" onClick={handleClick}>
        Hit
      </div>
      <div value="hit" onClick={handleClick}>
        Speak
      </div>
    </div>
  );
}
