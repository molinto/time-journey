import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./components/modals/modalSlice";
import gameReducer from "./game/gameSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
