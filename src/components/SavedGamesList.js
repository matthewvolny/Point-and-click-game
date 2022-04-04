import React from "react";
import image1 from "../images/carolineIcon.jpg";
import image2 from "../images/ellieIcon.jpg";
import image3 from "../images/lyleIcon.jpg";
import image4 from "../images/nevilleIcon.jpg";
import image5 from "../images/omarIcon.jpg";
import image6 from "../images/richardIcon.jpg";

const imagesArray = [image1, image2, image3, image4, image5, image6];

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
        <img
          alt="playerIcon"
          src={imagesArray[Math.floor(Math.random() * 6)]}
          style={{ width: "60px" }}
        />
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
