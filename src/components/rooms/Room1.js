import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import room1 from "../../images/room1.jpg";
import room2 from "../../images/room2.jpg";
import room3 from "../../images/room3.jpg";
import room4 from "../../images/room4.jpg";
import room5 from "../../images/room5.jpg";
import room6 from "../../images/room6.jpg";
import room7 from "../../images/room7.jpg";

import "./room1.css";

export default function Room1(props) {
  const { entryScript, room } = props.roomEvaluateDetails;
  const [script, setScript] = useState(entryScript);
  const [imageDisplayed, setImageDisplayed] = useState(room1);
  const [finishedInterval, setFinishedInterval] = useState(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();

  let images = [];
  images[0] = room2;
  images[1] = room3;
  images[2] = room4;
  images[3] = room5;
  images[4] = room6;
  images[5] = room7;

  let currentImage = document.querySelector(".background-img");
  let i = 0;

  const changeImages = () => {
    setImageDisplayed(images[i]);
    console.log(room); //always 1
    // props.updateCurrentRoom(room + 1);
    i++;
    if (i > images.length - 1) {
      setFinishedInterval(true);
    }
  };

  useEffect(() => {
    props.updateCurrentRoom(room + 1);
    //navigate to the next room
  }, [imageDisplayed]);

  useEffect(() => {
    if (isMounted.current) {
      setScript(entryScript);
      if (room === 7) {
        navigate(`/room${room + 1}`);
      }
    } else {
      isMounted.current = true;
    }
  }, [imageDisplayed]);

  useEffect(() => {
    let intervalForImages;
    if (!finishedInterval) {
      intervalForImages = setInterval(() => {
        changeImages();
      }, 3000);
    }
    return () => clearInterval(intervalForImages);
  }, [finishedInterval]);

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img className="background-img" src={imageDisplayed} alt="background" />
      </div>
      <div className="text-box">{script}</div>
    </div>
  );
}
