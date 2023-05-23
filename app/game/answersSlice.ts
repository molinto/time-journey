import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosResponse } from "axios";
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

interface AnswersSlice {
  value: CompleteAnswer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  score: number;
}

const initialState: AnswersSlice = {
  value: [],
  status: "idle",
  error: null,
  score: 0,
};

export const addAnswer = createAsyncThunk<CompleteAnswer, Answer>(
  "game/addAnswerById",
  async (payload: Answer) => {
    const response: AxiosResponse<Answer> = await axios.get(
      `/api/answers/${payload.id}`
    );

    const gameAnswer = response.data;
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
    startGame: (state) => ({ ...state, gameStarted: true }),
    addScore: (state, action: PayloadAction<number>) => ({
      ...state,
      score: state.score + action.payload,
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(addAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.value.find((answer) => answer.id === action.payload.id))
          return;
        state.value = state.value.concat(action.payload);
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

export const selectTotalScore = (state: RootState) => {
  let total = 0;
  state.answers.value.forEach((answer) => {
    total = total + answer.yearScore + answer.distanceScore;
  });
  return total;
};
