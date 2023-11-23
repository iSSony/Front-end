// Imports
import { combineReducers } from "@reduxjs/toolkit";
import { reducer } from "./rootReducer";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart"],
};

export const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducer)
);

export const serializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
};
