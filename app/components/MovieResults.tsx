import React from 'react';
import useMovieStore from '../store/useMovieStore';

const MovieResults: React.FC = () => {
  const { similarMovies } = useMovieStore();

  console.log('Similar Movies from Zustand:', similarMovies);

  if (!Array.isArray(similarMovies)) {
    console.error('similarMovies is not an array:', similarMovies);
    return <div>Error loading movies.</div>;
  }

  return (
    <div>
      <h2>Similar Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {similarMovies.map((movie) => (
          <div key={movie.id} 
          style={{
            margin: '10px',
            width: '400px',
            border: '2px solid #ccc', // Add a border
            borderRadius: '12px', // Add rounded corners
            overflow: 'hidden', // Ensure content stays within rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: Add shadow for better visual
          }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '0 0 5px' }}>{movie.title}</h3>
              <p style={{ margin: '0' }}>{movie.release_date}</p>
              <p style={{ margin: '10px 0', fontFamily: 'Inter' }}>{movie.overview}</p>
              <p style={{ margin: '0' }}>Rating: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieResults;
