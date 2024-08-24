"use client";

import React from 'react';
import MovieAutocomplete from './components/MovieAutocomplete';
import MovieResults from './components/MovieResults';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Movie Finder</h1>
      <MovieAutocomplete />
      <MovieResults />
    </div>
  );
};

export default HomePage;