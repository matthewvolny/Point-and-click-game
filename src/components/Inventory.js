import React, { useEffect, useState, useRef } from "react";

export default function Inventory(props) {
  // const isMounted = useRef(false);
  // console.log(props);
  const [inventory, setInventory] = useState([]);
  // console.log(props.room);

  // const { playerAction, item } = props.action;

  //!need text to read in room component
  // const { text, canTake } = props.selectedItemInfoForAction;

  // useEffect(() => {
  //   if (playerAction === "Take" && canTake) {
  //     let inventoryArray = [...inventory];
  //     inventoryArray.push({ item: item });
  //     // console.log("inventory array below");
  //     // console.log(inventoryArray);
  //     setInventory(inventoryArray);
  //   }
  // }, [item, canTake]);

  //loads inventory into the database
  // useEffect(() => {
  //   if (isMounted.current) {
  //     props.updateInventory(inventory);
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [inventory]);

  useEffect(() => {
    console.log("inventory");
    console.log(props.playerInventory);
    setInventory(props.playerInventory);
  }, [props.playerInventory]);

  // useEffect(() => {
  //   playerInventory?.forEach((item) => {});
  // }, [props.playerInventory]);

  const inventoryList = inventory?.map((item) => {
    return (
      <div key={Math.floor(Math.random() * 10000)}>
        {/* add onclICK FOR THE USING ITEMS IN INVENTORY */}
        <span onClick={() => props.inventoryItemClicked(item.item)}>
          {item.item}
        </span>
        <span> - </span>
        <span>{item.number}</span>
      </div>
    );
  });

  return (
    <div>
      <div>Inventory</div>
      <div>{inventoryList}</div>
      <div>
        {/* Show state of song on website */}
        <p>{props.isPlaying ? "Playing" : "Paused"}</p>

        {/* Button to call our main function */}
        <button onClick={() => props.toggleSong()}>Play | Pause</button>
      </div>
      <div>
        <a href="http://localhost:3000/">Quit game</a>
      </div>
    </div>
  );
}
