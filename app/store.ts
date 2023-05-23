import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./components/modals/modalSlice";
import answersReducer from "./game/answersSlice";
import queestionsReducer from "./game/questionsSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    answers: answersReducer,
    questions: queestionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
