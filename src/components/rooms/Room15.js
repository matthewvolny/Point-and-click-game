import React, { useEffect, useState, useRef, useContext } from "react";
import room15a from "../../images/room15a-500.jpg";
import room15b from "../../images/room15b-500.jpg";
import ImageMap from "image-map";
import playButton from "../../images/play_.png";
import pauseButton from "../../images/pause_.png";
import Context from "../../context/context";
import "./room.css";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room15a: room15a,
  room15b: room15b,
};

export default function Room14(props) {
  const { entryScript, reentryScript, images, room, visited, itemsCollected } =
    props.roomEvaluateDetails;
  const isMounted = useRef(false);
  // const isMountedTwo = useRef(false);
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

  //!retrieves newImage from session storage on page refresh
  // useEffect(() => {
  //   setNewImage(JSON.parse(window.sessionStorage.getItem("newImage")));
  // }, []);

  //!stores newImage in session storage (when it updates)
  // useEffect(() => {
  //   window.sessionStorage.setItem("newImage", JSON.stringify(newImage));
  // }, [newImage]);

  // const [mapReturn, setMapReturn] = useState(false);

  //triggered when sidebar items are used on characters, changes image and script
  // useEffect(() => {
  //   if (props.sidebarItemTriggeredEvents) {
  //     const ellie = document.querySelector(".Ellie");
  //     const { script, image } = props.sidebarItemTriggeredEvents;
  //     setScript(script);
  //     setCurrentImage(imagesArrayObject[image]);
  //     //remove image map zone, then puts it back to remove green circle on image change
  //     ellie.remove();
  //     setMapReturn(true);
  //     let timer = setTimeout(() => {
  //       setCurrentImage(imagesArrayObject["room13a"]);
  //       setScript();
  //     }, 5000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [props.sidebarItemTriggeredEvents]);

  //area of the map to return following click(resets image-map green circle)
  // const returnedMapArea = (
  //   <area
  //     onClick={handleClick}
  //     className="Ellie"
  //     target=""
  //     alt="Ellie"
  //     title="Ellie"
  //     href=""
  //     coords="747,1139,269"
  //     shape="circle"
  //   />
  // );

  //sets currentImage to the newImage (i.e. item taken) if there is one
  useEffect(() => {
    newImage
      ? setCurrentImage(newImage)
      : setCurrentImage(imagesArrayObject["room15a"]);
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
        case "Open":
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
        <img
          className="background"
          src={currentImage}
          alt="entryway"
          useMap="#image-map"
        />
        <map name="image-map">
          <area
            onClick={handleClick}
            className="Rock statue"
            target=""
            alt="Rock statue"
            title="Rock statue"
            href=""
            coords="1353,904,269"
            shape="circle"
          />
          <area
            onClick={handleClick}
            className="Tall rock statue"
            target=""
            alt="Tall rock statue"
            title="Tall rock statue"
            href=""
            coords="405,882,314"
            shape="circle"
          />
        </map>
      </div>
      <div className="text-box">{script}</div>
    </div>
  );
}
