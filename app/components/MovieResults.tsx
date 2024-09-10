import React, { useState, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const MovieResults: React.FC = () => {
  const { similarMovies, loading } = useMovieStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (similarMovies.length > 0 || hasSearched) {
      setHasSearched(true);
    }

    if (loading) {
      setFadeOut(true); // Start fading out the old content
    } else {
      setFadeOut(false); // Fade in new content once loading is complete
    }
  }, [similarMovies, loading]);

  if (!Array.isArray(similarMovies)) {
    console.error('similarMovies is not an array:', similarMovies);
    return <div>Error loading movies.</div>;
  }

  // Render 10 skeletons that match the size of the loaded content
  const renderSkeletons = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        padding: 2,
      }}
    >
      {Array.from(new Array(10)).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: '400px',
            border: '2px solid #ccc',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Skeleton variant="rectangular" width="100%" height={600} />
          <Box sx={{ padding: 2 }}>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginTop: 2 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            opacity: fadeOut ? 0.5 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          {renderSkeletons()}
        </div>
      ) : (
        <>
          {hasSearched && similarMovies.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
              No results for that combination of movie and model.
            </Typography>
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                opacity: fadeOut ? 0 : 1, // Fade in the new content
                transition: 'opacity 0.5s ease-in-out', // Smooth transition
              }}
            >
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
                    style={{ width: '100%', height: '600px', objectFit: 'cover' }} // Match the skeleton height
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
        </>
      )}
    </div>
  );
};

export default MovieResults;