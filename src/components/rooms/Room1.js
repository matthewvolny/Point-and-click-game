import React, { useEffect, useState, useRef, useContext } from "react";
import Context from "../../context/context";
import { useNavigate } from "react-router-dom";
import room1 from "../../images/room1-500.jpg";
import room2 from "../../images/room2-500.jpg";
import room3 from "../../images/room3-500.jpg";
import room4 from "../../images/room4-500.jpg";
import room5 from "../../images/room5-500.jpg";
import room6 from "../../images/room6-500.jpg";
import playButton from "../../images/play_.png";
import pauseButton from "../../images/pause_.png";
import "./room.css";

export default function Room1(props) {
  const { isPlaying } = useContext(Context);
  const { entryScript, room } = props.roomEvaluateDetails;
  const [script, setScript] = useState(entryScript); //room1 script
  const [imageDisplayed, setImageDisplayed] = useState(room1); //start at room1
  const [finishedInterval, setFinishedInterval] = useState(false);
  const isMounted = useRef(false);

  const navigate = useNavigate();

  let images = [];
  images[0] = room2;
  images[1] = room3;
  images[2] = room4;
  images[3] = room5;
  images[4] = room6;

  let i = 0;

  const changeImages = () => {
    setImageDisplayed(images[i]);
    i++;
    if (i > images.length - 1) {
      setFinishedInterval(true);
    }
  };

  //room updated (alway 1 ahead in app.js)
  useEffect(() => {
    props.updateCurrentRoom(room + 1);
  }, [imageDisplayed]);

  useEffect(() => {
    if (isMounted.current) {
      setScript(entryScript);
      if (room === 6) {
        props.updateCurrentRoom(room);
        navigate(`/room${room}`);
      }
    } else {
      isMounted.current = true;
    }
  }, [imageDisplayed]);

  //(2) change images every 3 seconds if not finished interval
  useEffect(() => {
    let intervalForImages;
    if (!finishedInterval) {
      intervalForImages = setInterval(() => {
        changeImages();
      }, 6000);
    }
    return () => clearInterval(intervalForImages);
  }, [finishedInterval]);

  return (
    <div className="top-left-flex-container">
      <div className="player">
        {isPlaying ? (
          <img
            onClick={() => props.toggleSong()}
            alt="pause button"
            src={pauseButton}
          ></img>
        ) : (
          <img
            onClick={() => props.toggleSong()}
            alt="play button"
            src={playButton}
          ></img>
        )}
      </div>
      <div className="image-container">
        <img className="background-img" src={imageDisplayed} alt="background" />
      </div>
      <div className="text-box">{script}</div>
    </div>
  );
}
