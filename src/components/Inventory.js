import React, { useEffect, useState } from "react";
import "./inventory.css";

export default function Inventory(props) {
  const [inventory, setInventory] = useState();

  useEffect(() => {
    const playerInventoryArray = props.playerInventory;
    let unusedItemsArray = [];
    for (let i = 0; i < playerInventoryArray.length; i++) {
      if (playerInventoryArray[i].used !== true) {
        unusedItemsArray.push(playerInventoryArray[i]);
      }
    }
    setInventory(unusedItemsArray);
  }, [props.playerInventory]);

  const inventoryList = inventory?.map((item) => {
    if (item.used !== true) {
      return (
        <div key={Math.floor(Math.random() * 10000)}>
          <div
            className="inventory-item"
            onClick={() => props.inventoryItemClicked(item.item)}
          >
            {item.item}
          </div>
          {/* <span>{item.number}</span> */}
        </div>
      );
    }
  });

  return (
    <div className="inventory-flex">
      <div className="inventory-heading">Inventory</div>
      <div className="inventory-list">{inventoryList}</div>
      <a className="quit-game-button" href="/">
        Quit game
      </a>
    </div>
  );
}
