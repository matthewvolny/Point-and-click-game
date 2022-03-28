import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import room3 from "../../images/room3.jpg";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room3: room3,
};

export default function Room3(props) {
  const { entryScript, images, room } = props.roomEvaluateDetails;

  const isMounted = useRef(false);
  const [script, setScript] = useState();

  //search for match of items array for the room, then set the "currentImage" with room string
  const [currentImage, setCurrentImage] = useState(imagesArrayObject["room3"]);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/room${room + 1}`);
      props.updateCurrentRoom(`${room + 1}`);
    }, 4000);
  });

  useEffect(() => {
    if (isMounted.current) {
      setScript(entryScript);
    } else {
      isMounted.current = true;
    }
  }, [entryScript]);

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
