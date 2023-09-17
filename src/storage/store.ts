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


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

 