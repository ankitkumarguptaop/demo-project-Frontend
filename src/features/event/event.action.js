import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 createEventService, listEventService ,deleteEventService ,updateEventService
} from "../../services/event.service";
import { LIST_EVENT ,DELETE_EVENT,UPDATE_EVENT,CREATE_EVENT } from "./event.type";

export const listEvent = createAsyncThunk(LIST_EVENT, async (payload , { rejectWithValue }) => {
  try {
  const response = await listEventService(payload);
  const data = response.data;
  console.log("res data", data);
  return data;
  }
  catch(error){
    console.log(error)
    return rejectWithValue(error.response.data)
  }
});

export const createEvent = createAsyncThunk(CREATE_EVENT, async (payload , { rejectWithValue }) => {
  try {
  const response = await createEventService(payload);
  const data = response.data;
  console.log("res data", data);
  return data;
  }
  catch(error){
    console.log(error.response.data)
    return rejectWithValue(error.response.data)
  }
});


export const deleteEvent = createAsyncThunk(DELETE_EVENT, async (payload , { rejectWithValue }) => {
    try {
    const response = await deleteEventService(payload);
    const data = response.data;
    console.log("res data", data);
    return data;
    }
    catch(error){
      console.log(error)
      return rejectWithValue(error.response.data)
    }
  });
  
  export const updateEvent = createAsyncThunk(UPDATE_EVENT, async (payload , { rejectWithValue }) => {
    try {
    const response = await updateEventService(payload);
    const data = response.data;
    console.log("res data", data);
    return data;
    }
    catch(error){
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  });