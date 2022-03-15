import { configureStore } from "@reduxjs/toolkit";
import gameInfoReducer from "../redux/gameInfoSlice";

export const store = configureStore({
  reducer: {
    gameInfo: gameInfoReducer,
  },
});
