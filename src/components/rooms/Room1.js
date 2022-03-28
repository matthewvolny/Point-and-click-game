import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import room1 from "../../images/room1.jpg";
import "./room1.css";

export default function Room1(props) {
  const { entryScript, room } = props.roomEvaluateDetails;
  const [script, setScript] = useState(entryScript);

  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(`/room${room + 1}`);
      props.updateCurrentRoom(`${room + 1}`);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img className="background" src={room1} alt="entryway" />
      </div>
      <div className="text-box">{script}</div>
    </div>
  );
}
