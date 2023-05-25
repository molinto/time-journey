import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./components/modals/modalSlice";
import answersReducer from "./game/answersSlice";
import questionsReducer from "./game/questionsSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    answers: answersReducer,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
