import {
countAllocatedSeats,
allocateSeats 
} from "../../services/seat.service";
import {
  LIST_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  CREATE_EVENT,
  LIST_ADMIN_EVENT,
  LIST_PENDING_EVENT,
} from "./event.type";

export const allocateSeats = createAsyncThunk(
  LIST_PENDING_EVENT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await listPendingEventService(payload);
      const data = response.data;
      console.log("res data", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  CREATE_EVENT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createEventService(payload);
      const data = response.data;
      console.log("res data", data);
      return data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
