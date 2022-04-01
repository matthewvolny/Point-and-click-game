import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SavedGamesList from "./components/SavedGamesList";
import Map from "./components/Map";
import Actions from "./components/Actions";
import Inventory from "./components/Inventory";
import Room1 from "./components/rooms/Room1";
import Room2 from "./components/rooms/Room2";
import Room3 from "./components/rooms/Room3";
import Room4 from "./components/rooms/Room4";
import Room5 from "./components/rooms/Room5";
import Room6 from "./components/rooms/Room6";
import Room7 from "./components/rooms/Room7";
import Room8 from "./components/rooms/Room8";
import Room9 from "./components/rooms/Room9";
import Room10 from "./components/rooms/Room10";
import Room11 from "./components/rooms/Room11";
import Room12 from "./components/rooms/Room12";

//!not needed?
import ImageMapper from "react-img-mapper";
import axios from "axios";
import "./App.css";

import { roomMap, roomEvaluateInfo } from "./mock data/data";

function App() {
  const [userId, setUserId] = useState();
  const [userGames, setUserGames] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [startingRoom, setStartingRoom] = useState();
  const [action, setAction] = useState({ playerAction: "", item: "" });
  const [roomMapDetails, setRoomMapDetails] = useState({
    currentRoom: roomMap[0].currentRoom,
    currentRoomInfo: roomMap[0].mapCoordinates,
  });

  const [roomEvaluateDetails, setRoomEvaluateDetails] = useState(
    roomEvaluateInfo[0]
  );

  //!retrieves stored room details from local storage on page refresh
  // useEffect(() => {
  //   setRoomEvaluateDetails(
  //     JSON.parse(window.sessionStorage.getItem("roomEvaluateDetails"))
  //   );
  //   setRoomMapDetails(
  //     JSON.parse(window.sessionStorage.getItem("roomMapDetails"))
  //   );
  // }, []);

  //!stores room details in local storage (when it updates)
  // useEffect(() => {
  //   window.sessionStorage.setItem(
  //     "roomEvaluateDetails",
  //     JSON.stringify(roomEvaluateDetails)
  //   );
  // }, [roomEvaluateDetails]);

  //!stores room map details in local storage (when it updates)
  // useEffect(() => {
  //   window.sessionStorage.setItem(
  //     "roomMapDetails",
  //     JSON.stringify(roomMapDetails)
  //   );
  // }, [roomMapDetails]);

  const [selectedItemInfo, setSelectedItemInfo] = useState();
  const [selectedItemInfoForAction, setSelectedItemInfoForAction] = useState({
    text: "",
    effect: "",
  });

  //playerInventory
  //!set from db on component render
  const [playerInventory, setPlayerInventory] = useState([]);

  const isMounted = useRef(false);
  const isMountedTwo = useRef(false);

  //updates state with selected player action
  const updatePlayerAction = (action) => {
    setAction({ playerAction: action, item: "" });
  };

  //updates state with selected item
  const updateItem = (item) => {
    setAction({ ...action, item: item });
  };

  //adds the selected item details (general item info, and specifics info) to state
  const updateSelectedItemInfo = () => {
    const { playerAction, item } = action;
    const { items } = roomEvaluateDetails;
    const selectedItemDetails = items.find((detailedItem) => {
      return detailedItem.name === item;
    });
    setSelectedItemInfo(selectedItemDetails);
    setSelectedItemInfoForAction(selectedItemDetails[playerAction]);
  };

  //if user has selected an action and an item, call function to put detailed info about the item in state
  useEffect(() => {
    if (action.playerAction !== "" && action.item !== "") {
      updateSelectedItemInfo();
    }
  });

  // on map link click, updates the map for the current room
  const updateRoomMapDetails = (newRoom) => {
    // console.log("updateRoomMapDetails");
    // console.log(newRoom); //2
    const selectedRoom = roomMap.find((room) => {
      return room.currentRoom == newRoom;
    });
    console.log(selectedRoom);
    setRoomMapDetails({
      currentRoom: selectedRoom.currentRoom,
      currentRoomInfo: selectedRoom.mapCoordinates,
    });
  };

  //add evaluate details object for the current room to state
  const updateRoomEvaluateDetails = (newRoom) => {
    // console.log("updateRoomEvaluateDetails");
    // console.log(newRoom); //2
    let roomInfo = roomEvaluateInfo.find((currentRoom) => {
      return currentRoom.room == newRoom;
    });
    // console.log(roomInfo);
    setRoomEvaluateDetails(roomInfo);
  };

  //called from the map component, updates the room on link click, adds info to state
  const updateCurrentRoom = (newRoom) => {
    // console.log("updateCurrentRoom");
    // console.log(newRoom);
    setAction({ playerAction: "", item: "" });
    setSelectedItemInfo();
    setSelectedItemInfoForAction({
      text: "",
      effect: "",
    });
    updateRoomEvaluateDetails(newRoom);
    updateRoomMapDetails(newRoom);
    console.log("newRoom");
    console.log(newRoom);
    console.log(userId);
    axios
      .post("http://localhost:3000/updateRoom", {
        newRoom: newRoom,
        userId: userId,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //!
  //!
  //!
  const { playerAction, item } = action;
  const { canTake } = selectedItemInfoForAction;
  useEffect(() => {
    if (playerAction === "Take" && canTake) {
      let inventoryArray = [...playerInventory];
      inventoryArray.push({ item: item });
      //add a room# to each item in the inventoryarray
      inventoryArray.forEach((item) => {
        const keyValue = roomEvaluateDetails.room;
        setPlayerInventory([
          ...playerInventory,
          {
            item: item.item,
            room: keyValue,
          },
        ]);
      });
      // updateInventory();
    }
  }, [item, canTake]);

  //
  //
  //

  //add room# to inventory items
  const updateInventory = (inventory) => {};

  //update the database with the players current inventory
  useEffect(() => {
    if (isMounted.current) {
      axios
        .post("http://localhost:3000/updatePlayerInventory", {
          playerInventory: playerInventory, //this is an array of items
          userId: userId,
        })
        .then((res) => {
          console.log(`statusCode: ${res.status}`);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      isMounted.current = true;
    }
  }, [playerInventory]);

  //record whether a room has been visited or not (to trigger re-entry script)
  //!importantly, this also changes the master data object to "visited" for a specific room
  const updateLocationsVisited = (room) => {
    let roomInfo = roomEvaluateInfo.find((currentRoom) => {
      //is this line needed
      // currentRoom.visited = true;
      return currentRoom.room == room;
    });
    roomInfo.visited = true;
    setRoomEvaluateDetails(roomInfo);
    saveGameState();
  };
  //!updates the database with updated game state
  const saveGameState = () => {
    axios
      .post("http://localhost:3000/updatePlayerGameState", {
        roomEvaluateInfo: roomEvaluateInfo,
        userId: userId,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //retrieves all games saved by users, stores them in state, these are passed to savedGamesList
  useEffect(() => {
    axios.get("/retrieveUserGames").then((response) => {
      console.log("data received");
      console.log(response.data);
      const data = response.data;
      const userGamesArray = [];
      data.forEach((game) => {
        userGamesArray.push(game);
      });
      setUserGames(userGamesArray);
    });
  }, []);

  //enters user data into db when they sign up, or logs them in if they have not
  //updates all player game state info on login
  const signupUser = (loginInfo, userIdNum) => {
    console.log("login");
    console.log(loginInfo);
    console.log(userIdNum);
    if (userIdNum) {
      axios
        .get("/login", {
          params: {
            loginInfo,
            userIdNum,
          },
        })
        .then((response) => {
          console.log("data received");
          console.log(response.data);
          //user game state
          const data = response.data;
          console.log(data[0].current_room);
          if (data.length === 0) {
            //!can display something to the screen here, and clear input
            console.log("login failed");
          } else {
            //set all aspects of the game state from the db call on login
            setUserLoggedIn(true);
            setStartingRoom(data[0].current_room);
            updateRoomMapDetails(data[0].current_room);
            const gameState = JSON.parse(data[0].game_state);
            roomEvaluateInfo = gameState;
            const savedInventory = JSON.parse(data[0].items);
            setPlayerInventory(savedInventory);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const randomNum = Math.floor(Math.random() * 10000);
      axios
        .post("http://localhost:3000/signup", {
          loginInfo: loginInfo,
          userId: randomNum,
          // currentRoom: 8, //!default signup room
        })
        .then((res) => {
          console.log(`statusCode: ${res.status}`);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      setUserLoggedIn(true);
      setUserId(randomNum);
    }
  };

  //
  //
  //
  //!
  //
  //

  //updates the database with items collected for each room
  useEffect(() => {
    if (playerInventory.length !== 0) {
      let roomInfo = roomEvaluateInfo.find((currentRoom) => {
        return currentRoom.room == roomMapDetails.currentRoom;
      });
      console.log(roomInfo);
      // roomInfo.itemsCollected.push(playerInventory[0]);
    }
    // setRoomEvaluateDetails(roomInfo);
    saveGameState();
  }, [playerInventory]);

  //creates array of items collected from this specific room
  // useEffect(() => {
  //   // if (isMounted.current) {
  //   const itemsCollected = [];
  //   playerInventory.forEach((item) => {
  //     if (item.room === roomMapDetails.currentRoom) {
  //       itemsCollected.push(item.item);
  //     }
  //   });
  //   console.log(itemsCollected);
  //   setItemsCollectedInRoom(itemsCollected);

  //   // } else {
  //   //   isMounted.current = true;
  //   // }
  // }, [playerInventory]);

  //intermediate function, passes userId from saved games list to state, so it can be sent to login component
  const loginPastUser = (userId) => {
    setUserId(userId);
  };

  return (
    <div className="container">
      {userLoggedIn && startingRoom ? (
        <BrowserRouter>
          <div className="top-flex">
            <Routes>
              <Route
                path="/"
                element={
                  startingRoom ? (
                    <Navigate to={`/room${startingRoom}`} />
                  ) : (
                    <Room1
                      roomEvaluateDetails={roomEvaluateDetails}
                      updateCurrentRoom={updateCurrentRoom}
                    />
                  )
                }
              />
              <Route
                path="/room2"
                element={
                  <Room2
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
                }
              />
              <Route
                path="/room3"
                element={
                  <Room3
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
                }
              />
              <Route
                path="/room4"
                element={
                  <Room4
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
                }
              />
              <Route
                path="/room5"
                element={
                  <Room5
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
                }
              />
              <Route
                path="/room6"
                element={
                  <Room6
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
                }
              />
              <Route
                path="/room7"
                element={
                  <Room7
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
                }
              />
              <Route
                path="/room8"
                element={
                  <Room8
                    updateItem={updateItem}
                    roomEvaluateDetails={roomEvaluateDetails}
                    action={action}
                    selectedItemInfoForAction={selectedItemInfoForAction}
                    playerInventory={playerInventory}
                    updateCurrentRoom={updateCurrentRoom}
                    updateLocationsVisited={updateLocationsVisited}
                  />
                }
              />
              <Route
                path="/room9"
                element={
                  <Room9
                    updateItem={updateItem}
                    roomEvaluateDetails={roomEvaluateDetails}
                    action={action}
                    selectedItemInfoForAction={selectedItemInfoForAction}
                    playerInventory={playerInventory}
                    updateCurrentRoom={updateCurrentRoom}
                    updateLocationsVisited={updateLocationsVisited}
                  />
                }
              />
              <Route
                path="/room10"
                element={
                  <Room10
                    updateItem={updateItem}
                    roomEvaluateDetails={roomEvaluateDetails}
                    action={action}
                    selectedItemInfoForAction={selectedItemInfoForAction}
                    playerInventory={playerInventory}
                    updateCurrentRoom={updateCurrentRoom}
                    updateLocationsVisited={updateLocationsVisited}
                  />
                }
              />
              <Route
                path="/room11"
                element={
                  <Room11
                    updateItem={updateItem}
                    roomEvaluateDetails={roomEvaluateDetails}
                    action={action}
                    selectedItemInfoForAction={selectedItemInfoForAction}
                    playerInventory={playerInventory}
                    updateCurrentRoom={updateCurrentRoom}
                    updateLocationsVisited={updateLocationsVisited}
                  />
                }
              />
              <Route
                path="/room12"
                element={
                  <Room12
                    updateItem={updateItem}
                    roomEvaluateDetails={roomEvaluateDetails}
                    action={action}
                    selectedItemInfoForAction={selectedItemInfoForAction}
                    playerInventory={playerInventory}
                    updateCurrentRoom={updateCurrentRoom}
                    updateLocationsVisited={updateLocationsVisited}
                  />
                }
              />
            </Routes>
            <Inventory
              // action={action}
              // selectedItemInfo={selectedItemInfo}
              // selectedItemInfoForAction={selectedItemInfoForAction}
              // updateInventory={updateInventory}
              playerInventory={playerInventory}
            />
          </div>
          <div className="bottom-flex">
            <Map
              roomMapDetails={roomMapDetails}
              updateCurrentRoom={updateCurrentRoom}
            />
            <Actions updatePlayerAction={updatePlayerAction} />
          </div>
        </BrowserRouter>
      ) : (
        <>
          <div className="title">Leaving Richards Valley</div>
          <SavedGamesList userGames={userGames} loginPastUser={loginPastUser} />
          <Login
            signupUser={signupUser}
            userId={userId}
            startingRoom={startingRoom}
          />
        </>
      )}
    </div>
  );
}

export default App;
