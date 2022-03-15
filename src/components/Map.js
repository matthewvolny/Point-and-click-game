import React, { useState } from "react";
import "./map.css";

const roomMap = [
  {
    roomNum: 1,
    mapCoordinates: [
      { index: 1, position: "top" }, //top
      { index: "", position: "" }, //right
      { index: "", position: "" }, //bottom
      { index: "", position: "" }, //left
    ],
  },
];

export default function Map(props) {
  const [currentRoom, setCurrentRoom] = useState({
    currentRoom: roomMap[0].roomNum,
    currentRoomInfo: roomMap[0].mapCoordinates,
  });

  return (
    <div className="map-container">
      <div className="map"></div>
    </div>
  );
}
