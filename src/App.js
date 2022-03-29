import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

import "./App.css";

//roomMap should be in another file
const roomMap = [
  {
    currentRoom: 1,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 2,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 3,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 4,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 5,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 6,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 7,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 8,
    mapCoordinates: [
      { roomNum: 9, route: "/room9", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 9,
    mapCoordinates: [
      { roomNum: 10, route: "/room10", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 8, route: "/room8", position: "bottom" },
    ],
  },
];

//room item info (should also be in another file), added to state when entering a new room
const roomEvaluateInfo = [
  {
    room: 1,
    entryScript:
      "Richard's Valley is a truly wonderful place, where man and animal live in complete harmony with nature.",
    reentryScript: "",
    images: [{ file: "room1", itemsCollected: [] }],
    items: [],
  },
  {
    room: 2,
    entryScript:
      "Yes, life in the valley is great, but the residents the valley are keenly aware of the dangers of the outside world.  It is a known fact for example, that city dwellers are constantly exposed to poisonous toxins.",
    reentryScript: "",
    items: [],
  },
  {
    room: 3,
    entryScript:
      "For this very reason, Richard makes sure that we filter all of our water through special stones, which we also rub all over our bodies.",
    reentryScript: "",
    items: [],
  },
  {
    room: 4,
    entryScript: "Lyle...! What's wrong?!?  Are you not feeling well!?!",
    reentryScript: "",
    items: [],
  },
  {
    room: 5,
    entryScript: "I... I think I drank too much water.",
    reentryScript: "",
    items: [],
  },
  {
    room: 6,
    entryScript:
      "Seeing their friend in such poor shape, Neville and Omar decide right then and there that they will do whatever they can to help.",
    reentryScript: "",
    items: [],
  },
  {
    room: 7,
    entryScript:
      "I think that Lyle would do well to have some medicine.  Let's see what we can gather up, and then see if Ellie (the squirrel) wouldn't mind helping us prepare it.",
    reentryScript: "",
    items: [],
  },
  {
    room: 8,
    entryScript: `You enter a leaf and debris strewn area. "Boy I hope we can find something to cure Lyle, he looks pretty bad..."`,
    reentryScript: "Something tells me I have been here before",
    images: [
      { file: "room8", itemsCollected: [] },
      // { file: "room1b", itemsCollected: ["Rug"] },
      // { file: "room1c", itemsCollected: ["Lamp"] },
      // { file: "room1d", itemsCollected: ["Lamp", "Rug"] },
    ],
    items: [
      {
        name: "Plant",
        present: true,
        Look: {
          text: "it is a tall slender plant,  I have never seen these used to make medicine before",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "best leave this here",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Rock",
        present: true,
        Look: {
          text: "it is a type of stone commonly found in Richard's Valley",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "this would just weight me down",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 9,
    entryScript: "It is a damp clearing, strewn with aquatic plants",
    reentryScript: "Something tells me I have been here before",
    images: [
      { file: "room9a", itemsCollected: [] },
      { file: "room9b", itemsCollected: ["Leaf"] },
    ],
    items: [
      {
        name: "Leaf",
        present: true,
        Look: { text: "A small leaf of shimmering green and gold", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "you have taken the leaf",
          effect: "add leaf to inventory",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Shallow Pool",
        present: true,
        Look: {
          text: "a shallow pool of water, this is a low lying area after all",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "you splash some water on your face, it sure is a hot day",
          effect: "",
        },
        Take: {
          text: "you cannot take it",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Large Reed",
        present: true,
        Look: {
          text: "A cluster of reeds, these are abundant in the area",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "These are growing in un-purified water, best to leave them be",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 1,
    entryScript: "So this is Richard's Valley.  Let me find Richard",
    reentryScript: "Something tells me I have been here before",
    images: [
      { file: "room1a", itemsCollected: [] },
      { file: "room1b", itemsCollected: ["Rug"] },
      { file: "room1c", itemsCollected: ["Lamp"] },
      { file: "room1d", itemsCollected: ["Lamp", "Rug"] },
    ],
    items: [
      {
        name: "Rug",
        present: true,
        Look: { text: "it is an old rug on the floor", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "you have taken the rug",
          effect: "add rug to inventory",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Lamp",
        present: true,
        Look: { text: "it is a solid metal lamp", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "you turn the lamp on", effect: "turn on lamp function" },
        Take: {
          text: "you have taken the lamp",
          effect: "take lamp function",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 1,
    entryScript: "So this is Richard's Valley.  Let me find Richard",
    reentryScript: "Something tells me I have been here before",
    images: [
      { file: "room1a", itemsCollected: [] },
      { file: "room1b", itemsCollected: ["Rug"] },
      { file: "room1c", itemsCollected: ["Lamp"] },
      { file: "room1d", itemsCollected: ["Lamp", "Rug"] },
    ],
    items: [
      {
        name: "Rug",
        present: true,
        Look: { text: "it is an old rug on the floor", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "you have taken the rug",
          effect: "add rug to inventory",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Lamp",
        present: true,
        Look: { text: "it is a solid metal lamp", effect: "" },
        Open: { text: "", effect: "" },
        Use: { text: "you turn the lamp on", effect: "turn on lamp function" },
        Take: {
          text: "you have taken the lamp",
          effect: "take lamp function",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
];

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [action, setAction] = useState({ playerAction: "", item: "" });
  const [roomMapDetails, setRoomMapDetails] = useState({
    currentRoom: roomMap[0].currentRoom,
    currentRoomInfo: roomMap[0].mapCoordinates,
  });

  const [roomEvaluateDetails, setRoomEvaluateDetails] = useState(
    roomEvaluateInfo[0]
  );

  //retrieves stored room details from local storage on page refresh
  useEffect(() => {
    setRoomEvaluateDetails(
      JSON.parse(window.sessionStorage.getItem("roomEvaluateDetails"))
    );
    setRoomMapDetails(
      JSON.parse(window.sessionStorage.getItem("roomMapDetails"))
    );
  }, []);

  //stores room details in local storage (when it updates)
  useEffect(() => {
    window.sessionStorage.setItem(
      "roomEvaluateDetails",
      JSON.stringify(roomEvaluateDetails)
    );
  }, [roomEvaluateDetails]);

  //stores room map details in local storage (when it updates)
  useEffect(() => {
    window.sessionStorage.setItem(
      "roomMapDetails",
      JSON.stringify(roomMapDetails)
    );
  }, [roomMapDetails]);

  const [selectedItemInfo, setSelectedItemInfo] = useState();
  const [selectedItemInfoForAction, setSelectedItemInfoForAction] = useState({
    text: "",
    effect: "",
  });

  //playerInventory
  const [playerInventory, setPlayerInventory] = useState([]);

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
    const selectedRoom = roomMap.find((room) => {
      return room.currentRoom == newRoom;
    });
    setRoomMapDetails({
      currentRoom: selectedRoom.currentRoom,
      currentRoomInfo: selectedRoom.mapCoordinates,
    });
  };

  //add evaluate details object for the current room to state
  const updateRoomEvaluateDetails = (newRoom) => {
    console.log("updateRoomEvaluateDetails");
    console.log(newRoom);
    let roomInfo = roomEvaluateInfo.find((currentRoom) => {
      return currentRoom.room == newRoom;
    });
    setRoomEvaluateDetails(roomInfo);
  };

  //called from the map component, updates the room on link click, adds info to state
  const updateCurrentRoom = (newRoom) => {
    console.log("updateCurrentRoom");
    console.log(newRoom);
    setAction({ playerAction: "", item: "" });
    setSelectedItemInfo();
    setSelectedItemInfoForAction({
      text: "",
      effect: "",
    });
    updateRoomEvaluateDetails(newRoom);
    updateRoomMapDetails(newRoom);
  };

  //add room# to inventory items
  const updateInventory = (inventory) => {
    inventory.forEach((item) => {
      const keyValue = roomEvaluateDetails.room;
      setPlayerInventory([
        ...playerInventory,
        {
          item: item.item,
          room: keyValue,
        },
      ]);
    });
  };

  const loginUser = () => {
    console.log("login");
    // setUserLoggedIn(true);
  };

  return (
    <div className="container">
      {userLoggedIn ? (
        <BrowserRouter>
          <div className="top-flex">
            <Routes>
              <Route
                path="/"
                element={
                  <Room1
                    roomEvaluateDetails={roomEvaluateDetails}
                    updateCurrentRoom={updateCurrentRoom}
                  />
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
                  />
                }
              />
            </Routes>
            <Inventory
              action={action}
              selectedItemInfo={selectedItemInfo}
              selectedItemInfoForAction={selectedItemInfoForAction}
              updateInventory={updateInventory}
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
          <SavedGamesList />
          <Login loginUser={loginUser} />
        </>
      )}
    </div>
  );
}

export default App;
