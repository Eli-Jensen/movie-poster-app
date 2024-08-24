'use client';

import React, { useState } from 'react';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchSimilarMovies } from '../actions/fetchSimilarMovies';
import movies from '../../data/titles_and_date_to_TMDB_ID.json';

interface MovieOption {
  label: string;
  id: string;
}

const filter = createFilterOptions<MovieOption>({
  limit: 200, // Limit to 200 options
  stringify: (option) => option.label, // Convert each option to a string for matching
});

const MovieAutocomplete = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieOption | null>(null);


  const handleChange = async (_event: any, newValue: MovieOption | null) => {
    setSelectedMovie(newValue);
    console.log("newValue:", newValue);
    if (newValue) {
      const similarMovies = await fetchSimilarMovies(newValue.id);
      console.log('Similar Movies:', similarMovies);
      // Handle the fetched similar movies as needed
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
