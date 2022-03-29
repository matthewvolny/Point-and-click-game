import React, { useEffect, useState, useRef } from "react";
import room9a from "../../images/room9a.jpg";
import room9b from "../../images/room9b.jpg";
import ImageMap from "image-map";

//map the string value to the variable holding the file
const imagesArrayObject = {
  room9a: room9a,
  room9b: room9b,
};
// import $ from "jquery";
//room details (unique object for each room)
export default function Room8(props) {
  const { entryScript, reentryScript, images, room } =
    props.roomEvaluateDetails;
  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);
  const isMountedThree = useRef(false);
  const [script, setScript] = useState();
  const { playerAction } = props.action;
  const { text } = props.selectedItemInfoForAction;
  //need this to be an array of items
  const [itemsCollectedInRoom, setItemsCollectedInRoom] = useState([]);

  //search for match of items array for the room, then set the "currentImage" with room string
  const [currentImage, setCurrentImage] = useState(imagesArrayObject["room9a"]);

  useEffect(() => {
    if (isMountedThree.current) {
      setScript(entryScript);
    } else {
      isMountedThree.current = true;
    }
  }, [entryScript]);

  //creates array of items collected from this specific room
  useEffect(() => {
    if (isMounted.current) {
      const itemsCollected = [];
      props.playerInventory.forEach((item) => {
        if (item.room === room) {
          itemsCollected.push(item.item);
        }
      });
      console.log(itemsCollected);
      setItemsCollectedInRoom(itemsCollected);
    } else {
      isMounted.current = true;
    }
  }, [props.playerInventory]);

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
      console.log("running");
      if (image.itemsCollected.length === itemsCollectedInRoom.length) {
        for (let i = 0; i < image.itemsCollected.length; i++) {
          if (itemsCollectedInRoom.indexOf(image.itemsCollected[i]) !== -1) {
            console.log(image.file);
            setCurrentImage(imagesArrayObject[image.file]);
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

  const leafClicked = (event) => {
    event.preventDefault();
    // console.log("rug clicked");
    props.updateItem("Leaf");
  };

  const shallowPoolClicked = (event) => {
    event.preventDefault();
    // console.log("lamp clicked");
    props.updateItem("Shallow Pool");
  };

  const largeReedClicked = (event) => {
    event.preventDefault();
    // console.log("lamp clicked");
    props.updateItem("Large Reed");
  };

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img src={currentImage} useMap="#image-map" alt="room9a" />
        <map name="image-map">
          <area
            onClick={leafClicked}
            target=""
            alt="leaf"
            title="leaf"
            href=""
            coords="776,1146,67"
            shape="circle"
          />
          <area
            onClick={shallowPoolClicked}
            target=""
            alt="shallow pool"
            title="shallow pool"
            href=""
            coords="1371,446,179"
            shape="circle"
          />
          <area
            onClick={largeReedClicked}
            target=""
            alt="large reed"
            title="large reed"
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
