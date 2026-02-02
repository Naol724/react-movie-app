import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './MovieModal.css';

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    console.log('MovieModal - isOpen:', isOpen, 'movie:', movie?.title || movie?.name);
    
    if (isOpen && movie) {
      document.body.style.overflow = 'hidden';
      console.log('Modal opened for movie:', movie);
      fetchTrailer();
    } else {
      document.body.style.overflow = 'unset';
      setTrailerUrl('');
      setShowTrailer(false);
      setError('');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, movie]);

  const fetchTrailer = async () => {
    if (!movie) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Fetching trailer for:', movie?.title || movie?.name || movie?.original_name);
      
      const searchQuery = movie?.title || movie?.name || movie?.original_name;
      
      // Try movie-trailer package first
      let url = null;
      try {
        url = await movieTrailer(searchQuery);
      } catch (trailerError) {
        console.warn('movie-trailer package failed:', trailerError);
        // Fallback: try with year if available
        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
        const queryWithYear = year ? `${searchQuery} ${year}` : searchQuery;
        url = await movieTrailer(queryWithYear);
      }
      
      console.log('Trailer URL found:', url);
      
      if (url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        console.log('Video ID:', videoId);
        
        if (videoId) {
          setTrailerUrl(videoId);
          setError(''); // Clear any previous errors
        } else {
          setError('Invalid trailer URL format');
        }
      } else {
        setError('Trailer not available for this title');
      }
    } catch (err) {
      console.error('Error fetching trailer:', err);
      setError('Failed to load trailer - service may be unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayTrailer = () => {
    console.log('Play trailer clicked. TrailerUrl:', trailerUrl, 'IsLoading:', isLoading);
    
    if (trailerUrl && !isLoading) {
      setShowTrailer(true);
      showNotification('Playing trailer...');
    } else if (isLoading) {
      showNotification('Loading trailer...');
    } else {
      showNotification('Trailer not available for this title');
      // Try to fetch trailer again
      console.log('Retrying trailer fetch...');
      fetchTrailer();
    }
  };

  const handlePlay = () => {
    showNotification(`Playing: ${movie?.title || movie?.name}`);
    // Here you would integrate with your video player
  };

  const handleAddToList = () => {
    setIsInMyList(!isInMyList);
    const action = !isInMyList ? 'Added to' : 'Removed from';
    showNotification(`${action} My List: ${movie?.title || movie?.name}`);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    showNotification(`Rated ${rating} stars`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBackFromTrailer = () => {
    setShowTrailer(false);
    showNotification('Returning to movie details...');
  };

  const handleClose = () => {
    setShowTrailer(false);
    setTimeout(() => {
      onClose();
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
      z-index: 20000;
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

  const getYouTubeOpts = () => {
    const baseOpts = {
      playerVars: {
        autoplay: 1,
        controls: 1,
        rel: 0,
        showinfo: 0,
        mute: isMuted ? 1 : 0,
        fs: 1,
        cc_load_policy: 1,
        iv_load_policy: 3,
        modestbranding: 1,
      },
    };

    if (isFullscreen) {
      return {
        ...baseOpts,
        width: '100%',
        height: '100%',
      };
    }

    const width = window.innerWidth;
    if (width < 768) {
      return {
        ...baseOpts,
        height: '250',
        width: '100%',
      };
    } else if (width < 1024) {
      return {
        ...baseOpts,
        height: '350',
        width: '100%',
      };
    } else {
      return {
        ...baseOpts,
        height: '450',
        width: '100%',
      };
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  if (!isOpen || !movie) {
    console.log('MovieModal not rendering - isOpen:', isOpen, 'movie:', !!movie);
    return null;
  }

  console.log('MovieModal rendering for:', movie.title || movie.name);

  return (
    <div className={`movie-modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className={`movie-modal ${isFullscreen ? 'fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={handleClose}>
          <CloseIcon />
        </button>

        {/* Video Section */}
        <div className="modal-video-section">
          {showTrailer && trailerUrl ? (
            <div className="video-container">
              {/* Back Button for Trailer */}
              <button className="back-btn" onClick={handleBackFromTrailer}>
                <ArrowBackIcon />
                Back to Details
              </button>
              
              <YouTube 
                videoId={trailerUrl} 
                opts={getYouTubeOpts()}
                onEnd={() => setShowTrailer(false)}
                onError={(e) => {
                  console.error('YouTube error:', e);
                  setError('Failed to load trailer');
                  setShowTrailer(false);
                }}
                onReady={(e) => {
                  console.log('YouTube player ready');
                }}
              />
              
              {/* Video Controls */}
              <div className="video-controls">
                <button className="control-btn" onClick={toggleMute}>
                  {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </button>
                <button className="control-btn" onClick={toggleFullscreen}>
                  {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </button>
              </div>
            </div>
          ) : (
            <div 
              className="modal-backdrop"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
              }}
            >
              <div className="backdrop-overlay">
                <div className="modal-content-overlay">
                  <h1 className="modal-title">
                    {movie?.title || movie?.name || movie?.original_name}
                  </h1>
                  
                  <div className="modal-meta">
                    <div className="meta-item">
                      <StarIcon className="meta-icon" />
                      <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div className="meta-item">
                      <CalendarTodayIcon className="meta-icon" />
                      <span>{formatReleaseDate(movie.release_date || movie.first_air_date)}</span>
                    </div>
                    {movie.runtime && (
                      <div className="meta-item">
                        <AccessTimeIcon className="meta-icon" />
                        <span>{formatRuntime(movie.runtime)}</span>
                      </div>
                    )}
                  </div>

                  <div className="modal-actions">
                    <button className="action-btn primary" onClick={handlePlay}>
                      <PlayArrowIcon />
                      Play
                    </button>
                    
                    <button 
                      className="action-btn secondary" 
                      onClick={handlePlayTrailer}
                      disabled={isLoading}
                    >
                      <PlayArrowIcon />
                      {isLoading ? 'Loading...' : 'Trailer'}
                    </button>
                    
                    <button 
                      className={`action-btn secondary ${isInMyList ? 'active' : ''}`}
                      onClick={handleAddToList}
                    >
                      <AddIcon />
                      {isInMyList ? 'In My List' : 'My List'}
                    </button>
                  </div>

                  {/* Debug Info - Remove in production */}
                  {process.env.NODE_ENV === 'development' && (
                    <div style={{ 
                      background: 'rgba(0,0,0,0.5)', 
                      padding: '10px', 
                      margin: '10px 0', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#ccc'
                    }}>
                      <div>Debug Info:</div>
                      <div>Trailer URL: {trailerUrl || 'None'}</div>
                      <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
                      <div>Show Trailer: {showTrailer ? 'Yes' : 'No'}</div>
                      <div>Error: {error || 'None'}</div>
                    </div>
                  )}

                  {isLoading && (
                    <div className="loading-indicator">
                      <div className="spinner"></div>
                      <span>Loading trailer...</span>
                    </div>
                  )}

                  {error && (
                    <div className="error-message">
                      <span>{error}</span>
                      <button 
                        className="retry-btn" 
                        onClick={fetchTrailer}
                        disabled={isLoading}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        {!isFullscreen && (
          <div className="modal-details">
            <div className="details-main">
              <div className="overview-section">
                <h3>Overview</h3>
                <p className="overview-text">
                  {movie.overview || 'No description available.'}
                </p>
              </div>

              {/* User Rating */}
              <div className="rating-section">
                <h4>Rate this title</h4>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star-btn ${userRating >= star ? 'active' : ''}`}
                      onClick={() => handleRating(star)}
                    >
                      <StarIcon />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <button className="quick-action-btn">
                  <ThumbUpIcon />
                </button>
                <button className="quick-action-btn">
                  <ThumbDownIcon />
                </button>
              </div>
            </div>

            <div className="details-sidebar">
              {movie.genres && (
                <div className="detail-item">
                  <strong>Genres:</strong>
                  <div className="genre-tags">
                    {movie.genres.map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.production_companies && movie.production_companies.length > 0 && (
                <div className="detail-item">
                  <strong>Production:</strong>
                  <span>{movie.production_companies[0].name}</span>
                </div>
              )}

              {movie.original_language && (
                <div className="detail-item">
                  <strong>Language:</strong>
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;