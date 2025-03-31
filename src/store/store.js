
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import eventReducer from "../features/event/event.slice";
import seatReducer from "../features/seat/seat.slice";
import chatReducer from "../features/chat/chat.slice";
import messageReducer from "../features/message/message.slice";



import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistAuthUserConfig = {
  key: "current-user",
  storage,
};

export const persistedAuthReducer = persistReducer(
  persistAuthUserConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    event:eventReducer,
    seat: seatReducer,
    chat:chatReducer,
    message :messageReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
