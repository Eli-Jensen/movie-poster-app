'use client';

import React, { useState } from 'react';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchSimilarMovies } from '../actions/fetchSimilarMovies';
import movies from '../../data/titles_and_date_to_TMDB_ID.json';
import useMovieStore from '../store/useMovieStore';

interface MovieOption {
  label: string;
  id: string;
}

const filter = createFilterOptions<MovieOption>({
  limit: 200, // Limit to 200 options
  stringify: (option) => option.label, // Convert each option to a string for matching
});

const MovieAutocomplete: React.FC = () => {
  const setSimilarMovies = useMovieStore((state) => state.setSimilarMovies);

  const handleChange = async (_event: any, newValue: MovieOption | null) => {
    if (newValue) {
      const similarMovies = await fetchSimilarMovies(newValue.id);
      console.log('Fetched Similar Movies:', similarMovies);
      setSimilarMovies(similarMovies); // Update Zustand store
    }
  };

  return (
    <Autocomplete
      options={movies}
      filterOptions={(options, params) => {
        const filtered = filter(options, params); // Apply custom filtering logic
        return filtered;
      }}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Select a movie" />}
    />
  );
};

export default MovieAutocomplete;