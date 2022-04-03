import React, { useEffect, useState, useRef } from "react";
import room1a from "../../images/room1a.jpg";
import room1b from "../../images/room1b.png";
import "./room1.css";
import ImageMap from "image-map";

const imagesArray = [room1a, room1b];

//map the string value to the variable holding the file
const imagesArrayObject = {
  room1a: room1a,
  room1b: room1b,
  // room1c: room1c,
  // room1d: room1d,
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
  const [currentImage, setCurrentImage] = useState(imagesArrayObject["room1a"]);

  useEffect(() => {
    if (isMountedThree.current) {
      setScript(entryScript);
    } else {
      isMountedThree.current = true;
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

  //calls update item in the parent component when an item is clicked
  const handleClick = (event) => {
    event.preventDefault();
    console.log(event.target.alt);
    props.updateItem(event.target.alt);
  };

  return (
    <div className="top-left-flex-container">
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
            className="Ellie Squirrel"
            target=""
            alt="Ellie Squirrel"
            title="Ellie Squirrel"
            href=""
            coords="747,1139,269"
            shape="circle"
          />
          <area
            onClick={handleClick}
            className="Acorns"
            target=""
            alt="Acorns"
            title="Acorns"
            href=""
            coords="1238,1460,212"
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
