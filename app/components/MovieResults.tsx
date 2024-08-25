import React, { useState, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const MovieResults: React.FC = () => {
  const { similarMovies } = useMovieStore();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (similarMovies.length > 0 || hasSearched) {
      setHasSearched(true);
    }
  }, [similarMovies]);

  console.log('Similar Movies from Zustand:', similarMovies);

  if (!Array.isArray(similarMovies)) {
    console.error('similarMovies is not an array:', similarMovies);
    return <div>Error loading movies.</div>;
  }

  return (
    <div>
      {hasSearched && similarMovies.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
          No results for that combination of movie and model.
        </Typography>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              style={{
                margin: '10px',
                width: '400px',
                border: '2px solid #ccc',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%' }}
              />
              <div style={{ padding: '10px' }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      {movie.title} - {movie.release_date.slice(0, 4)}
                      <br />
                      {movie.score.toFixed(3)} Similarity
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph style={{ marginBottom: '10px' }}>
                      {movie.overview}
                    </Typography>
                    <Typography paragraph style={{ marginBottom: '5px' }}>
                      Vote Average: {movie.vote_average}
                    </Typography>
                    <Typography paragraph style={{ marginBottom: '5px' }}>
                      Release Date: {movie.release_date}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieResults;
