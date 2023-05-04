import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { useAppSelector } from "../components/utils/reduxHooks";

interface GameSlice {
  questions: Question[];
  answers: Answer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  gameStarted: boolean;
  error: string | null;
}

const initialState: GameSlice = {
  questions: [
    { id: "1", src: "one" },
    { id: "2", src: "two" },
    { id: "3", src: "three" },
    { id: "4", src: "four" },
    { id: "5", src: "five" },
  ],
  answers: [],
  status: "idle",
  error: null,
  gameStarted: false,
};

export const fetchQuestions = createAsyncThunk(
  "game/fetchQuestions",
  async () => {
    const response = await axios.get("/api/questions");
    return response.data;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: () => initialState,
    addAnswer: (state, action: PayloadAction<Answer>) => {
      if (state.answers.length < 5) {
        state.answers.push(action.payload);
      }
    },
    startGame: (state) => ({ ...state, gameStarted: true }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = state.questions.concat(action.payload);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
          ? action.error.message
          : "Something went wrong";
      });
  },
});

export const { reset, addAnswer, startGame } = gameSlice.actions;

export default gameSlice.reducer;

export const selectQuestionById = (state: RootState, index: number) =>
  state.game.questions[index];

export const selectCurrentQuestionNumber = (state: RootState) =>
  state.game.answers.length;

export const selectCurrentQuestion = (state: RootState) => {
  return state.game.questions[state.game.answers.length];
};
