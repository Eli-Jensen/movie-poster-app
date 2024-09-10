import React, { useState, useEffect } from 'react';
import useMovieStore from '../store/useMovieStore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const MovieResults: React.FC = () => {
  const { similarMovies, loading } = useMovieStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [oldContent, setOldContent] = useState(similarMovies); // Keep the old content visible until new content is ready

  useEffect(() => {
    if (similarMovies.length > 0 || hasSearched) {
      setHasSearched(true);
    }

    if (!loading) {
      setOldContent(similarMovies); // Once new content is ready, instantly replace the old content
    }
  }, [similarMovies, loading]);

  if (!Array.isArray(similarMovies)) {
    console.error('similarMovies is not an array:', similarMovies);
    return <div>Error loading movies.</div>;
  }

  // Render 10 skeletons that match the size and layout of the loaded content
  const renderSkeletons = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
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
          <Box sx={{ padding: '10px' }}>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginTop: '10px' }} />
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
          }}
        >
          {renderSkeletons()}
        </div>
      ) : (
        <>
          {hasSearched && oldContent.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
              No results for that combination of movie and model.
            </Typography>
          ) : (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px', // Add spacing between items
              }}
            >
              {/* New content (immediately replaces the old content once ready) */}
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
