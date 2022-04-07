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
      { roomNum: "", route: "", position: "" },
      { roomNum: "9", route: "/room9", position: "left" },
      { roomNum: "12", route: "/room12", position: "right" },
      { roomNum: "13", route: "/room13", position: "bottom" },
    ],
  },
  {
    currentRoom: 12,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "11", route: "/room11", position: "left" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 13,
    mapCoordinates: [
      { roomNum: "11", route: "/room11", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "14", route: "/room14", position: "bottom" },
    ],
  },
  {
    currentRoom: 14,
    mapCoordinates: [
      { roomNum: "13", route: "/room13", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
];

//room item info (should also be in another file), added to state when entering a new room
let roomEvaluateInfo = [
  {
    room: 1,
    visited: false,
    itemsCollected: [],
    entryScript: "Richard's Valley is a one of a kind place!",
    reentryScript: "",
    images: [],
    items: [],
  },
  {
    room: 2,
    visited: false,
    itemsCollected: [],
    entryScript:
      "Yes, life here is great, but only because we residents of the valley know how to protect ourselves from the dangers of the outside world.",
    reentryScript: "",
    items: [],
  },
  {
    room: 3,
    visited: false,
    itemsCollected: [],
    entryScript:
      "Take our water for example.  As it is well known that those in the city are constantly exposed to dangerous toxins, we make sure to filter all of our water through special stones.",
    reentryScript: "",
    items: [],
  },
  {
    room: 4,
    visited: false,
    itemsCollected: [],
    entryScript:
      "Lyle...?!! Are you not feeling well? Have you drunk enough water today.",
    reentryScript: "",
    items: [],
  },
  {
    room: 5,
    visited: false,
    itemsCollected: [],
    entryScript:
      "Shocked to see their friend so ill, two friends, Neville and Omar decide to help.",
    reentryScript: "",
    items: [],
  },
  {
    room: 6,
    visited: false,
    itemsCollected: [],
    entryScript: `"Let's see if we can't find Ellie.  Her sister sometimes helps Richard make medicine for sick animals."`,
    reentryScript: "",
    items: [],
  },
  {
    room: 7,
    visited: false,
    itemsCollected: [],
    entryScript: "",
    reentryScript: "",
    items: [],
  },
  {
    room: 8,
    visited: false,
    itemsCollected: [],
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
    itemsCollected: [],
    entryScript: "It is a damp clearing, strewn with aquatic plants",
    reentryScript: "This place looks familiar",
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
    itemsCollected: [],
    entryScript: `You see what appears to be a snake surrounded by underbrush`,
    reentryScript: "Ah yes, there's Mark",
    images: [{ file: "room10a", itemsCollected: [] }],
    items: [
      {
        name: "Mark",
        present: true,
        Look: {
          text: `"I know him, isn't that Caroline's friend Mark.  He appears to be crying.`,
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "You seem to be wasting your time",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "You greet the snake, but he does not answer",
          effect: "",
        },
      },
      {
        name: "Flower",
        present: true,
        Look: {
          text: "it is one of the large, beautiful flowers commonly seen in the valley this time of year.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "It's too pretty to take, and you have never seen this used in any medicine before.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 11,
    visited: false,
    itemsCollected: [],
    entryScript:
      "It is a slightly more rocky area, though still obviously low lying.",
    reentryScript: "this looks familiar",
    images: [{ file: "room11", itemsCollected: [] }],
    items: [
      {
        name: "Shallow Puddle",
        present: true,
        Look: {
          text: "One of the many pocket sized puddles in the area",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "Better leave this alone, it is un-purified after all.",
          effect: "",
        },
        Take: {
          text: "not possible, unfortunately.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "you seem to be wasting your time.", effect: "" },
      },
      {
        name: "Tall Reed",
        present: true,
        Look: {
          text: "These reeds are everywhere.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "No sense in taking this, it is not used for medicine as far as you know.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 12,
    visited: false,
    itemsCollected: [],
    entryScript: "A squirrel is gathering nuts in a tin pail.",
    reentryScript: "There's Ellie!",
    images: [
      { file: "room12a", itemsCollected: [] },
      { file: "room12b", itemsCollected: [] },
      { file: "room12c", itemsCollected: ["Acorns"] },
    ],
    character: {
      characterName: "Ellie",
      item: "Leaf",
      active: true,
      script:
        "Oh thanks, I was just looking for one of these!  You know what, my sister Julianne Napkin is a real whiz at making medicine.  But you might want to give her a present first, she is very moody.  Oh, and take some acorns, on me.",
    },
    items: [
      {
        name: "Ellie",
        present: true,
        Look: {
          text: "A mutual friend, Ellie the squirrel, is busy at work gathering food for the winter.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "I am not sure what you are trying to pull, but it won't work.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"Hi Ellie, did you hear?  Lyle is terribly ill.  We would like to make some forest medicine to treat him.  Could you help us?"`,
          effect: "",
        },
      },
      {
        name: "Acorns",
        present: true,
        Look: {
          text: "Hmm, acorns. These are sometimes used in medicine.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "These are not your's so best ask first...",
          effect: "",
        },
        Take: {
          text: "Best ask Ellie first...",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "",
          effect: "",
        },
      },
    ],
  },
  {
    room: 13,
    visited: false,
    itemsCollected: [],
    entryScript: "It is a rocky field, uphill from the pond.",
    reentryScript: `"it is quite barren over here.`,
    images: [
      { file: "room13a", itemsCollected: [] },
      { file: "room13b", itemsCollected: ["Pebble"] },
    ],
    character: {
      characterName: "Ellie",
      item: "Leaf",
      active: true,
      script:
        "Oh thanks, I was just looking for one of these!  You know what, my sister Julianne Napkin is a real whiz at making medicine.  But you might want to give her a present first, she is very moody.  Oh, and take some acorns, on me.",
    },
    items: [
      {
        name: "Boulder",
        present: true,
        Look: {
          text: "It is a large boulder.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "You see no use for this, otherwise it would be impossible to move.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"keep it together, your talking to a rock.`,
          effect: "",
        },
      },
      {
        name: "Pebble",
        present: true,
        Look: {
          text: "A small round stone.  This would look nice on your windowsill you think to yourself.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "You have taken the pebble",
          effect: "",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "",
          effect: "",
        },
      },
    ],
  },
  {
    room: 14,
    visited: false,
    itemsCollected: [],
    entryScript: "A mostly barren hilltop, with stacked stones.",
    reentryScript: `"this place gives me the creeps."`,
    images: [{ file: "room14", itemsCollected: [] }],
    character: {
      characterName: "Ellie",
      item: "Leaf",
      active: true,
      script:
        "Oh thanks, I was just looking for one of these!  You know what, my sister Julianne Napkin is a real whiz at making medicine.  But you might want to give her a present first, she is very moody.  Oh, and take some acorns, on me.",
    },
    items: [
      {
        name: "Boulder",
        present: true,
        Look: {
          text: "It is a large boulder.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: { text: "", effect: "" },
        Take: {
          text: "You see no use for this, otherwise it would be impossible to move.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"keep it together, your talking to a rock.`,
          effect: "",
        },
      },
      {
        name: "Pebble",
        present: true,
        Look: {
          text: "A small round stone.  This would look nice on your windowsill you think to yourself.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "You have taken the pebble",
          effect: "",
          canTake: true,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "",
          effect: "",
        },
      },
    ],
  },
];

export { roomMap, roomEvaluateInfo };
