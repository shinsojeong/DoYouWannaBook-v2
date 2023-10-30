import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import admin from "./admin";
import chat from "./chat";
import libBook from "./libBook";
import topBar from "./topBar";
import user from "./user";
import userBook from "./userBook";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  admin,
  chat,
  libBook,
  topBar,
  user,
  userBook,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
