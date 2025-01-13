import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../../types/movie';
import { movieApi } from '../../services/movieApi';

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  selectedMovie: Movie | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  selectedMovie: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await movieApi.getMovies();
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer; 