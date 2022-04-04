import React, { useEffect, useState, useRef } from "react";
import "./inventory.css";

export default function Inventory(props) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory(props.playerInventory);
  }, [props.playerInventory]);

  const inventoryList = inventory?.map((item) => {
    return (
      <div key={Math.floor(Math.random() * 10000)}>
        <span onClick={() => props.inventoryItemClicked(item.item)}>
          {item.item}
        </span>
        <span>{item.number}</span>
      </div>
    );
  });

  return (
    <div className="inventory-flex">
      <div className="inventory-heading">Inventory</div>
      <div>{inventoryList}</div>
      <div>
        <p>{props.isPlaying ? "Playing" : "Paused"}</p>
        <button onClick={() => props.toggleSong()}>Play | Pause</button>
      </div>
      <a className="quit-game-button" href="http://localhost:3000/">
        Quit game
      </a>
    </div>
  );
}
