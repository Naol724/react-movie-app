import React, { useState, useEffect } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import './UserProfile.css';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  // Sample user data - read-only for demo purposes
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@netflix.com',
    avatar: null,
    plan: 'Premium',
    memberSince: '2019',
    watchTime: '2,847 hours',
    favoriteGenres: ['Action', 'Thriller', 'Drama', 'Comedy', 'Sci-Fi'],
    location: 'New York, USA',
    language: 'English',
    profilesCount: 4,
    downloadsCount: 12,
    watchlistCount: 47,
    recentActivity: [
      { title: 'Stranger Things', episode: 'S4 E9', progress: 85, type: 'series' },
      { title: 'The Adam Project', episode: 'Full Movie', progress: 100, type: 'movie' },
      { title: 'Ozark', episode: 'S4 E7', progress: 45, type: 'series' },
      { title: 'Red Notice', episode: 'Full Movie', progress: 78, type: 'movie' },
      { title: 'Squid Game', episode: 'S1 E6', progress: 100, type: 'series' }
    ]
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (action) => {
    setIsOpen(false);
    
    switch (action) {
      case 'profile':
        showNotification('Profile Management - Sample Feature (Coming Soon!)');
        break;
      case 'account':
        showNotification('Account Settings - Sample Feature (Coming Soon!)');
        break;
      case 'help':
        showNotification('Help Center - Sample Feature (Coming Soon!)');
        break;
      case 'signout':
        handleSignOut();
        break;
      case 'mylist':
        showNotification('My List - Sample Feature (Coming Soon!)');
        break;
      case 'history':
        showNotification('Watch History - Sample Feature (Coming Soon!)');
        break;
      case 'downloads':
        showNotification('Downloads - Sample Feature (Coming Soon!)');
        break;
      case 'billing':
        showNotification('Billing Information - Sample Feature (Coming Soon!)');
        break;
      case 'privacy':
        showNotification('Privacy Settings - Sample Feature (Coming Soon!)');
        break;
      case 'notifications':
        showNotification('Notification Settings - Sample Feature (Coming Soon!)');
        break;
      case 'language':
        showNotification('Language Settings - Sample Feature (Coming Soon!)');
        break;
      default:
        showNotification(`${action} - Sample Feature (Coming Soon!)`);
    }
  };

  const handleSignOut = () => {
    showNotification('Signing out...');
    setTimeout(() => {
      showNotification('You have been signed out successfully');
    }, 1500);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showNotification(`Switched to ${!darkMode ? 'Dark' : 'Light'} mode`);
  };

  const showNotification = (message) => {
    try {
      // Remove any existing notifications first
      const existingNotifications = document.querySelectorAll('.profile-notification');
      existingNotifications.forEach(notification => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      });

      const notification = document.createElement('div');
      notification.className = 'profile-notification';
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
        if (document.body.contains(notification)) {
          notification.style.animation = 'slideOutRight 0.3s ease';
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
        }
      }, 3000);
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile-container')) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <div className="user-profile-container">
      <div className="user-profile-trigger" onClick={toggleDropdown}>
        <div className="user-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="User Avatar" />
          ) : (
            <AccountBoxIcon />
          )}
        </div>
        <ArrowDropDownIcon className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
      </div>

      {isOpen && (
        <div className="user-profile-dropdown">
          <div className="dropdown-header">
            <div className="user-info">
              <div className="user-avatar-large">
                {user.avatar ? (
                  <img src={user.avatar} alt="User Avatar" />
                ) : (
                  <PersonIcon />
                )}
              </div>
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-plan">
                  <StarIcon className="plan-icon" />
                  {user.plan} Plan
                </div>
                <div className="user-stats">
                  Member since {user.memberSince} • {user.watchTime} watched
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown-menu">
            <div className="menu-section">
              <div className="section-title">Profile & Preferences</div>
              <div className="menu-item" onClick={() => handleMenuClick('profile')}>
                <EditIcon />
                <span>Manage Profiles</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('mylist')}>
                <FavoriteIcon />
                <span>My List ({user.watchlistCount})</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('history')}>
                <HistoryIcon />
                <span>Watch History</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('downloads')}>
                <DownloadIcon />
                <span>Downloads ({user.downloadsCount})</span>
              </div>
            </div>

            <div className="menu-separator"></div>

            <div className="menu-section">
              <div className="section-title">Account & Settings</div>
              <div className="menu-item" onClick={() => handleMenuClick('account')}>
                <SettingsIcon />
                <span>Account Settings</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('billing')}>
                <PaymentIcon />
                <span>Billing & Payments</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('privacy')}>
                <SecurityIcon />
                <span>Privacy & Security</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('notifications')}>
                <NotificationsIcon />
                <span>Notifications</span>
              </div>
              <div className="menu-item" onClick={() => handleMenuClick('language')}>
                <LanguageIcon />
                <span>Language & Region</span>
              </div>
            </div>

            <div className="menu-separator"></div>

            <div className="menu-section">
              <div className="section-title">Appearance</div>
              <div className="menu-item theme-toggle" onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                <div className={`toggle-switch ${darkMode ? 'dark' : 'light'}`}>
                  <div className="toggle-slider"></div>
                </div>
              </div>
            </div>

            <div className="menu-separator"></div>

            <div className="menu-section">
              <div className="menu-item" onClick={() => handleMenuClick('help')}>
                <HelpIcon />
                <span>Help Center</span>
              </div>
              <div className="menu-item signout" onClick={() => handleMenuClick('signout')}>
                <ExitToAppIcon />
                <span>Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;