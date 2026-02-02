import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './Search.css';

const Search = ({ onSearch, placeholder = "Search movies, TV shows..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Mock search data - in real app, this would come from API
  const mockSearchData = [
    { id: 1, title: "Stranger Things", type: "TV Show", year: "2016", image: "/api/placeholder/100/150" },
    { id: 2, title: "The Crown", type: "TV Show", year: "2016", image: "/api/placeholder/100/150" },
    { id: 3, title: "Squid Game", type: "TV Show", year: "2021", image: "/api/placeholder/100/150" },
    { id: 4, title: "Money Heist", type: "TV Show", year: "2017", image: "/api/placeholder/100/150" },
    { id: 5, title: "Bridgerton", type: "TV Show", year: "2020", image: "/api/placeholder/100/150" },
    { id: 6, title: "The Witcher", type: "TV Show", year: "2019", image: "/api/placeholder/100/150" },
    { id: 7, title: "Ozark", type: "TV Show", year: "2017", image: "/api/placeholder/100/150" },
    { id: 8, title: "Dark", type: "TV Show", year: "2017", image: "/api/placeholder/100/150" },
    { id: 9, title: "Narcos", type: "TV Show", year: "2015", image: "/api/placeholder/100/150" },
    { id: 10, title: "House of Cards", type: "TV Show", year: "2013", image: "/api/placeholder/100/150" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Real-time search with debounce
    if (value.length > 2) {
      setIsLoading(true);
      setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (searchTerm.length > 2) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => {
      setIsFocused(false);
      setShowResults(false);
    }, 200);
  };

  const performSearch = (query) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
      setShowResults(true);
      setIsLoading(false);
      onSearch && onSearch(query);
    }, 500);
  };

  const handleResultClick = (result) => {
    setSearchTerm(result.title);
    setShowResults(false);
    onSearch && onSearch(result.title);
    
    // Show notification
    showNotification(`Selected: ${result.title}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
    onSearch && onSearch('');
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
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <form onSubmit={handleSubmit} className={`search-form ${isFocused ? 'focused' : ''}`}>
          <SearchIcon className="search-form-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="search-input"
          />
          {isLoading && <div className="search-loading"></div>}
          {searchTerm && (
            <CloseIcon 
              className="search-clear" 
              onClick={clearSearch}
            />
          )}
        </form>
        
        {/* Search Results Dropdown */}
        {showResults && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              <>
                <div className="search-results-header">
                  <span>Search Results ({searchResults.length})</span>
                </div>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="result-image">
                      <div className="placeholder-image">
                        {result.title.charAt(0)}
                      </div>
                    </div>
                    <div className="result-info">
                      <div className="result-title">{result.title}</div>
                      <div className="result-meta">
                        {result.type} • {result.year}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-results">
                <SearchIcon />
                <span>No results found for "{searchTerm}"</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;