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
    objects: [
      {
        name: "Rug",
        lookText: "it is an old rug on the floor",
        openText: "",
        useText: "",
        takeText: "you have taken the rug",
        hitText: "",
        speakText: "",
        lookEffect: "",
        openEffect: "",
        useEffect: "",
        takeEffect: "",
        hitEffect: "",
        speakEffect: "",
      },
      {
        name: "Lamp",
        lookText: "it is a solid metal lamp",
        openText: "",
        useText: "you turn the lamp on",
        takeText: "you have taken the lamp",
        hitText: "",
        speakText: "",
        lookEffect: "",
        openEffect: "",
        useEffect: "",
        takeEffect: "",
        hitEffect: "",
        speakEffect: "",
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
  const [playerInventory, setPlayerInventory] = useState();

  const updatePlayerAction = (playerAction) => {
    setAction({ action: playerAction, item: "" });
  };

  const updateItem = (item) => {
    setAction({ ...action, item: item });
  };

  //functions called based on the 'action' taken and the 'item' selected
  const evaluateFunction = () => {
    const { playerAction, item } = action;
    // if (playerAction === "Look" && roomObjectDetails.openText != "") {
    //   console.log(itemProperties.lookText);
    //   console.log(itemProperties.lookUrl);
    // } else if (playerAction === "Open" && itemProperties.openText != "") {
    //   console.log(itemProperties.openText);
    //   console.log(itemProperties.openUrl);
    // } else if (playerAction === "Use" && itemProperties.useText != "") {
    //   console.log(itemProperties.useText);
    //   console.log(itemProperties.useUrl);
    // } else if (playerAction === "Take" && itemProperties.takeText != "") {
    //   console.log(itemProperties.takeText);
    //   if (
    //     itemProperties.takeText[0] === `The ${itemProperties.name} is in hand`
    //   ) {
    //     playerInventoryArray.push(itemProperties.name);
    //     console.log(itemProperties.takeUrl);
    //   }
    // } else if (playerAction === "Hit" && itemProperties.hitText != "") {
    //   console.log(itemProperties.hitText);
    //   console.log(itemProperties.hitUrl);
    // } else if (playerAction === "Speak" && itemProperties.speakText != "") {
    //   console.log(itemProperties.speakText);
    //   console.log(itemProperties.speakUrl);
    // } else {
    // }
  };

  useEffect(() => {
    if (action.playerAction !== "" && action.item !== "") {
      console.log("action array made");
      evaluateFunction();
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
    setRoomEvaluateDetails({ roomInfo });
  };

  //called from the map component, updates the room on link click, adds info to state
  const updateCurrentRoom = (newRoom) => {
    updateRoomMapDetails(newRoom);
    updateRoomEvaluateDetails(newRoom);
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
          <Inventory action={action} />
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
