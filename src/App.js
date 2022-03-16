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

function App() {
  const [room, setRoom] = useState("room1");
  const [roomDetails, setRoomDetails] = useState("");
  const [action, setAction] = useState({ playerAction: "", item: "" });

  const updatePlayerAction = (playerAction) => {
    setAction({ action: playerAction, item: "" });
  };

  const updateItem = (item) => {
    setAction({ action: action.playerAction, item: item });
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
          <Map />
          <Actions updatePlayerAction={updatePlayerAction} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
