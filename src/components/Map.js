import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./map.css";

const roomMap = [
  {
    roomNum: 1,
    mapCoordinates: [
      { route: 1, position: "top" }, //top
      { route: "", position: "" }, //right
      { route: "", position: "" }, //bottom
      { route: "", position: "" }, //left
    ],
  },
  {
    roomNum: 2,
    mapCoordinates: [
      { route: 2, position: "top" }, //top
      { route: "", position: "" }, //right
      { route: "", position: "" }, //bottom
      { route: 0, position: "bottom" }, //left
    ],
  },
];

export default function Map(props) {
  const [currentRoom, setCurrentRoom] = useState({
    currentRoom: 1,
    currentRoomInfo: [
      { route: "/room2", position: "top" },
      { route: "", position: "" },
      { route: "", position: "" },
      { route: "", position: "" },
    ],
  });

  //generates map points
  const PopulateMap = () => {
    const mapCoordinates = currentRoom.currentRoomInfo.map((coordinate) => {
      return coordinate.position !== "" ? (
        <div
          key={Math.floor(Math.random() * 10000)}
          className={coordinate.position}
        >
          <NavLink to={coordinate.route}>X</NavLink>
        </div>
      ) : (
        console.log("no map")
      );
    });
    return <>{mapCoordinates}</>;
  };

  return (
    <div className="map-container">
      <div className="map">{<PopulateMap />}</div>
    </div>
  );
}
