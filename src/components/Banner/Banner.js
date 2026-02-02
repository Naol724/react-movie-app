import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Classes from "./Banner.module.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MovieModal from '../MovieModal/MovieModal';

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        // Get first 5 movies for carousel
        setMovies(request.data.results.slice(0, 5));
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, movies.length]);

  const truncate = (str, n) =>
    str?.length > n ? str.slice(0, n - 1) + "…" : str;

  const handlePlay = () => {
    const currentMovie = movies[currentIndex];
    console.log("Playing:", currentMovie?.title || currentMovie?.name);
    showNotification(`Playing: ${currentMovie?.title || currentMovie?.name}`);
  };

  const handleMyList = () => {
    const currentMovie = movies[currentIndex];
    console.log("Added to My List:", currentMovie?.title || currentMovie?.name);
    showNotification(`Added to My List: ${currentMovie?.title || currentMovie?.name}`);
  };

  const handleMoreInfo = async () => {
    const currentMovie = movies[currentIndex];
    
    try {
      // Fetch additional movie details
      const movieId = currentMovie.id;
      const detailsUrl = currentMovie.title 
        ? `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
        : `https://api.themoviedb.org/3/tv/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`;
      
      const response = await axios.get(detailsUrl);
      const movieWithDetails = { ...currentMovie, ...response.data };
      
      setSelectedMovie(movieWithDetails);
      setIsModalOpen(true);
      showNotification(`More info: ${currentMovie?.title || currentMovie?.name}`);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      // Fallback to basic movie data
      setSelectedMovie(currentMovie);
      setIsModalOpen(true);
      showNotification(`More info: ${currentMovie?.title || currentMovie?.name}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedMovie(null);
    }, 300);
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #e50914;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 10000;
      font-family: 'Lexend', sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? movies.length - 1 : currentIndex - 1);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === movies.length - 1 ? 0 : currentIndex + 1);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  if (movies.length === 0) {
    return (
      <div className={Classes.banner}>
        <div className={Classes.loading}>
          <div className={Classes.loadingSpinner}></div>
          <p>Loading amazing content...</p>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <>
      <div className={Classes.banner_carousel}>
        {/* Carousel Container */}
        <div className={Classes.carousel_container}>
          {movies.map((movie, index) => (
            <div
              key={index}
              className={`${Classes.banner} ${index === currentIndex ? Classes.active : ''}`}
              style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className={Classes.banner__contents}>
                <h1 className={Classes.banner__title}>
                  {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <p className={Classes.banner__description}>
                  {truncate(movie?.overview, window.innerWidth < 768 ? 100 : 150)}
                </p>

                <div className={Classes.banner__buttons}>
                  <button 
                    className={`${Classes.banner__button} ${Classes.play}`}
                    onClick={handlePlay}
                  >
                    <PlayArrowIcon />
                    Play
                  </button>
                  <button 
                    className={Classes.banner__button}
                    onClick={handleMoreInfo}
                  >
                    <InfoOutlinedIcon />
                    More Info
                  </button>
                  <button 
                    className={Classes.banner__button}
                    onClick={handleMyList}
                  >
                    <AddIcon />
                    My List
                  </button>
                </div>
              </div>

              <div className={Classes.banner__fadeBottom} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className={`${Classes.carousel_arrow} ${Classes.prev}`}
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon />
        </button>
        <button 
          className={`${Classes.carousel_arrow} ${Classes.next}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRightIcon />
        </button>

        {/* Dots Indicator */}
        <div className={Classes.carousel_dots}>
          {movies.map((_, index) => (
            <button
              key={index}
              className={`${Classes.dot} ${index === currentIndex ? Classes.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className={Classes.progress_container}>
          <div 
            className={Classes.progress_bar}
            style={{
              animationDuration: isAutoPlaying ? '3s' : 'paused',
              animationPlayState: isAutoPlaying ? 'running' : 'paused'
            }}
          />
        </div>
      </div>

      {/* Movie Modal */}
      <MovieModal 
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Banner;
