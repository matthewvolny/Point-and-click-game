import React, { useEffect, useState, useRef } from "react";
import entryway from "../../images/entryway.jpg";
import "./room1.css";
import ImageMap from "image-map";
// import $ from "jquery";

//room details
//room details (unique object for each room)

export default function Room1(props) {
  const { entryScript, reentryScript } = props.roomEvaluateDetails;
  const isMounted = useRef(false);
  const [script, setScript] = useState(entryScript);

  const { playerAction } = props.action;
  const { text } = props.selectedItemInfoForAction;

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
          src={entryway}
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
