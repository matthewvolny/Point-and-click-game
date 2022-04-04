import React from "react";
import moment from "moment";
import image1 from "../images/carolineIcon.jpg";
import image2 from "../images/ellieIcon.jpg";
import image3 from "../images/lyleIcon.jpg";
import image4 from "../images/nevilleIcon.jpg";
import image5 from "../images/omarIcon.jpg";
import image6 from "../images/richardIcon.jpg";
moment().format();

const imagesArray = [image1, image2, image3, image4, image5, image6];

export default function SavedGamesList(props) {
  const handleClick = (event) => {
    props.loginPastUser(event.currentTarget.id);
  };

  // const gameDate = moment("2022-04-02T18:53:19.331Z");
  // console.log(gameDate.format("MM/DD/YYYY"));

  const userGamesList = props.userGames?.map((game) => {
    return (
      <div
        key={Math.floor(Math.random() * 10000)}
        onClick={handleClick}
        id={game.user_id}
        className="user-game"
      >
        <div>{game.user_name}</div>
        <img
          alt="playerIcon"
          src={imagesArray[Math.floor(Math.random() * 6)]}
        />
        <div className="date">
          {moment(game.created_at).format("MM/DD/YYYY")}
        </div>
      </div>
    );
  });

  return (
    <div className="current-games-flex">
      <div className="heading">Current Games</div>
      <div className="games-list">{userGamesList}</div>
    </div>
  );
}
