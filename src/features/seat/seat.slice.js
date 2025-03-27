"use client";
import { createSlice } from "@reduxjs/toolkit";
import {  } from "./seat.action";


import { enqueueSnackbar } from "notistack";




const initialState = {
  count: null,
  isLoading: false,
  error: null,
};

export const authUserSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        enqueueSnackbar(action.payload.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        Cookies.set("jwt", action.payload.user.token, {
          expires: 7,
          secure: true,
        });
        state.isLoading = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        enqueueSnackbar(action.payload.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeError, logout } = authUserSlice.actions;

export default authUserSlice.reducer;
