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
      { roomNum: 7, route: "/room7", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 7,
    mapCoordinates: [
      { roomNum: 8, route: "/room8", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 6, route: "/room6", position: "bottom" },
    ],
  },
  {
    currentRoom: 8,
    mapCoordinates: [
      { roomNum: 9, route: "/room9", position: "top" },
      { roomNum: 10, route: "/room10", position: "right" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 7, route: "/room7", position: "bottom" },
    ],
  },
  {
    currentRoom: 9,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 8, route: "/room8", position: "bottom" },
    ],
  },
  {
    currentRoom: 10,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: 8, route: "/room8", position: "left" },
      { roomNum: 11, route: "/room11", position: "right" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 11,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: 10, route: "/room10", position: "left" },
      { roomNum: 12, route: "/room12", position: "right" },
      { roomNum: 13, route: "/room13", position: "bottom" },
    ],
  },
  {
    currentRoom: 12,
    mapCoordinates: [
      { roomNum: "", route: "", position: "" },
      { roomNum: 11, route: "/room11", position: "left" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
    ],
  },
  {
    currentRoom: 13,
    mapCoordinates: [
      { roomNum: 11, route: "/room11", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 14, route: "/room14", position: "bottom" },
    ],
  },
  {
    currentRoom: 14,
    mapCoordinates: [
      { roomNum: 13, route: "/room13", position: "top" },
      { roomNum: "", route: "", position: "" },
      { roomNum: "", route: "", position: "" },
      { roomNum: 15, route: "/room15", position: "bottom" },
    ],
  },
  {
    currentRoom: 15,
    mapCoordinates: [
      { roomNum: 14, route: "/room14", position: "top" },
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
      "Yes, life here is great. But only because we residents of the valley know how to protect ourselves from the dangers of the outside world.",
    reentryScript: "",
    items: [],
  },
  {
    room: 3,
    visited: false,
    itemsCollected: [],
    entryScript:
      "Take our water for example.  As it is common knowledge that dangerous toxins can be anywhere, we filter all of our water through special stones.",
    reentryScript: "",
    items: [],
  },
  {
    room: 4,
    visited: false,
    itemsCollected: [],
    entryScript:
      "Lyle...?!! Are you not feeling well? Have you drank enough water today.",
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
    entryScript: `"Let's see if we can't find Ellie.  Her sister sometimes helps Richard make medicine."`,
    reentryScript: "Lyle is in bad shape, best find help soon.",
    images: [{ file: "room6", itemsCollected: [] }],
    items: [
      {
        name: "Lyle",
        present: true,
        Look: {
          text: "He looks visibly ill.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "He is too heavy to carry.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "Lyle is unable to speak.", effect: "" },
      },
      {
        name: "Flower",
        present: true,
        Look: {
          text: "One of the many wildflowers currently in bloom.  This one is red.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "Better leave this here, until we learn more about which plants can be used to make medicine.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 7,
    visited: false,
    itemsCollected: [],
    entryScript:
      "The area is lush with aquatic plants, there may be a stream nearby.",
    reentryScript: "This place looks familiar.",
    images: [{ file: "room8", itemsCollected: [] }],
    items: [
      {
        name: "Small Reeds",
        present: true,
        Look: {
          text: "A clump of small reeds.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "Best avoid any plants growing near the water.",
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
          text: "A smooth, circular stone.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: `"This would just weight me down."`,
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
    ],
  },
  {
    room: 8,
    visited: false,
    itemsCollected: [],
    entryScript: "It is a damp and overgrown stream bed",
    reentryScript:
      "You can feel the moisture in the air, there is water nearby.",
    images: [
      { file: "room8a", itemsCollected: [] },
      { file: "room8b", itemsCollected: ["Leaf"] },
    ],
    items: [
      {
        name: "Leaf",
        present: true,
        Look: { text: "A leaf of shimmering green and gold.", effect: "" },
        Open: { text: "", effect: "" },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "You have taken the leaf",
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
          text: "A shallow pool of water.",
          effect: "",
        },
        Open: { text: "", effect: "" },
        Use: {
          text: "Best look elsewhere for clean drinking water.",
          effect: "",
        },
        Take: {
          text: "Better not touch it, un-purified water after all.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "", effect: "" },
      },
      {
        name: "Tall Reeds",
        present: true,
        Look: {
          text: "Tall green reeds. These are abundant here.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "Better leave these alone.",
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
    entryScript: `Lush greenery surrounds what appears to be a small snake.`,
    reentryScript: "Ah yes, there's Mark",
    images: [{ file: "room9", itemsCollected: [] }],
    items: [
      {
        name: "Mark",
        present: true,
        Look: {
          text: `"Hey, isn't that Caroline's friend Mark.  Is he crying...?`,
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "Now that would not be very nice of you.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"Hi Mark!"... Mark does not answer.`,
          effect: "",
        },
      },
      {
        name: "Stone",
        present: true,
        Look: {
          text: "A stone partially submerged in water.",
          effect: "",
        },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "It is too dirty to be worth taking.",
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
    entryScript:
      "A slightly higher, and more rocky area further from the stream.",
    reentryScript: "I remember this spot.",
    images: [{ file: "room10", itemsCollected: [] }],
    items: [
      {
        name: "Shallow Puddle",
        present: true,
        Look: {
          text: "A small puddle. These are somewhat less common over here.",
          effect: "",
        },
        Use: {
          text: "Best not touch it, even if you are thirsty.",
          effect: "",
        },
        Take: {
          text: "Not possible, unfortunately.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: { text: "You seem to be wasting your time.", effect: "" },
      },
      {
        name: "Tall Reeds",
        present: true,
        Look: {
          text: "Tall, slightly yellowish reeds. ",
          effect: "",
        },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "No sense in taking these, what would you do with them?",
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
    entryScript: "A crowded area with many large stones.",
    reentryScript: "Whew..!  It's hard to get through here.",
    images: [{ file: "room11", itemsCollected: [] }],
    items: [
      {
        name: "Purple Reeds",
        present: true,
        Look: {
          text: "Reeds of brilliant purple.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "Brightly colored plants are sometimes poisonous, better not take the chance.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "",
          effect: "",
        },
      },
      {
        name: "Stacked Rocks",
        present: true,
        Look: {
          text: "A stack of large stones.  Why would someone have made this?",
          effect: "",
        },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "These are much too large to take.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "Ouch...! that hurt.", effect: "" },
        Speak: {
          text: "",
          effect: "",
        },
      },
    ],
  },
  {
    room: 12,
    visited: false,
    itemsCollected: [],
    entryScript:
      "A rock wall lies just beyond a small clearing. A squirrel is busy at work.",
    reentryScript: `"There you are!"`,
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
        "Thanks! You know my sister Julianne Napkin knows a great deal about forest medicine, perhaps she might be able to help.",
    },
    items: [
      {
        name: "Ellie",
        present: true,
        Look: {
          text: "A mutual friend, Ellie is collecting acorns into a tin can.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: `"I am not sure what you are trying to pull, but it won't work!"`,
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"Hi Ellie, have you heard..!?  Lyle is terribly ill. Could you please help us?"`,
          effect: "",
        },
      },
      {
        name: "Acorns",
        present: true,
        Look: {
          text: `"An assortment of acorns. "These are sometimes used in medicine..."`,
          effect: "",
        },
        Use: {
          text: "Better ask.",
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
    entryScript: "It is a rocky area with few plants.",
    reentryScript: `"It is quite barren over here.`,
    images: [
      { file: "room13a", itemsCollected: [] },
      { file: "room13b", itemsCollected: ["Pebble"] },
    ],
    items: [
      {
        name: "Boulder",
        present: true,
        Look: {
          text: "A large boulder.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "It is impossible to move.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"Keep it together, your talking to a rock.`,
          effect: "",
        },
      },
      {
        name: "Pebble",
        present: true,
        Look: {
          text: "A small polished stone.  This would look nice on your windowsill you think to yourself.",
          effect: "",
        },
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
    entryScript: "A rocky hilltop scattered with stones.",
    reentryScript: `"this place gives me the creeps."`,
    images: [{ file: "room14", itemsCollected: [] }],
    items: [
      {
        name: "Rock Statue",
        present: true,
        Look: {
          text: "One of several stacks of stones.  They resemble little people.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "Whoever made these would not appreciate it.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "You seem to be wasting your time.",
          effect: "",
        },
      },
      {
        name: "Leaf",
        present: true,
        Look: {
          text: "A fresh green leaf.",
          effect: "",
        },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "You are afraid to come any closer.",
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
    room: 15,
    visited: false,
    itemsCollected: [],
    entryScript: "A clearing has been made opposite a tall stack of stones.",
    reentryScript: "Julianne is still fast asleep.",
    images: [
      { file: "room15a", itemsCollected: [] },
      { file: "room15b", itemsCollected: [] },
    ],
    character: {
      characterName: "Julianne Napkin",
      item: "Acorns",
      active: true,
      script:
        "Yes, yes... This is a good start.  If only we had some mushrooms.",
    },
    items: [
      {
        name: "Julianne Napkin",
        present: true,
        Look: {
          text: "Ellie's sister is sleeping.",
          effect: "",
        },
        Use: { text: "", effect: "" },
        Take: {
          text: "You are wasting your time.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: `"Ahem... Julianne...?  It is Neville and Omar... Our friend Lyle is terribly ill, won't you help us?"`,
          effect: "",
        },
      },
      {
        name: "Forest Dweller",
        present: true,
        Look: {
          text: "A worm of some kind.  You, don't know its name.",
          effect: "",
        },
        Use: {
          text: "",
          effect: "",
        },
        Take: {
          text: "He would not like that.",
          effect: "",
          canTake: false,
        },
        Hit: { text: "", effect: "" },
        Speak: {
          text: "The worm seems preoccupied.",
          effect: "",
        },
      },
    ],
  },
];

export { roomMap, roomEvaluateInfo };
