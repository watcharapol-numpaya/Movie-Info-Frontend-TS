import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movieSlice";
import castSlice from "./slices/castSlice";
import genreSlice from "./slices/genreSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    cast: castSlice,
    genre: genreSlice,
    user: userSlice,
    auth: authSlice,
  },
});
