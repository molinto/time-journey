import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalOptions = "login" | "register" | "none";
// Define a type for the slice state

interface ModalSlice {
  value: ModalOptions;
}

// Define the initial state using that type
const initialState: ModalSlice = {
  value: "none",
};

export const modalSlice = createSlice({
  name: "loginModal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalOptions>) => {
      state.value = action.payload;
    },
    close: () => initialState,
  },
});

export const { close, open } = modalSlice.actions;

export default modalSlice.reducer;
