import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGenres: [],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    addSelectGenre: (state, action) => {
      const genreId = action.payload;
      state.selectedGenres.push(genreId);
    },
    removeSelectGenre: (state, action) => {
      const genreId = action.payload;
      state.selectedGenres = state.selectedGenres.filter(
        (id) => id !== genreId
      );
    },
    addAllGenre: (state, action) => {
      state.selectedGenres = action.payload;
    },
    clearSelectedGenre: (state) => {
      state.selectedGenres = [];
    },
  },
});
export const {
  addSelectGenre,
  removeSelectGenre,
  addAllGenre,
  clearSelectedGenre,
} = genreSlice.actions;
export default genreSlice.reducer;
