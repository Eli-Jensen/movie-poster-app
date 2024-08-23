import React from 'react';
import AutocompleteComponent from '../components/AutocompleteComponent';
import movies from '../data/movies.json';

interface PageProps {
  options: string[];
}

// Define the page component as async to fetch data
const Page = async () => {
  // Fetch data from the public directory

  return (
    <div style={{ padding: 20 }}>
      <AutocompleteComponent options={movies} />
    </div>
  );
};

export default Page;
