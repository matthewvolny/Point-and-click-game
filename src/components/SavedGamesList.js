import React from "react";
import moment from "moment";
import image1 from "../images/carolineIcon_cropped.jpg";
import image2 from "../images/ellieIcon_cropped.jpg";
import image3 from "../images/lyleIcon_cropped.jpg";
import image4 from "../images/nevilleIcon_cropped.jpg";
import image5 from "../images/omarIcon_cropped.jpg";
import image6 from "../images/richardIcon_cropped.jpg";
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
        className="user-game-flex"
      >
        <div className="icon">
          <img
            alt="playerIcon"
            src={imagesArray[Math.floor(Math.random() * 6)]}
          />
        </div>
        <div className="name-and-date">
          <div className="name">{game.user_name}</div>
          <div className="date">
            {moment(game.created_at).format("MM/DD/YYYY")}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="current-games-flex">
      <div className="current-games-heading">Current Games</div>
      <div className="games-list">{userGamesList}</div>
    </div>
  );
}
