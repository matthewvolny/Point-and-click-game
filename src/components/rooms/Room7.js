import React, { useEffect, useState, useRef, useContext } from "react";
import room7 from "../../images/room7-500.jpg";
import ImageMap from "image-map";
import playButton from "../../images/play_.png";
import pauseButton from "../../images/pause_.png";
import Context from "../../context/context";
// import rightArrow from "../../images/right-arrow-pink.png";
import "./room.css";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room7: room7,
};

export default function Room8(props) {
  const { entryScript, reentryScript, images, room, visited, itemsCollected } =
    props.roomEvaluateDetails;
  const isMounted = useRef(false);
  const [script, setScript] = useState();
  const { playerAction } = props.action;
  const { text } = props.selectedItemInfoForAction;
  //array of items used to determine which image to show
  const [newImage, setNewImage] = useState();
  //search for match of items array for the room, then set the "currentImage" with room string
  const [currentImage, setCurrentImage] = useState();
  const { isPlaying, action } = useContext(Context);
  useEffect(() => {
    ImageMap("img[usemap]");
  });

  //sets currentImage to the newImage (i.e. item taken) if there is one
  useEffect(() => {
    newImage
      ? setCurrentImage(newImage)
      : setCurrentImage(imagesArrayObject["room7"]);
  }, [newImage]);

  //changes the image based on the items collected in the room
  useEffect(() => {
    images?.forEach((image) => {
      if (image.itemsCollected.length === itemsCollected.length) {
        for (let i = 0; i < image.itemsCollected.length; i++) {
          if (itemsCollected.indexOf(image.itemsCollected[i]) !== -1) {
            console.log(image.file);
            // setCurrentImage(imagesArrayObject[image.file]);
            setNewImage(imagesArrayObject[image.file]);
          }
        }
      }
    });
  }, [itemsCollected, room]);

  //remove clickable image-map areas are items are taken
  useEffect(() => {
    console.log(`${itemsCollected[itemsCollected.length - 1]}`);
    const item = document.querySelector(
      `.${itemsCollected[itemsCollected.length - 1]}`
    );
    item?.remove();
  }, [newImage]);

  //conditionally shows entry or re-entry script
  useEffect(() => {
    if (!visited) {
      setScript(entryScript);
      props.updateLocationsVisited(room);
    } else {
      setScript(reentryScript);
    }
  }, [props.roomEvaluateDetails]);

  useEffect(() => {
    if (isMounted.current) {
      switch (playerAction) {
        case "Look":
          return setScript(text);
        case "Use":
          return setScript(text);
        case "Take":
          return setScript(text);
        case "Hit":
          return setScript(text);
        case "Speak":
          return setScript(text);
        default:
          //!this line does not seem to be working
          return setScript("what you expected did not happen");
      }
    } else {
      isMounted.current = true;
    }
  }, [text]);

  //calls update item in the parent component when an item is clicked
  const handleClick = (event) => {
    event.preventDefault();
    console.log(event.target.alt);
    props.updateItem(event.target.alt);
  };

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
        <img src={currentImage} useMap="#image-map" alt="room8" />
        <map name="image-map">
          <area
            onClick={handleClick}
            className="Small Reeds"
            target=""
            alt="Small Reeds"
            title="Small Reeds"
            href=""
            coords="259,506,69"
            shape="circle"
          />
          <area
            onClick={handleClick}
            className="Rock"
            target=""
            alt="Rock"
            title="Rock"
            href=""
            coords="763,604,56"
            shape="circle"
          />
        </map>
      </div>
      {/* <div>
        <img alt="right arrow" src={rightArrow} />
      </div> */}
      {/* <div className="text-box">
        <p style={{ style: "--n:53" }}>{script}</p>
      </div> */}
      <div className="text-box">{script}</div>
    </div>
  );
}
