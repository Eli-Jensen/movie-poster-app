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
          <div key={movie.id} style={{ margin: '10px', width: '400px' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieResults;
