import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { AxiosResponse } from "axios";
import {
  calculateDistance,
  calculateDistanceScore,
  calculateYearsDifference,
  calculateYearsScore,
} from "../components/utils/gameUtils";

interface QuestionsSlice {
  value: GameQuestion[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuestionsSlice = {
  value: [],
  status: "idle",
  error: null,
};

export const fetchQuestions = createAsyncThunk<GameQuestion[]>(
  "game/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/questions");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const questionsSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: () => initialState,
    // startGame: (state) => ({ ...state, gameStarted: true }),
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = state.value.concat(action.payload);
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload && typeof action.payload === "string"
            ? action.payload
            : action.error.message
            ? action.error.message
            : "Something went wrong";
      });
  },
});

export const { reset } = questionsSlice.actions;

export default questionsSlice.reducer;
