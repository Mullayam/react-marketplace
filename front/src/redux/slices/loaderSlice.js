import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
export const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { setLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
