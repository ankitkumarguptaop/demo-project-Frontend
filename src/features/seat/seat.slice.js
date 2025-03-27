"use client";
import { createSlice } from "@reduxjs/toolkit";
import {countAllocatedSeats ,allocateSeats  } from "./seat.action";


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
      .addCase(allocateSeats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allocateSeats.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(allocateSeats.rejected, (state, action) => {
        enqueueSnackbar(action.payload.message, {
          variant: "error",
          autoHideDuration: 5000,
        });
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(countAllocatedSeats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countAllocatedSeats.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.isLoading = false;
      })
      .addCase(countAllocatedSeats.rejected, (state, action) => {
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
