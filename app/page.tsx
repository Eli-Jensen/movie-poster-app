"use client";

import React from 'react';
import MovieAutocomplete from './components/MovieAutocomplete';
import MovieResults from './components/MovieResults';
import ModelSelector from './components/ModelSelector';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center pt-8"> {/* Padding at the top */}
      <h1 className="m-4 text-3xl font-bold">Similar Movie Posters</h1>
      
      {/* Flexbox container for MovieAutocomplete and ModelSelector */}
      <div className="flex flex-col md:flex-row md:justify-center items-center w-full">
        {/* MovieAutocomplete */}
        <div className="w-full md:w-[40vw] lg:w-[30vw] flex justify-center"> 
          <MovieAutocomplete />
        </div>

        {/* ModelSelector */}
        <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
          <ModelSelector />
        </div>
      </div>

      {/* MovieResults */}
      <div className="m-2 w-full">
        <MovieResults />
      </div>
    </div>
  );
};

export default HomePage;
