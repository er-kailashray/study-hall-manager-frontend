import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  tokenType: string | null;
  expiresIn: number | null;
}

const initialState: AuthState = {
  user: null,
  tokenType: null,
  expiresIn: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; tokenType: string; expiresIn: number }>
    ) => {
      state.user = action.payload.user;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
    },
    logout: (state) => {
      state.user = null;
      state.tokenType = null;
      state.expiresIn = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
