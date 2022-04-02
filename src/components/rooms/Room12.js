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

  const rugClicked = (event) => {
    event.preventDefault();
    // console.log("rug clicked");
    props.updateItem("Rug");
  };

  const lampClicked = (event) => {
    event.preventDefault();
    // console.log("lamp clicked");
    props.updateItem("Lamp");
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
            className="rug"
            onClick={rugClicked}
            target=""
            alt="rug"
            title="rug"
            href=""
            coords="1023,1584,879,1594,658,1677,607,1726,680,1810,905,1873,1141,1893,1633,1893,1930,1851,2101,1787,2138,1724,2040,1648,1599,1562,1219,1562"
            shape="poly"
          />
          <area
            className="lamp"
            onClick={lampClicked}
            target=""
            alt="small lamp"
            title="small lamp"
            href=""
            coords="391,792,364,868,352,917,411,932,443,934,443,971,399,991,450,995,502,988,479,929,496,932,531,919,531,875,506,792,445,780"
            shape="poly"
          />
        </map>
      </div>
      <div className="text-box">{script}</div>
      <script src="https://unpkg.com/image-map/dist/image-map.js"></script>
      {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>  */}
    </div>
  );
}
