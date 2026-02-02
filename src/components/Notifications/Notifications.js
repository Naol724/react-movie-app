import React, { useState, useEffect } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import './Notifications.css';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_release',
      title: 'New Episode Available',
      message: 'Stranger Things Season 5 Episode 1 is now available',
      time: '2 hours ago',
      read: false,
      icon: 'new_release'
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Recommended for You',
      message: 'Based on your viewing history, you might like "Dark"',
      time: '1 day ago',
      read: false,
      icon: 'trending'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Continue Watching',
      message: 'You left off at Episode 3 of "The Crown"',
      time: '2 days ago',
      read: true,
      icon: 'play'
    },
    {
      id: 4,
      type: 'wishlist',
      title: 'From Your List',
      message: 'Money Heist: Korea is now available to watch',
      time: '3 days ago',
      read: true,
      icon: 'favorite'
    },
    {
      id: 5,
      type: 'new_release',
      title: 'New Movie Added',
      message: 'Red Notice 2 has been added to Netflix',
      time: '1 week ago',
      read: true,
      icon: 'new_release'
    }
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setHasUnread(false);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    showActionNotification(`Opening: ${notification.title}`);
  };

  const showActionNotification = (message) => {
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

  const getNotificationIcon = (iconType) => {
    switch (iconType) {
      case 'play':
        return <PlayArrowIcon />;
      case 'favorite':
        return <FavoriteIcon />;
      case 'trending':
        return <TrendingUpIcon />;
      case 'new_release':
      default:
        return <NewReleasesIcon />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notifications-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update hasUnread based on notifications
  useEffect(() => {
    setHasUnread(unreadCount > 0);
  }, [unreadCount]);

  return (
    <div className="notifications-container">
      <div className="notifications-trigger" onClick={toggleDropdown}>
        {hasUnread ? (
          <NotificationsIcon className="notifications-icon active" />
        ) : (
          <NotificationsNoneIcon className="notifications-icon" />
        )}
        {unreadCount > 0 && (
          <div className="notification-badge">{unreadCount}</div>
        )}
      </div>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>

          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.icon)}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <NotificationsNoneIcon />
                <span>No notifications</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;