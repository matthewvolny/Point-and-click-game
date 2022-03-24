import React, { useEffect, useState } from "react";

export default function Inventory(props) {
  const [inventory, setInventory] = useState([]);
  // console.log(props.room);

  const { playerAction, item } = props.action;
  //!need text to read in room component
  const { text, canTake } = props.selectedItemInfoForAction;

  useEffect(() => {
    if (playerAction === "Take" && canTake) {
      let inventoryArray = [...inventory];
      inventoryArray.push({ item: item, number: 1 });
      // console.log("inventory array below");
      // console.log(inventoryArray);
      setInventory(inventoryArray);
    }
  }, [item, canTake]);

  const inventoryList = inventory?.map((item) => {
    return (
      <div key={Math.floor(Math.random() * 10000)}>
        <span>{item.item}</span>
        <span> - </span>
        <span>{item.number}</span>
      </div>
    );
  });

  return (
    <div>
      <div>Inventory</div>
      <div>{inventoryList}</div>
    </div>
  );
}
