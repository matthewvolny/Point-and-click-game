import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import room1 from "../../images/room1.jpg";
import "./room1.css";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room1: room1,
};

export default function Room1(props) {
  const { entryScript, reentryScript, images, room } =
    props.roomEvaluateDetails;
  const [script, setScript] = useState(entryScript);

  //search for match of items array for the room, then set the "currentImage" with room string
  const [currentImage, setCurrentImage] = useState(imagesArrayObject["room1"]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/room${room + 1}`);
      props.updateCurrentRoom(`${room + 1}`);
    }, 3000);
  });

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img
          className="background"
          src={currentImage}
          alt="entryway"
          useMap="#image-map"
        />
      </div>
      <div className="text-box">{script}</div>
      <script src="https://unpkg.com/image-map/dist/image-map.js"></script>
      {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>  */}
    </div>
  );
}
