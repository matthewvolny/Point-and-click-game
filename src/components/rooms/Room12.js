import React, { useEffect, useState, useRef, useContext } from "react";
import room12a from "../../images/room12a-500.jpg";
import room12b from "../../images/room12b-500.jpg";
import room12c from "../../images/room12c-500.jpg";
import ImageMap from "image-map";
import playButton from "../../images/play_.png";
import pauseButton from "../../images/pause_.png";
import Context from "../../context/context";
import "./room.css";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room12a: room12a,
  room12b: room12b,
  room12c: room12c,
};

export default function Room12(props) {
  const { entryScript, reentryScript, images, room, visited, itemsCollected } =
    props.roomEvaluateDetails;
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const [script, setScript] = useState();
  const { playerAction } = props.action;
  const { text } = props.selectedItemInfoForAction;
  //array of items used to determine which image to show
  const [newImage, setNewImage] = useState();
  //search for match of items array for the room, then set the "currentImage" with room string
  const [currentImage, setCurrentImage] = useState();
  const { isPlaying } = useContext(Context);
  useEffect(() => {
    ImageMap("img[usemap]");
  });

  const [mapReturn, setMapReturn] = useState(false);

  //calls update item in the parent component when an item is clicked
  const handleClick = (event) => {
    event.preventDefault();
    console.log(event.target.alt);
    props.updateItem(event.target.alt);
  };

  //triggered when sidebar items are used on characters, changes image and script
  useEffect(() => {
    if (props.sidebarItemTriggeredEvents) {
      const ellie = document.querySelector(".Ellie");
      const { script, image } = props.sidebarItemTriggeredEvents;
      setScript(script);
      setCurrentImage(imagesArrayObject[image]);
      //remove image map zone, then puts it back to remove green circle on image change
      ellie.remove();
      setMapReturn(true);
      let timer = setTimeout(() => {
        setCurrentImage(imagesArrayObject["room12a"]);
        setScript();
      }, 6000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [props.sidebarItemTriggeredEvents]);

  //area of the map to return following click(resets image-map green circle)
  const returnedMapArea = (
    <area
      onClick={handleClick}
      className="Ellie"
      target=""
      alt="Ellie"
      title="Ellie"
      href=""
      coords="747,1139,269"
      shape="circle"
    />
  );

  //sets currentImage to the newImage (i.e. item taken) if there is one
  useEffect(() => {
    newImage
      ? setCurrentImage(newImage)
      : setCurrentImage(imagesArrayObject["room12a"]);
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

  //remove clickable image-map areas as item is taken
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
        <img
          className="background"
          src={currentImage}
          alt="entryway"
          useMap="#image-map"
        />
        <map name="image-map">
          <area
            onClick={handleClick}
            className="Ellie"
            target=""
            alt="Ellie"
            title="Ellie"
            href=""
            coords="410,501,153"
            shape="circle"
          />
          {mapReturn && returnedMapArea}
          <area
            onClick={handleClick}
            className="Acorns"
            target=""
            alt="Acorns"
            title="Acorns"
            href=""
            coords="688,694,137"
            shape="circle"
          />
        </map>
      </div>
      <div className="text-box">{script}</div>
    </div>
  );
}
