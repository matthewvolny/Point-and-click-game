import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from "./components/Inventory";
import Actions from "./components/Actions";
import Room1 from "./components/rooms/Room1";
import Room2 from "./components/rooms/Room2";
import Room3 from "./components/rooms/Room3";
import Map from "./components/Map";
import ImageMapper from "react-img-mapper";

import "./App.css";

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

function App() {
  const [room, setRoom] = useState("room1");
  const [action, setAction] = useState({ playerAction: "", item: "" });
  const [roomDetails, setRoomDetails] = useState({
    currentRoom: roomMap[0].currentRoom,
    currentRoomInfo: roomMap[0].mapCoordinates,
  });

  const updatePlayerAction = (playerAction) => {
    setAction({ action: playerAction, item: "" });
  };

  const updateItem = (item) => {
    setAction({ ...action, item: item });
  };

  // currently here (need to change room)
  const updateCurrentRoom = (newRoom) => {
    const selectedRoom = roomMap.find((room) => {
      return room.currentRoom === newRoom;
    });
    setRoomDetails({
      currentRoom: selectedRoom.currentRoom,
      currentRoomInfo: selectedRoom.mapCoordinates,
    });
  };

  return (
    <div className="container">
      <BrowserRouter>
        <div className="top-flex">
          <Routes>
            <Route path="/" element={<Room1 updateItem={updateItem} />} />
            <Route path="/room2" element={<Room2 updateItem={updateItem} />} />
            <Route path="/room3" element={<Room3 updateItem={updateItem} />} />
          </Routes>
          <Inventory action={action} room={room} />
        </div>
        <div className="bottom-flex">
          <Map
            roomDetails={roomDetails}
            updateCurrentRoom={updateCurrentRoom}
          />
          <Actions updatePlayerAction={updatePlayerAction} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
