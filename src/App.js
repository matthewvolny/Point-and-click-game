import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventory from "./components/Inventory";
import Actions from "./components/Actions";
import Room1 from "./components/rooms/Room1";
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
      <div className="top-flex">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Room1 updateItem={updateItem} />} />
          </Routes>
        </BrowserRouter>
        <Inventory action={action} room={room} />
      </div>
      <div className="bottom-flex">
        <Map />
        <Actions updatePlayerAction={updatePlayerAction} />
      </div>
    </div>
  );
}

export default App;
