import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { roomMap, roomEvaluateInfo } from "./mock data/data";
import { MemoryRouter } from "react-router";
import Context from "./context/context";
import Login from "./components/Login";
import SavedGamesList from "./components/SavedGamesList";
import Map from "./components/Map";
import Actions from "./components/Actions";
import Inventory from "./components/Inventory";
import Room1 from "./components/rooms/Room1";
import Room6 from "./components/rooms/Room6";
import Room7 from "./components/rooms/Room7";
import Room8 from "./components/rooms/Room8";
import Room9 from "./components/rooms/Room9";
import Room10 from "./components/rooms/Room10";
import Room11 from "./components/rooms/Room11";
import Room12 from "./components/rooms/Room12";
import Room13 from "./components/rooms/Room13";
import Room14 from "./components/rooms/Room14";
import Room15 from "./components/rooms/Room15";
import song1 from "./static/rootabaga_pigeons.mp3";
import axios from "axios";
import "./App.css";

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
  const [selectedItemInfoForAction, setSelectedItemInfoForAction] = useState({
    text: "",
    effect: "",
  });
  const [playerInventory, setPlayerInventory] = useState([]);
  const [roomItemsCollected, setRoomItemsCollected] = useState();
  const isMounted = useRef(false);

  //audio player with toggle on and off controls
  const [audio] = useState(new Audio(song1));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSong = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const [inventoryAction, setInventoryAction] = useState({});
  const [sidebarItemTriggeredEvents, setSidebarItemTriggeredEvents] =
    useState();
  // const [inventoryItemToDelete, setInventoryItemToDelete] = useState();

  //(aa)updates state if inventory item from the sidebar is collected
  const inventoryItemClicked = (item) => {
    if (action.playerAction === "Use") {
      setInventoryAction({
        action: action.playerAction,
        item: item,
        // target: "",
      });
      setAction({ playerAction: "", item: "" });
    }
  };

  //(dd)delete used item from player inventory
  const deleteInventoryItem = (itemToDelete) => {
    const playerInventoryArray = playerInventory;
    for (let i = 0; i < playerInventoryArray.length; i++) {
      if (playerInventoryArray[i].item == itemToDelete) {
        playerInventoryArray.splice(i, 1);
      }
    }
    setPlayerInventory(playerInventoryArray);
  };

  //(cc)checks for being able to use an item on a character, if so, delete the item and execute character(room) specific functions
  const handleSidebarAction = (inventoryActionCopy) => {
    const { characterName, item, active, script } =
      roomEvaluateDetails.character;
    if (
      active === true &&
      characterName === inventoryActionCopy.target &&
      item === inventoryActionCopy.item
    ) {
      console.log("match");
      deleteInventoryItem(inventoryAction.item);
      switch (characterName) {
        case "Ellie":
          const currentRoom = roomEvaluateInfo.find((room) => {
            return room.room == roomMapDetails.currentRoom;
          });
          const currentRoomItem = currentRoom.items.find((item) => {
            return item.name == "Acorns";
          });
          currentRoomItem.Take.canTake = true;
          saveGameState();
          return setSidebarItemTriggeredEvents({
            script: script,
            image: "room12b",
          });
        case "Mark":
          return console.log("nothing");
        case "Julianne Napkin":
          return setSidebarItemTriggeredEvents({
            script: script,
            image: "room15b",
          });
        case "Lyle":
          return console.log("nothing");
        default:
          //!this line does not seem to be working
          return console.log("nothing");
      }
      setInventoryAction({});
    }
  };

  //(1)updates state with selected player action
  const updatePlayerAction = (action) => {
    setAction({ playerAction: action, item: "" });
  };

  //(2)updates state with selected item
  const updateItem = (item) => {
    setAction({ ...action, item: item });
    //(bb)updates state if inventory item from the sidebar is collected
    if (Object.keys(inventoryAction).length === 2) {
      const inventoryActionCopy = inventoryAction;
      inventoryActionCopy.target = item;
      setInventoryAction(inventoryActionCopy); //may not be needed
      handleSidebarAction(inventoryActionCopy);
    }
  };

  //(4)adds the selected item details (general item info, and specifics info) to state
  const updateSelectedItemInfo = () => {
    const { playerAction, item } = action;
    const { items } = roomEvaluateDetails;
    const selectedItemDetails = items.find((detailedItem) => {
      return detailedItem.name === item;
    });
    // setSelectedItemInfo(selectedItemDetails);
    setSelectedItemInfoForAction(selectedItemDetails[playerAction]);
  };

  //(3)if user has selected an action and an item, call function to put detailed info about the item in state
  useEffect(() => {
    if (action.playerAction !== "" && action.item !== "") {
      updateSelectedItemInfo();
      // setToggleClicked(true);
      // console.log("clicked");
    }
  });

  //(5) moves the "takeable" item into inventory (and adds a room #)
  //!it would be good to sort these inventory items before putting them in playerInventory(important for step(7))
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
    }
  }, [item, canTake]);

  //(6)updates the database with the players current inventory
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

  //(7)add items from player inventory to an array in the correct room of the game state object
  useEffect(() => {
    let index = 1;
    let itemsCollectedArray = [];
    if (playerInventory.length !== 0) {
      for (let i = 0; i < roomEvaluateInfo.length; i++) {
        for (let j = 0; j < playerInventory.length; j++) {
          if (roomEvaluateInfo[i].room == playerInventory[j].room) {
            console.log("same room");
            itemsCollectedArray.push(playerInventory[j].item);
          }
        }
        roomEvaluateInfo[i].itemsCollected = itemsCollectedArray;
        itemsCollectedArray = [];
      }
    }
    console.log(roomEvaluateInfo);
    saveGameState();
  }, [playerInventory]);

  //set itemscollectedbyroom state from the updated game state
  useEffect(() => {
    const itemsCollectedByRoom = [];
    for (let i = 0; i < roomEvaluateInfo.length; i++) {
      itemsCollectedByRoom.push({
        room: roomEvaluateInfo[i].room,
        itemsCollected: roomEvaluateInfo[i].itemsCollected,
      });
    }
    setRoomItemsCollected(itemsCollectedByRoom);
  }, [playerInventory]);

  //(c) on map link click, updates the map for the current room
  const updateRoomMapDetails = (newRoom) => {
    const selectedRoom = roomMap.find((room) => {
      return room.currentRoom == newRoom;
    });
    setRoomMapDetails({
      currentRoom: selectedRoom.currentRoom,
      currentRoomInfo: selectedRoom.mapCoordinates,
    });
  };

  //(b) add evaluate details object for the current room to state
  const updateRoomEvaluateDetails = (newRoom) => {
    let roomInfo = roomEvaluateInfo.find((currentRoom) => {
      return currentRoom.room == newRoom;
    });
    setRoomEvaluateDetails(roomInfo);
  };

  //record whether a room has been visited or not (to trigger re-entry script)
  const updateLocationsVisited = (room) => {
    let roomInfo = roomEvaluateInfo.find((currentRoom) => {
      return currentRoom.room == room;
    });
    roomInfo.visited = true;
    setRoomEvaluateDetails(roomInfo);
    saveGameState();
  };

  //(a)called from the map component, updates the room on link click, adds "currentRoom" info to state
  const updateCurrentRoom = (newRoom, loginRoomUpdate) => {
    console.log("new room entered");
    console.log(roomEvaluateInfo);
    setAction({ playerAction: "", item: "" });
    // setSelectedItemInfo();
    setSelectedItemInfoForAction({
      text: "",
      effect: "",
    });
    updateRoomEvaluateDetails(newRoom);
    updateRoomMapDetails(newRoom);
    if (!loginRoomUpdate) {
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
    }
  };

  //generic function to update the player's game state
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

  //retrieves all saved user games, stores them in state, where they are displayed in savedGamesList
  useEffect(() => {
    axios.get("/retrieveUserGames").then((response) => {
      const data = response.data;
      const userGamesArray = [];
      data?.forEach((game) => {
        userGamesArray.push(game);
      });
      setUserGames(userGamesArray);
    });
  }, []);

  //signs up, or logs in user (updates player game state info on login)
  const signupUser = (loginInfo, userIdNum) => {
    if (userIdNum) {
      axios
        .get("/login", {
          params: {
            loginInfo,
            userIdNum,
          },
        })
        .then((response) => {
          const data = response.data; // itemsCollected = [Leaf]
          if (data.length === 0) {
            //!can display something to the screen here, and clear input
            console.log("login failed");
          } else {
            //set all aspects of the game state from the db call on login
            setUserLoggedIn(true);
            setStartingRoom(data[0].current_room);
            const loginRoomUpdate = true;
            updateCurrentRoom(data[0].current_room, loginRoomUpdate);
            const gameState = JSON.parse(data[0].game_state);
            roomEvaluateInfo = gameState;
            console.log(roomEvaluateInfo); // itemscOLLECTED [ TWO LEAVES]
            const savedInventory = JSON.parse(data[0].items);
            setPlayerInventory(savedInventory);
            //roomEvaluateInfo FOR THE SpECIFIC ROOM
            console.log("check here...........!");
            updateRoomEvaluateDetails(data[0].current_room);
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

  //intermediate function, passes userId from saved games list to state, so it can be sent to login component
  const loginPastUser = (userId) => {
    setUserId(userId);
  };
  // const history = createMemoryHistory(location);

  return (
    <Context.Provider value={{ isPlaying, action, playerInventory }}>
      <div className="container">
        {userLoggedIn ? (
          <MemoryRouter>
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
                        toggleSong={toggleSong}
                      />
                    )
                  }
                />
                <Route
                  path="/room6"
                  element={
                    <Room6
                      updateItem={updateItem}
                      roomEvaluateDetails={roomEvaluateDetails}
                      action={action}
                      selectedItemInfoForAction={selectedItemInfoForAction}
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
                    />
                  }
                />
                <Route
                  path="/room7"
                  element={
                    <Room7
                      updateItem={updateItem}
                      roomEvaluateDetails={roomEvaluateDetails}
                      action={action}
                      selectedItemInfoForAction={selectedItemInfoForAction}
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
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
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
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
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
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
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
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
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
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
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents}
                      toggleSong={toggleSong}
                    />
                  }
                />
                <Route
                  path="/room13"
                  element={
                    <Room13
                      updateItem={updateItem}
                      roomEvaluateDetails={roomEvaluateDetails}
                      action={action}
                      selectedItemInfoForAction={selectedItemInfoForAction}
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents} //!NOT NEEDED IN ROOMS WITHOUT CHARACTERS (I THINK)
                      toggleSong={toggleSong}
                    />
                  }
                />
                <Route
                  path="/room14"
                  element={
                    <Room14
                      updateItem={updateItem}
                      roomEvaluateDetails={roomEvaluateDetails}
                      action={action}
                      selectedItemInfoForAction={selectedItemInfoForAction}
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents} //!NOT NEEDED IN ROOMS WITHOUT CHARACTERS (I THINK)
                      toggleSong={toggleSong}
                    />
                  }
                />
                <Route
                  path="/room15"
                  element={
                    <Room15
                      updateItem={updateItem}
                      roomEvaluateDetails={roomEvaluateDetails}
                      action={action}
                      selectedItemInfoForAction={selectedItemInfoForAction}
                      updateCurrentRoom={updateCurrentRoom}
                      updateLocationsVisited={updateLocationsVisited}
                      roomItemsCollected={roomItemsCollected}
                      sidebarItemTriggeredEvents={sidebarItemTriggeredEvents} //!NOT NEEDED IN ROOMS WITHOUT CHARACTERS (I THINK)
                      toggleSong={toggleSong}
                    />
                  }
                />
              </Routes>
              <Inventory
                playerInventory={playerInventory}
                inventoryItemClicked={inventoryItemClicked}
              />
            </div>
            <div className="bottom-flex">
              <Map
                roomMapDetails={roomMapDetails}
                updateCurrentRoom={updateCurrentRoom}
              />
              <Actions
                updatePlayerAction={updatePlayerAction}
                roomEvaluateDetails={roomEvaluateDetails.room}
                // toggleClicked={toggleClicked}
              />
            </div>
          </MemoryRouter>
        ) : (
          <>
            <div className="title">Leaving Richard's Valley</div>
            <div className="title-page-flex">
              <SavedGamesList
                userGames={userGames}
                loginPastUser={loginPastUser}
              />
              <Login
                signupUser={signupUser}
                userId={userId}
                startingRoom={startingRoom}
              />
            </div>
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
