import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosResponse } from "axios";
import {
  calculateDistance,
  calculateDistanceScore,
  calculateYearsDifference,
  calculateYearsScore,
} from "../components/utils/gameUtils";

interface AnswersSlice {
  value: CompleteAnswer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  finished: boolean;
}

const initialState: AnswersSlice = {
  value: [],
  status: "idle",
  error: null,
  finished: false,
};

export const addAnswer = createAsyncThunk<CompleteAnswer, UserAnswer>(
  "answers/addAnswerById",
  async (payload: UserAnswer) => {
    const response: AxiosResponse<GameAnswer> = await axios.get(
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
      description: gameAnswer.description,
      license: gameAnswer.license,
    };

    return completeAnswer;
  }
);

export const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    resetAnswers: () => initialState,
    finishGame: (state) => ({ ...state, finished: true }),
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

export const { resetAnswers, finishGame } = answersSlice.actions;

export default answersSlice.reducer;

export const selectTotalScore = (state: RootState) => {
  let total = 0;
  state.answers.value.forEach((answer) => {
    total = total + answer.yearScore + answer.distanceScore;
  });
  return total;
};
