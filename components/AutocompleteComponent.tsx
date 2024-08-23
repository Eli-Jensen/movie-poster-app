'use client';

import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

// Define the props interface
interface AutocompleteComponentProps {
  options: string[];
}

// Define the component as a function
const AutocompleteComponent = ({ options }: AutocompleteComponentProps) => {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label="Choose a movie" variant="outlined" />}
      style={{ width: 300 }}
    />
  );
};

export default AutocompleteComponent;