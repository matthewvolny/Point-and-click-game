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
      { roomNum: 11, route: "/room11", position: "right" },
      { roomNum: 8, route: "/room8", position: "bottom" },
    ],
  },
  {
    currentRoom: 10,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 9, route: "/room9", position: "bottom" },
    ],
  },
  {
    currentRoom: 11,
    mapCoordinates: [
      { roomNum: "", route: "", position: "top" },
      { roomNum: "9", route: "/room9", position: "left" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "bottom" },
    ],
  },
];

//room item info (should also be in another file), added to state when entering a new room
const roomEvaluateInfo = [
  {
    room: 1,
    visited: false,
    entryScript:
      "Richard's Valley is a truly wonderful place, where man and animal live in complete harmony with nature.",
    reentryScript: "",
    images: [{ file: "room1", itemsCollected: [] }],
    items: [],
  },
  {
    room: 2,
    visited: false,
    entryScript:
      "Yes, life in the valley is great, but the residents the valley are keenly aware of the dangers of the outside world.  It is a known fact for example, that city dwellers are constantly exposed to poisonous toxins.",
    reentryScript: "",
    items: [],
  },
  {
    room: 3,
    visited: false,
    entryScript:
      "For this very reason, Richard makes sure that we filter all of our water through special stones, which we also rub all over our bodies.",
    reentryScript: "",
    items: [],
  },
  {
    room: 4,
    visited: false,
    entryScript: "Lyle...! What's wrong?!?  Are you not feeling well!?!",
    reentryScript: "",
    items: [],
  },
  {
    room: 5,
    visited: false,
    entryScript: "I... I think I drank too much water.",
    reentryScript: "",
    items: [],
  },
  {
    room: 6,
    visited: false,
    entryScript:
      "Seeing their friend in such poor shape, Neville and Omar decide right then and there that they will do whatever they can to help.",
    reentryScript: "",
    items: [],
  },
  {
    room: 7,
    visited: false,
    entryScript:
      "I think that Lyle would do well to have some medicine.  Let's see what we can gather up, and then see if Ellie (the squirrel) wouldn't mind helping us prepare it.",
    reentryScript: "",
    items: [],
  },
  {
    room: 8,
    visited: false,
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
    visited: false,
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
          effect: "",
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
    room: 10,
    visited: false,
    entryScript: `A snake, "isn't his name Mark" is in a small clearing`,
    reentryScript: "Ah yes, there's Mark",
    images: [{ file: "room10a", itemsCollected: [] }],
    items: [],
  },
  {
    room: 11,
    visited: false,
    entryScript:
      "It is a slightly more rocky area, though still obviously low lying.",
    reentryScript: "Something tells me I have been here before",
    images: [{ file: "room11", itemsCollected: [] }],
    items: [],
  },
];

export { roomMap, roomEvaluateInfo };
