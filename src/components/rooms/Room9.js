import React, { useEffect, useState, useRef } from "react";
import room9a from "../../images/room9a.jpg";
import room9b from "../../images/room9b.jpg";
import ImageMap from "image-map";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room9a: room9a,
  room9b: room9b,
};

export default function Room9(props) {
  const { entryScript, reentryScript, images, room, visited, itemsCollected } =
    props.roomEvaluateDetails;
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const isMountedThree = useRef(false);
  const [script, setScript] = useState();
  const { playerAction } = props.action;
  const { text } = props.selectedItemInfoForAction;
  //array of items used to determine which image to show
  const [itemsCollectedInRoom, setItemsCollectedInRoom] = useState([]);
  const [newImage, setNewImage] = useState();
  //search for match of items array for the room, then set the "currentImage" with room string
  const [currentImage, setCurrentImage] = useState();

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

  //!may be needed
  //sets itemsCollected in this specific room to state
  // useEffect(() => {
  //   let itemsFoundInRoom = "";
  //   for (let i = 0; i < props.roomItemsCollected.length; i++) {
  //     if (room == props.roomItemsCollected[i].room) {
  //       console.log("room#");
  //       itemsFoundInRoom = props.roomItemsCollected[i].itemsCollected;
  //     }
  //   }
  //   setItemsCollectedInRoom(itemsFoundInRoom);
  // }, [props.roomItemsCollected]);

  //sets currentImage to the newImage (i.e. item taken) if there is one
  useEffect(() => {
    newImage
      ? setCurrentImage(newImage)
      : setCurrentImage(imagesArrayObject["room9a"]);
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

  // useEffect(()=> {
  // setItemsCollectedInRoom(itemsCollected));
  // }, [room])

  //!remove clickable image-map areas are items are taken
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
    if (isMountedTwo.current) {
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
      isMountedTwo.current = true;
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
      <div className="image-container">
        <img src={currentImage} useMap="#image-map" alt="room9a" />
        <map name="image-map">
          <area
            onClick={handleClick}
            target=""
            alt="Leaf"
            className="Leaf"
            href=""
            coords="776,1146,67"
            shape="circle"
          />
          <area
            onClick={handleClick}
            target=""
            alt="Shallow Pool"
            className="Shallow Pool"
            href=""
            coords="1371,446,179"
            shape="circle"
          />
          <area
            onClick={handleClick}
            target=""
            alt="Large Reed"
            className="Large Reed"
            href=""
            coords="555,567,172"
            shape="circle"
          />
        </map>
      </div>
      <div className="text-box">{script}</div>
      <script src="https://unpkg.com/image-map/dist/image-map.js"></script>
      {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>  */}
    </div>
  );
}
