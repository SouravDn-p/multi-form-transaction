import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/authType";

const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("chris-token") : null;
const savedUser =
  typeof window !== "undefined" ? localStorage.getItem("chris-user") : null;
interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: savedToken,
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
