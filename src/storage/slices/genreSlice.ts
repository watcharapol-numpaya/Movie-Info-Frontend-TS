import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GenreState {
  selectedGenres: number[]; // Assuming genre IDs are of type number
}

const initialState: GenreState = {
  selectedGenres: [],
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    addSelectGenre: (state, action: PayloadAction<number>) => {
      const genreId = action.payload;
      state.selectedGenres.push(genreId);
    },
    removeSelectGenre: (state, action: PayloadAction<number>) => {
      const genreId = action.payload;
      state.selectedGenres = state.selectedGenres.filter(
        (id) => id !== genreId
      );
    },
    addAllGenre: (state, action: PayloadAction<number[]>) => {
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
