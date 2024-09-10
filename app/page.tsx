"use client";

import React from 'react';
import MovieAutocomplete from './components/MovieAutocomplete';
import MovieResults from './components/MovieResults';
import ModelSelector from './components/ModelSelector';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center"> {/* Padding at the top */}
      <h1 className="m-4 text-2xl font-bold">Similar Movie Posters</h1>

      {/* Flexbox container for ModelSelector and MovieAutocomplete */}
      <div className="flex flex-col items-center w-full">
        {/* ModelSelector (always on top and centered) */}
        <div className="w-full md:w-auto mb-4 flex justify-center">
          <ModelSelector />
        </div>

        {/* MovieAutocomplete (always below ModelSelector and centered) */}
        <div className="w-full md:w-[60vw] lg:w-[50vw] xl:w-[40vw] flex justify-center"> 
          <MovieAutocomplete />
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
