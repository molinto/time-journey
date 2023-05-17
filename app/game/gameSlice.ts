import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import {
  calculateDistance,
  calculateDistanceScore,
  calculateYearsDifference,
  calculateYearsScore,
} from "../components/utils/gameUtils";

interface CompleteAnswer {
  id: string;
  userYear: number;
  gameYear: number;
  userLocation: Coordinates;
  gameLocation: Coordinates;
  distance: number;
  yearDifference: number;
  distanceScore: number;
  yearScore: number;
}

interface GameSlice {
  questions: GameQuestion[];
  answers: CompleteAnswer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  score: number;
}

const initialState: GameSlice = {
  questions: [],
  answers: [],
  status: "idle",
  error: null,
  score: 0,
};

export const fetchQuestions = createAsyncThunk<GameQuestion[]>(
  "game/fetchQuestions",
  async () => {
    const response = await axios.get("/api/questions");
    return response.data;
  }
);
export const addAnswer = createAsyncThunk<CompleteAnswer, Answer>(
  "game/addAnswerById",
  async (payload: Answer) => {
    const response = await axios.get(`/api/answers/${payload.id}`);
    const gameAnswer = response.data as Answer;
    const distance = calculateDistance(
      payload.coordinates,
      gameAnswer.coordinates
    );
    const yearsDifference = calculateYearsDifference(
      gameAnswer.year,
      payload.year
    );

    const completeAnswer: CompleteAnswer = {
      id: payload.id,
      userYear: payload.year,
      gameYear: gameAnswer.year,
      userLocation: payload.coordinates,
      gameLocation: gameAnswer.coordinates,
      distance: distance,
      yearDifference: yearsDifference,
      distanceScore: calculateDistanceScore(distance),
      yearScore: calculateYearsScore(yearsDifference),
    };

    return completeAnswer;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: () => initialState,
    // addUserAnswer: (state, action: PayloadAction<Answer>) => {
    //   if (state.userAnwers.find((answer) => answer.id === action.payload.id)) {
    //     return;
    //   }
    //   state.userAnwers.push(action.payload);
    // },
    startGame: (state) => ({ ...state, gameStarted: true }),
    addScore: (state, action: PayloadAction<number>) => ({
      ...state,
      score: state.score + action.payload,
    }),
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
      .addCase(addAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.answers.find((answer) => answer.id === action.payload.id))
          return;
        state.answers = state.answers.concat(action.payload);
      })
      .addCase(addAnswer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
          ? action.error.message
          : "Something went wrong";
      });
  },
});

export const { reset, startGame, addScore } = gameSlice.actions;

export default gameSlice.reducer;

export const selectQuestionById = (state: RootState, index: number) =>
  state.game.questions[index];

export const selectCurrentQuestionNumber = (state: RootState) =>
  state.game.answers.length;

export const selectTotalScore = (state: RootState) => {
  let total = 0;
  state.game.answers.forEach((answer) => {
    total = total + answer.yearScore + answer.distanceScore;
  });
  return total;
};
