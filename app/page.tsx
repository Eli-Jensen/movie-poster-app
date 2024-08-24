"use client";

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import top10KFilms from '../data/titles_and_date_to_TMDB_ID.json'

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  limit: 200,
});

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top10KFilms}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Choose a movie" />}
      filterOptions={filterOptions}
    />
  );
}