import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userApiInstance } from "../../services/userApi";
import { decodeUser } from "../../services/jwtTokenService";

type UserJWT = {
  user_id: number;
  username: string;
  iat: number;
  exp: number;
};

type AuthState = {
  user: UserJWT | null; // Replace 'any' with the actual type of your user data
  isLoading: boolean;
  status: string;
  message: string | null;
  isRegisterPass: boolean;
  isSignInPass: boolean;
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  user: localStorage.getItem("refresh_token")
    ? decodeUser(localStorage.getItem("refresh_token") || "")
    : null,
  isLoading: false,
  status: "",
  message: null,
  isRegisterPass: false,
  isSignInPass: false,
  isAuth: false,
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
};

export const registerUser = createAsyncThunk<
  any, // Replace 'any' with the actual return type of your API response
  any, // Replace 'any' with the actual type of your userData
  { rejectValue: any }
>("user/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const res = await userApiInstance.post(`/register`, userData);
    return res.data;
  } catch (err:any) {
    return rejectWithValue(err.response.data);
  }
});

// Define other async thunks similarly

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
    },
    logout: (state) => {
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      // Reset other state properties as needed
    },
    updateToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearIsRegisterPassState: (state) => {
      state.isRegisterPass = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isRegisterPass = action.payload.isRegisterPass;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isRegisterPass = action.payload.isRegisterPass;
      });

    // Define extra reducers for other async thunks similarly
  },
});

export const { loginSuccess, logout, clearIsRegisterPassState, updateToken } =
  authSlice.actions;
export default authSlice.reducer;
