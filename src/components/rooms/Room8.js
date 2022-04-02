import React, { useEffect, useState, useRef } from "react";
import room8 from "../../images/room8.jpg";
import ImageMap from "image-map";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room8: room8,
};
// import $ from "jquery";
//room details (unique object for each room)
export default function Room8(props) {
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

  //may need
  //!sets itemsCollected in this specific room to state
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
      : setCurrentImage(imagesArrayObject["room8"]);
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
  }, [itemsCollectedInRoom, room]);

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

  // const leafClicked = (event) => {
  //   event.preventDefault();
  //   // console.log("rug clicked");
  //   props.updateItem("Leaf");
  //   //!would need an event listener for each ".leaf" element, and delete based on the event.target
  //   //!needs specifically to be a take action
  //   const leaf = document.querySelector(".leaf");
  //   leaf.remove();
  // };

  //!remove clickable image-map areas are items are taken
  useEffect(() => {
    console.log(`${itemsCollectedInRoom[itemsCollectedInRoom.length - 1]}`);
    const item = document.querySelector(
      `.${itemsCollectedInRoom[itemsCollectedInRoom.length - 1]}`
    );
    item?.remove();
  }, [itemsCollectedInRoom, room, props.roomItemsCollected]);

  const handleClick = (event) => {
    event.preventDefault();
    console.log(event.target.alt);
    props.updateItem(event.target.alt);
  };

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img src={currentImage} useMap="#image-map" alt="room8" />
        <map name="image-map">
          <area
            onClick={handleClick}
            target=""
            alt="Plant"
            // title="Plant"
            href=""
            coords="537,1002,76"
            shape="circle"
          />
          <area
            onClick={handleClick}
            target=""
            alt="Plant"
            // title="Plant"
            href=""
            coords="1127,1422,81"
            shape="circle"
          />
          <area
            onClick={handleClick}
            target=""
            alt="Rock"
            // title="Rock"
            href=""
            coords="1446,1161,59"
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
