import React, { useEffect, useState, useRef } from "react";

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
    <div>
      <div>Inventory</div>
      <div>{inventoryList}</div>
      <div>
        <p>{props.isPlaying ? "Playing" : "Paused"}</p>
        <button onClick={() => props.toggleSong()}>Play | Pause</button>
      </div>
      <div>
        <a href="http://localhost:3000/">Quit game</a>
      </div>
    </div>
  );
}
