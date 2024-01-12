import { createSlice } from '@reduxjs/toolkit';

export const spinnerSlice = createSlice({
   name: 'spinner',
   initialState: {
    visible: false,
    text: ""
   },
   reducers: {
      show: (state, action) => {
         state.visible = true
         state.text = action?.payload || ""
      },
      hide: (state) => {
        state.visible = false
        state.text = ""
      },
   },
});

export const { show, hide } = spinnerSlice.actions;

export default spinnerSlice.reducer;