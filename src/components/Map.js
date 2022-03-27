import React from "react";
import { NavLink } from "react-router-dom";
import "./map.css";

export default function Map(props) {
  const { currentRoomInfo } = props.roomMapDetails;

  //generates map points
  const PopulateMap = () => {
    const mapCoordinates = currentRoomInfo.map((coordinate) => {
      return coordinate.position !== "" ? (
        <div
          key={Math.floor(Math.random() * 10000)}
          className={coordinate.position}
        >
          <NavLink
            to={coordinate.route}
            onClick={() => props.updateCurrentRoom(coordinate.roomNum)}
          >
            X
          </NavLink>
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
