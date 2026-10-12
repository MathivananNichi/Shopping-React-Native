import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthInterface } from "../screens/auth/store/authSlice";
import { secureStorage } from "../services/storage/secureStorage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
});
const persistConfig = {
  key: "root",
  keyPrefix: "", // IMPORTANT: default prefix is "persist:" and SecureStore rejects ":" in keys
  storage: secureStorage,
  whitelist: ["auth"], // only persist the auth slice
};
export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
