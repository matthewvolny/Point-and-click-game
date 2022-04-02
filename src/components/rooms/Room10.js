import React, { useEffect, useState, useRef } from "react";
import room10a from "../../images/room10a.jpg";

import ImageMap from "image-map";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room10a: room10a,
};
// import $ from "jquery";
//room details (unique object for each room)
export default function Room10(props) {
  const { entryScript, reentryScript, images, room, visited } =
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

  //!retrieves newImage from session storage on page refresh
  // useEffect(() => {
  //   setNewImage(JSON.parse(window.sessionStorage.getItem("newImage")));
  // }, []);

  //!stores newImage in session storage (when it updates)
  // useEffect(() => {
  //   window.sessionStorage.setItem("newImage", JSON.stringify(newImage));
  // }, [newImage]);

  //sets currentImage to the newImage (i.e. item taken) if there is one
  useEffect(() => {
    newImage
      ? setCurrentImage(newImage)
      : setCurrentImage(imagesArrayObject["room10a"]);
  }, [newImage]);

  //conditionally shows entry or re-entry script
  useEffect(() => {
    if (!visited) {
      setScript(entryScript);
      props.updateLocationsVisited(room);
    } else {
      setScript(reentryScript);
    }
  }, [entryScript]);

  //creates array of items collected from this specific room
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const itemsCollected = [];
  //     props.playerInventory.forEach((item) => {
  //       if (item.room === room) {
  //         itemsCollected.push(item.item);
  //       }
  //     });
  //     console.log(itemsCollected);
  //     setItemsCollectedInRoom(itemsCollected);
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [props.playerInventory]);

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

  //changes the image based on the items collected in the room
  useEffect(() => {
    images?.forEach((image) => {
      if (image.itemsCollected.length === itemsCollectedInRoom.length) {
        for (let i = 0; i < image.itemsCollected.length; i++) {
          if (itemsCollectedInRoom.indexOf(image.itemsCollected[i]) !== -1) {
            console.log(image.file);
            // setCurrentImage(imagesArrayObject[image.file]);
            setNewImage(imagesArrayObject[image.file]);
          }
        }
      }
    });
  }, [itemsCollectedInRoom]);

  //need to set up re-entry script display

  // $(".background").css("border-bottom", "solid 1px red");
  // $("img[usemap]").mapster();
  // useEffect(() => {
  //   //   $(".lamp").maphilight();
  //   $("img[usemap]").mapster();
  // });

  useEffect(() => {
    ImageMap("img[usemap]");
    // const imageMapData = ImageMap("img[usemap]");
    // console.log(imageMapData);
  });

  //remove clickable image-map areas are items are taken
  useEffect(() => {
    console.log(`.${itemsCollectedInRoom[itemsCollectedInRoom.length - 1]}`);
    const item = document.querySelector(
      `.${itemsCollectedInRoom[itemsCollectedInRoom.length - 1]}`
    );
    item?.remove();
  }, [itemsCollectedInRoom]);

  const handleClick = (event) => {
    event.preventDefault();
    console.log(event.target.alt);
    props.updateItem(event.target.alt);
  };

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img src={currentImage} useMap="#image-map" alt="room10a" />

        <map name="image-map">
          <area
            onClick={handleClick}
            target=""
            className="Mark"
            alt="Mark"
            title="Mark"
            href=""
            coords="1175,1295,348"
            shape="circle"
          />
          <area
            onClick={handleClick}
            target=""
            className="Flower"
            alt="Flower"
            title="Flower"
            href=""
            coords="2240,1180,151"
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
