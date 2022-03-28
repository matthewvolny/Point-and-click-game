import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import room2 from "../../images/room2.jpg";

export default function Room2(props) {
  const { entryScript, room } = props.roomEvaluateDetails;
  const isMounted = useRef(false);
  const [script, setScript] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      navigate(`/room${room + 1}`);
      props.updateCurrentRoom(`${room + 1}`);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    if (isMounted.current) {
      setScript(entryScript);
    } else {
      isMounted.current = true;
    }
  }, [entryScript]);

  return (
    <div className="top-left-flex-container">
      <div className="image-container">
        <img className="background" src={room2} alt="entryway" />
      </div>
      <div className="text-box">{script}</div>
    </div>
  );
}
