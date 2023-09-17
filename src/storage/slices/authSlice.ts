import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { userApiInstance } from "../../services/userApi";
import { decodeUser } from "../../services/jwtTokenService";

interface UserJWT {
  user_id: number;
  username: string;
  iat: number;
  exp: number;
}

interface AuthState {
  user: UserJWT | null;
  isLoading: boolean;
  status: string;
  message: string | null;
  isRegisterPass: boolean;
  isSignInPass: boolean;
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: localStorage.getItem("refresh_token") ? decodeUser(localStorage.getItem("refresh_token")) : null,
  isLoading: false,
  status: "",
  message: "",
  isRegisterPass: false,
  isSignInPass: false,
  isAuth: false,
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await userApiInstance.post(`/register`, userData);
      return res.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await userApiInstance.post(`/sign-in`, userData);
      return res.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAuthentication = createAsyncThunk(
  "user/getAuthentication",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Token not found");
      }

      const res = await userApiInstance.post(
        `/authentication`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRefreshToken = createAsyncThunk(
  "user/getRefreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("refresh_token");
      if (!token) {
        throw new Error("Token not found");
      }

      const res = await userApiInstance.post(
        `/refresh_token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err:any) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      state.user = null;
      state.isLoading = false;
      state.status = "";
      state.message = "";
      state.isRegisterPass = false;
      state.isSignInPass = false;
    },
    updateToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearIsRegisterPassState: (state) => {
      state.isRegisterPass = false;
      state.message = "";
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
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isSignInPass = action.payload.is_sign_in_pass;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        state.user = decodeUser(action.payload.refresh_token);
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isSignInPass = action.payload.is_sign_in_pass;
      })
      .addCase(getAuthentication.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isAuth = action.payload.is_auth;
      })
      .addCase(getAuthentication.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.isAuth = action.payload.is_auth;
      })
      .addCase(getRefreshToken.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getRefreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
      })
      .addCase(getRefreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.msg;
      });
  },
});

export const { loginSuccess, logout, clearIsRegisterPassState, updateToken } = authSlice.actions;
export default authSlice.reducer;
