import React, { useRef } from 'react';
import useMovieStore from '../store/useMovieStore';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


const MovieResults: React.FC = () => {
  const { similarMovies } = useMovieStore();

  console.log('Similar Movies from Zustand:', similarMovies);

  if (!Array.isArray(similarMovies)) {
    console.error('similarMovies is not an array:', similarMovies);
    return <div>Error loading movies.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
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
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>{movie.title} - {movie.release_date.slice(0, 4)}{<br></br>} {movie.score.toFixed(3)} Similarity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography paragraph style={{marginBottom: '10px'}}>
                      {movie.overview}
                    </Typography>
                    <Typography paragraph style={{marginBottom: '5px'}}>
                      Vote Average: {movie.vote_average}
                    </Typography>
                    <Typography paragraph style={{marginBottom: '5px'}}>
                      Release Date: {movie.release_date}
                    </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieResults;
