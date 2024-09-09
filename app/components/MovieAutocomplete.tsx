'use client';

import React, { useState, useEffect } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchSimilarMovies } from '../actions/fetchSimilarMovies';
import movies from '../../data/titles_and_date_to_TMDB_ID.json';
import useMovieStore from '../store/useMovieStore';
import useModelStore from '../store/useModelStore';
import { useTheme } from '@mui/material/styles'; // Import MUI theme for breakpoints

interface MovieOption {
  label: string;
  id: string;
}

const filter = createFilterOptions<MovieOption>({
  limit: 200, // Limit to 200 options
  stringify: (option) => option.label, // Convert each option to a string for matching
});

const MovieAutocomplete: React.FC = () => {
  const theme = useTheme(); // Hook to get access to theme and breakpoints

  const { setSimilarMovies, setLoading, loading } = useMovieStore((state) => ({
    setSimilarMovies: state.setSimilarMovies,
    setLoading: state.setLoading,
    loading: state.loading,
  }));

  const selectedModel = useModelStore((state) => state.selectedModel.name); // Get the selected model name

  const [movie, setMovie] = useState<MovieOption | null>(null);

  const handleChange = async (_event: any, newValue: MovieOption | null) => {
    setMovie(newValue);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (movie && selectedModel) {
        setLoading(true); // Set loading to true
        const similarMovies = await fetchSimilarMovies(movie.id, selectedModel);
        setSimilarMovies(similarMovies); // Update Zustand store
        setLoading(false); // Set loading to false
      }
    };

    fetchMovies();
  }, [movie, selectedModel, setSimilarMovies, setLoading]);  // Re-run the effect when movie, selectedModel, or setSimilarMovies changes

  return (
    <Autocomplete
      options={movies}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a movie"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      sx={{
        width: '100vw', // Full width for small screens
        [theme.breakpoints.up('md')]: {
          width: '20vw', // 20vw for medium and larger screens
        },
      }}
    />
  );
};

export default MovieAutocomplete;
