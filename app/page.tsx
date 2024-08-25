"use client";

import React from 'react';
import MovieAutocomplete from './components/MovieAutocomplete';
import MovieResults from './components/MovieResults';

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col justify-center'>
        <h1 className='m-4 text-3xl font-bold'>Similar Movie Posters</h1>
        <div className = 'm-4'>
          <MovieAutocomplete />
        </div>
      </div>
      <div className = 'm-2'>
        <MovieResults />
      </div>
      
    </div>
  );
};

export default HomePage;