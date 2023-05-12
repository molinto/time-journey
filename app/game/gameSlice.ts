import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface GameSlice {
  questions: GameQuestion[];
  userAnwers: Answer[];
  rightAnswers: Answer[];
  scores: Score[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GameSlice = {
  questions: [],
  userAnwers: [],
  rightAnswers: [],
  scores: [],
  status: "idle",
  error: null,
};

export const fetchQuestions = createAsyncThunk<GameQuestion[]>(
  "game/fetchQuestions",
  async () => {
    const response = await axios.get("/api/questions");
    return response.data;
  }
);
export const fetchAnswerById = createAsyncThunk<Answer, string>(
  "game/fetchAnswerById",
  async (id: string) => {
    const response = await axios.get(`/api/answers/${id}`);
    return response.data;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: () => initialState,
    addAnswer: (state, action: PayloadAction<Answer>) => {
      if (state.userAnwers.find((answer) => answer.id === action.payload.id)) {
        return;
      }
      state.userAnwers.push(action.payload);
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
      })
      .addCase(fetchAnswerById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAnswerById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        if (
          state.rightAnswers.find((answer) => answer.id === payload.id) !==
          undefined
        ) {
          return;
        }
        state.rightAnswers = state.rightAnswers.concat(payload);
      })
      .addCase(fetchAnswerById.rejected, (state, action) => {
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
  state.game.userAnwers.length;
