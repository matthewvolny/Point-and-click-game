import React from "react";
import playerImage from "../images/playerImageSample.jpg";

export default function SavedGamesList(props) {
  const handleClick = (event) => {
    props.loginPastUser(event.currentTarget.id);
  };

  const userGamesList = props.userGames?.map((game) => {
    return (
      <div
        key={Math.floor(Math.random() * 10000)}
        onClick={handleClick}
        id={game.user_id}
        className={game.user_id}
      >
        <img alt="playerIcon" src={playerImage} style={{ width: "60px" }} />
        <div>{game.user_name}</div>
        <div>{game.created_at}</div>
      </div>
    );
  });

  // axios
  //   .get("/retrieveGameState", {
  //     params: {
  //       loginId: loginId,
  //     },
  //   })
  //   .then((response) => {
  //     console.log("data received");
  //     console.log(response.data);
  //     const data = response.data;
  //   });

  return (
    <div>
      <div>Current Games</div>
      <div>{userGamesList}</div>
    </div>
  );
}
