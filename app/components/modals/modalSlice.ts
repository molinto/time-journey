import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalOptions = "login" | "register" | "none";

interface ModalSlice {
  value: ModalOptions;
}

const initialState: ModalSlice = {
  value: "none",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<ModalOptions>) => ({
      ...state,
      value: action.payload,
    }),
    close: (state) => ({ ...state, value: "none" }),
  },
});

export const { close, open } = modalSlice.actions;

export default modalSlice.reducer;
