import React, { useEffect, useState } from "react";
import "./inventory.css";

export default function Inventory(props) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory(props.playerInventory);
  }, [props.playerInventory]);

  const inventoryList = inventory?.map((item) => {
    return (
      <div key={Math.floor(Math.random() * 10000)} className="inventory-item">
        <div onClick={() => props.inventoryItemClicked(item.item)}>
          {item.item}
        </div>
        {/* <span>{item.number}</span> */}
      </div>
    );
  });

  return (
    <div className="inventory-flex">
      <div className="inventory-heading">Inventory</div>
      <div className="inventory-list">{inventoryList}</div>
      <a className="quit-game-button" href="http://localhost:3000/">
        Quit game
      </a>
    </div>
  );
}
