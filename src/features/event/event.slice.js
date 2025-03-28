"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  listEvent,
  deleteEvent,
  updateEvent,
  createEvent,
  listAdminEvent,
  listAllEvent
  
} from "./event.action";

import { enqueueSnackbar } from "notistack";

const initialState = {
  events: [],
  adminEvents: [],
  pendingEvents: [],
  isLoading: false,
  error: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listEvent.fulfilled, (state, action) => {
        state.events = action.payload.event;
        state.isLoading = false;
      })
      .addCase(listEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listAdminEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAdminEvent.fulfilled, (state, action) => {
        state.adminEvents = action.payload.event;
        state.isLoading = false;
      })
      .addCase(listAdminEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(listAllEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAllEvent.fulfilled, (state, action) => {
        state.pendingEvents = action.payload.event;
        state.isLoading = false;
      })
      .addCase(listAllEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.isLoading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.adminEvents = {
          count: state.adminEvents.count + 1,
          rows: [...state.adminEvents.rows, action.payload.event],
        };
        state.isLoading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = eventSlice.actions;

export default eventSlice.reducer;
