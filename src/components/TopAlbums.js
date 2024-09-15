import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import './TopAlbums.css';
import './SkeletonStyle.css';

// state variables
const TopAlbums = () => {
  // to map the movies fetched
  const [movies, setMovies] = useState([]);
  // to identify the selected movie
  const [selectedMovie, setSelectedMovie] = useState(null);
  // to determine what to display while loading
  const [loading, setLoading] = useState(true);
  // to handle error while fetching movie
  const [error, setError] = useState(null);
  // to handle the cast information
  const [casts, setCasts] = useState([]);

  // Fetch the top-rated movies from the API
   useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          // requesting api endpoint
          `https://api.themoviedb.org/3/trending/movie/week?api_key=5402896e20816fefb9125982df1440db`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch top-rated movies');
        }
        const data = await response.json();
        setMovies(data.results.slice(0, 12)); // Limit to 12 top-rated movies
      } catch (error) {
        console.error('Error occurred while fetching top-rated movies:', error);
        setError(error);
      } finally {
        // * Add a timeout of 2000 milliseconds (8 seconds) before setting loading to false
        setTimeout(() => setLoading(false), 8000);
      }
      // ! This will enable requests to be rendered and stop the loading animation once completed
    // } finally {
    //   setLoading(false);
    // }
    };

    fetchTopRatedMovies();
  }, []);

  // Fetch the cast information for a specific movie
  const fetchMovieCasts = async (movieId) => {
    try {
      const response = await fetch(
        // end point for fetching movie credits
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5402896e20816fefb9125982df1440db`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
      }
      const data = await response.json();
      setCasts(data.cast.slice(0, 10)); // Limit to 10 cast members
    } catch (error) {
      console.error('Error occurred while fetching movie credits:', error);
      setError(error);
    }
  };

  // Handle click on a movie card
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    fetchMovieCasts(movie.id);
  };

  // Handle closing the movie details modal
  const handleCloseModal = () => {
    setSelectedMovie(null);
    setCasts([]);
  };

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 2 }} transition={{ duration: 1 }}>
      <div>
        {/* Render the heading */}
        <h2 id="popular">Top Rated Movies</h2>

        {/* Render the movie cards */}
        <div className="row">
          {/* Use skeleton styles for loading items */}
          {loading ? (
            Array.from({ length: 12 }, (_, index) => (
              <div key={index} className="col-md-2 col-6 mb-4 skeleton-item">
                {/* 6 items on desktop, 2 on mobile, and 3 on medium */}
                <div className="movie-card fullBox watchLogo">
                  {/* Render skeleton image */}
                  <div className="skeleton-image"></div>
                  
                  {/* Render skeleton text */}
                  <div className="skeleton-text"></div>
                </div>
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="col-md-2 col-6 mb-4">
                {/* 6 items on desktop, 2 on mobile, and 3 on medium */}
                <div className="movie-card fullBox watchLogo" onClick={() => handleMovieClick(movie)}>
                  {/* Render the movie image */}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-images ratedBox"
                  />
                  
                  {/* Render the movie title */}
                  <h3 className="movie-title slideText">{movie.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Render the movie details modal */}
        <Modal show={selectedMovie !== null} onHide={handleCloseModal} size="lg">
          <Modal.Body>
            {selectedMovie && (
              <>
                <div className="movie-details">
                  {/* Selected Movie Thumbnail */}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    className="movie-thumbnail"
                  />
                  <div className="movie-info">
                    {/* Movie Details: Title, Overview, and Cast */}
                    <h2>{selectedMovie.title}</h2>
                    <p><b>Overview:</b> {selectedMovie.overview}</p>
                    <p>
                      <b>Cast:</b> {casts.map((cast) => cast.name).join(', ')}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* Close Modal */}
            <button onClick={handleCloseModal} className="btn btn-secondary">
              Close
            </button>
          </Modal.Footer>
        </Modal>

        {/* Render error message if there's an error */}
        {error && <p>Error fetching data: {error.message}</p>}
      </div>
    </motion.div>
  );
};

export default TopAlbums;
