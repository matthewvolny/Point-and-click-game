import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from "./components/Inventory";
import Actions from "./components/Actions";
import Room1 from "./components/rooms/Room1";
import Room2 from "./components/rooms/Room2";
import Room3 from "./components/rooms/Room3";
import Map from "./components/Map";
import ImageMapper from "react-img-mapper";

import "./App.css";

//roomMap should be in another file
const roomMap = [
  {
    currentRoom: 1,
    mapCoordinates: [
      { roomNum: 2, route: "/room2", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 2,
    mapCoordinates: [
      { roomNum: 3, route: "/room3", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 1, route: "/", position: "bottom" },
    ],
  },
];

//room item info (should also be in another file), added to state when entering a new room
const roomEvaluateInfo = [
  {
    room: 1,
    entryScript: "So this is Richard's Valley.  Let me find Richard",
    reentryScript: "Something tells me I have been here before",
    images: [
      { file: "room1a.jpg", itemsCollected: [] },
      { file: "room1b.jpg", itemsCollected: ["Rug"] },
      { file: "room1c.jpg", itemsCollected: ["Lamp"] },
      { file: "room1d.jpg", itemsCollected: ["Lamp", "Rug"] },
    ],
    items: [
      {
        name: "Rug",
        present: true,
        Look: { text: "it is an old rug on the floor", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "you have taken the rug",
          effect: "add rug to inventory",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Lamp",
        present: true,
        Look: { text: "it is a solid metal lamp", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "you turn the lamp on", effect: "turn on lamp function" },
        Take: {
          text: "you have taken the lamp",
          effect: "take lamp function",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 2,
    entryScript: "Room2",
    reentryScript: "Room2-re-entry",
    items: [
      {
        name: "Rug",
        present: true,
        Look: { text: "it is an old rug on the floor", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "you have taken the rug",
          effect: "add rug to inventory",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Lamp",
        present: true,
        Look: { text: "it is a solid metal lamp", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "you turn the lamp on", effect: "turn on lamp function" },
        Take: {
          text: "you have taken the lamp",
          effect: "take lamp function",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
];

function App() {
  const [action, setAction] = useState({ playerAction: "", item: "" });
  const [roomMapDetails, setRoomMapDetails] = useState({
    currentRoom: roomMap[0].currentRoom,
    currentRoomInfo: roomMap[0].mapCoordinates,
  });

  const [roomEvaluateDetails, setRoomEvaluateDetails] = useState(
    roomEvaluateInfo[0]
  );
  const [selectedItemInfo, setSelectedItemInfo] = useState();
  const [selectedItemInfoForAction, setSelectedItemInfoForAction] = useState({
    text: "",
    effect: "",
  });

  //!not used yet, needed?
  const [playerInventory, setPlayerInventory] = useState();

  //updates state with selected player action
  const updatePlayerAction = (action) => {
    setAction({ playerAction: action, item: "" });
  };

  //updates state with selected item
  const updateItem = (item) => {
    setAction({ ...action, item: item });
  };

  //adds the selected item details (general item info, and specifics info) to state
  const updateSelectedItemInfo = () => {
    const { playerAction, item } = action;
    const { items } = roomEvaluateDetails;
    console.log(playerAction);
    console.log(item);
    console.log(roomEvaluateDetails);
    console.log(items); //not here after room change
    //!something here is throwing error on selecting action after room change
    const selectedItemDetails = items.find((detailedItem) => {
      return detailedItem.name === item;
    });
    setSelectedItemInfo(selectedItemDetails);
    setSelectedItemInfoForAction(selectedItemDetails[playerAction]);
  };

  //if user has selected an action and an item, call function to put detailed info about the item in state
  useEffect(() => {
    if (action.playerAction !== "" && action.item !== "") {
      updateSelectedItemInfo();
    }
  });

  // on map link click, updates the map for the current room
  const updateRoomMapDetails = (newRoom) => {
    const selectedRoom = roomMap.find((room) => {
      return room.currentRoom === newRoom;
    });
    setRoomMapDetails({
      currentRoom: selectedRoom.currentRoom,
      currentRoomInfo: selectedRoom.mapCoordinates,
    });
  };

  //add evaluate details object for the current room to state
  const updateRoomEvaluateDetails = (newRoom) => {
    let roomInfo = roomEvaluateInfo.find((currentRoom) => {
      return currentRoom.room === newRoom;
    });
    console.log("here is the room info!");
    console.log(roomInfo);
    setRoomEvaluateDetails(roomInfo);
  };

  //called from the map component, updates the room on link click, adds info to state
  const updateCurrentRoom = (newRoom) => {
    setAction({ playerAction: "", item: "" });
    setSelectedItemInfo();
    setSelectedItemInfoForAction({
      text: "",
      effect: "",
    });
    updateRoomEvaluateDetails(newRoom);
    updateRoomMapDetails(newRoom);
  };

  const updateInventory = (inventory) => {
    console.log(inventory);
    setPlayerInventory(inventory);
  };

  return (
    <div className="container">
      <BrowserRouter>
        <div className="top-flex">
          <Routes>
            <Route
              path="/"
              element={
                <Room1
                  updateItem={updateItem}
                  roomEvaluateDetails={roomEvaluateDetails}
                  action={action}
                  selectedItemInfoForAction={selectedItemInfoForAction}
                />
              }
            />
            <Route
              path="/room2"
              element={
                <Room2
                  updateItem={updateItem}
                  roomEvaluateDetails={roomEvaluateDetails}
                />
              }
            />
            <Route
              path="/room3"
              element={
                <Room3
                  updateItem={updateItem}
                  roomEvaluateDetails={roomEvaluateDetails}
                />
              }
            />
          </Routes>
          <Inventory
            action={action}
            selectedItemInfo={selectedItemInfo}
            selectedItemInfoForAction={selectedItemInfoForAction}
            updateInventory={updateInventory}
          />
        </div>
        <div className="bottom-flex">
          <Map
            roomMapDetails={roomMapDetails}
            updateCurrentRoom={updateCurrentRoom}
          />
          <Actions updatePlayerAction={updatePlayerAction} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
