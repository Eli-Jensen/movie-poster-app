"use client";

import React from 'react';
import MovieAutocomplete from './components/MovieAutocomplete';
import MovieResults from './components/MovieResults';
import ModelSelector from './components/ModelSelector';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="m-4 text-3xl font-bold">Similar Movie Posters</h1>
      <div className="m-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <MovieAutocomplete />
        <div className="mt-4 md:mt-0"> {/* Adds margin-top on small screens */}
          <ModelSelector />
        </div>
      </div>
      <div className="m-2 w-full">
        <MovieResults />
      </div>
    </div>
  );
};

export default HomePage;