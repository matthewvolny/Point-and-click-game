import React, { useEffect } from "react";
import room1b from "../../images/room1b.png";
import "./room1.css";
import ImageMap from "image-map";
// import $ from "jquery";

//room details
//room details (unique object for each room)
const room = {
  entryScript: "So this is Richard's Valley.  Let me find Richard",
  reentryScript: "Something tells me I have been here before",
  mapCoordinates: [
    { index: 1, position: "top" }, //top
    { index: "", position: "" }, //right
    { index: "", position: "" }, //bottom
    { index: "", position: "" }, //left
  ],
  items: [
    {
      name: "skull",
      position: "skull",
      lookText:
        "It's the skull of some creature. Its meaning seems quite clear: death lurks inside.",
      openText: "As if by magic, the skull rises.",
      useText: "",
      takeText: "",
      hitText: "",
      speakText: "",
      lookEffect: "",
      openEffect: "itemAppears(key)",
      useEffect: "",
      takeEffect: "",
      hitEffect: "",
      speakEffect: "",
      lookUrl: "",
      openUrl: "./room1-doorway.png",
      useUrl: "",
      takeUrl: "",
      hitUrl: "",
      speakUrl: "",
    },
    {
      name: "skull",
      position: "skull",
      lookText:
        "It's the skull of some creature. Its meaning seems quite clear: death lurks inside.",
      openText: "As if by magic, the skull rises.",
      useText: "",
      takeText: "",
      hitText: "",
      speakText: "",
      lookEffect: "",
      openEffect: "itemAppears(key)",
      useEffect: "",
      takeEffect: "",
      hitEffect: "",
      speakEffect: "",
      lookUrl: "",
      openUrl: "./room1-doorway.png",
      useUrl: "",
      takeUrl: "",
      hitUrl: "",
      speakUrl: "",
    },
  ],
};

export default function Room1(props) {
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
    console.log("rug clicked");
    props.updateItem("rug");
  };

  const lampClicked = (event) => {
    event.preventDefault();
    console.log("lamp clicked");
  };

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img
          className="background"
          src={room1b}
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
      <div className="text-box"></div>
      <script src="https://unpkg.com/image-map/dist/image-map.js"></script>
      {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>  */}
    </div>
  );
}
