import { useEffect, useState } from 'react';
import "./Row.css";
import axios from "../../../utils/axios";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import StopIcon from '@mui/icons-material/Stop';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching movies:", error);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    console.log("Movie clicked:", movie?.title || movie?.name); // Debug log
    
    if (trailerUrl) {
      setTrailerUrl("");
      setCurrentMovie(null);
      return;
    }

    // Set current movie immediately for faster UI response
    setCurrentMovie(movie);
    
    try {
      // Show loading state immediately
      const loadingNotification = showLoadingNotification("Loading trailer...");
      
      // Use Promise.race to timeout after 5 seconds
      const trailerPromise = movieTrailer(movie?.title || movie?.name || movie?.original_name);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );
      
      const url = await Promise.race([trailerPromise, timeoutPromise]);
      
      // Remove loading notification
      removeNotification(loadingNotification);
      
      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        if (videoId) {
          setTrailerUrl(videoId);
          console.log("Trailer found:", videoId);
        } else {
          throw new Error("No video ID found");
        }
      } else {
        throw new Error("No trailer URL found");
      }
    } catch (error) {
      console.log("Trailer not found or timeout:", error);
      // Show fallback content immediately
      setTrailerUrl("dQw4w9WgXcQ"); // Rick Roll as fallback - you can change this
      showNotification("Trailer not available, showing sample video");
    }
  };

  const handleStopTrailer = () => {
    setTrailerUrl("");
    setCurrentMovie(null);
  };

  const showLoadingNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'loading-notification';
    notification.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px 30px;
      border-radius: 8px;
      z-index: 10000;
      font-family: 'Lexend', sans-serif;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      gap: 15px;
    `;
    
    // Add loading spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid #333;
      border-top: 2px solid #e50914;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    notification.appendChild(spinner);
    document.body.appendChild(notification);
    return notification;
  };

  const removeNotification = (notification) => {
    if (notification && document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
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
      if (document.body.contains(notification)) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 3000);
  };

  // Optimized YouTube player options for faster loading
  const getYouTubeOpts = () => {
    const width = window.innerWidth;
    const baseOpts = {
      playerVars: { 
        autoplay: 1,
        controls: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        fs: 1,
        cc_load_policy: 0,
        start: 0,
        end: 0
      },
    };

    if (width < 768) {
      return {
        ...baseOpts,
        height: '200',
        width: '100%',
      };
    } else if (width < 1024) {
      return {
        ...baseOpts,
        height: '300',
        width: '100%',
      };
    } else {
      return {
        ...baseOpts,
        height: '390',
        width: '100%',
      };
    }
  };

  if (loading) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="loading">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie, index) => (
          <div key={index} className="poster-container" onClick={() => handleClick(movie)}>
            <img
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name || movie.title || 'Movie poster'}
              className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* Description overlay */}
            <div className="poster-overlay">
              <div className="overlay-content">
                <h4 className="movie-title">
                  {movie.title || movie.name}
                </h4>
                <div className="movie-meta">
                  <span className="rating">
                    ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                  <span className="year">
                    {new Date(movie.release_date || movie.first_air_date).getFullYear() || 'N/A'}
                  </span>
                </div>
                <p className="movie-description">
                  {movie.overview ? movie.overview.slice(0, 100) + '...' : 'No description available.'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {trailerUrl && currentMovie && (
        <div className="trailer-section">
          <div className="trailer-header">
            <h3 className="trailer-title">
              Now Playing: {currentMovie.title || currentMovie.name}
            </h3>
            <button className="stop-btn" onClick={handleStopTrailer}>
              <StopIcon />
              Stop Trailer
            </button>
          </div>
          
          <div className="trailer-player" style={{ padding: window.innerWidth < 768 ? "20px" : "40px" }}>
            <YouTube videoId={trailerUrl} opts={getYouTubeOpts()} />
          </div>
          
          <div className="trailer-description">
            <div className="movie-info">
              <div className="movie-details">
                <h4 className="movie-title-full">
                  {currentMovie.title || currentMovie.name}
                </h4>
                <div className="movie-meta-full">
                  <span className="rating-full">
                    ⭐ {currentMovie.vote_average?.toFixed(1) || 'N/A'}
                  </span>
                  <span className="year-full">
                    {new Date(currentMovie.release_date || currentMovie.first_air_date).getFullYear() || 'N/A'}
                  </span>
                  <span className="type-full">
                    {currentMovie.title ? 'Movie' : 'TV Series'}
                  </span>
                </div>
                <p className="movie-overview">
                  {currentMovie.overview || 'No description available for this title.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;