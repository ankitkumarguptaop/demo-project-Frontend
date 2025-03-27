import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  countAllocatedSeatsService,
  allocateSeatsService
} from "../../services/seat.service";
import {
  ALLOCATE_SEATS
  , COUNT_ALLOCATED_SEATS
} from "./seat.type";

export const allocateSeats = createAsyncThunk(
  ALLOCATE_SEATS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await allocateSeatsService(payload);
      const data = response.data;
      console.log("res data", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const countAllocatedSeats = createAsyncThunk(
  COUNT_ALLOCATED_SEATS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await countAllocatedSeatsService(payload);
      const data = response.data;
      console.log("res data", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
