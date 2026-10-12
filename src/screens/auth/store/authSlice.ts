import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface AuthInterface {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthInterface = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionSet(
      state,
      action: PayloadAction<{ accessToken: string | null; refreshToken: string | null }>,
    ) {
      const { accessToken, refreshToken } = action.payload;
      ((state.accessToken = accessToken), (state.refreshToken = refreshToken));
    },
    sessionCleared: () => initialState,
  },
});

export const { sessionSet, sessionCleared } = authSlice.actions;
export default authSlice.reducer;
type WithAuth = { auth: AuthInterface };
export const selectAccessToken = (s: WithAuth) => s.auth.accessToken;

export const selectIsAuthenticated = (s: WithAuth) => !!s.auth.accessToken;
