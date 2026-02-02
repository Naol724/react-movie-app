import React, { useState, useEffect } from 'react'
import NetflixLogo from "../../assets/images/Netflix logo.png"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Search from '../Search/Search';
import UserProfile from '../UserProfile/UserProfile';
import Notifications from '../Notifications/Notifications';
import Classes from './header.module.css'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Debug log to track state changes
    useEffect(() => {
        console.log('Mobile menu state changed:', mobileMenuOpen);
    }, [mobileMenuOpen]);

    // Handle scroll effect for header background
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside to close mobile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the header container
            const headerContainer = document.querySelector(`.${Classes.header_outer_container}`);
            if (mobileMenuOpen && headerContainer && !headerContainer.contains(event.target)) {
                console.log('Clicked outside, closing menu'); // Debug log
                setMobileMenuOpen(false);
            }
        };

        if (mobileMenuOpen) {
            // Add a small delay to prevent immediate closing
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 100);
            
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [mobileMenuOpen]);

    const toggleMobileMenu = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log('Toggle clicked, current state:', mobileMenuOpen); // Debug log
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleNavClick = (section) => {
        console.log('Nav clicked:', section); // Debug log
        // Close mobile menu when item is clicked
        setMobileMenuOpen(false);
        setActiveSection(section);
        
        // Smooth scroll to sections with enhanced functionality
        switch (section) {
            case 'home':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'tvshows':
                scrollToSection('Netflix Originals', 0);
                break;
            case 'movies':
                scrollToSection('Trending Now', 1);
                break;
            case 'latest':
                scrollToSection('Top Rated', 2);
                break;
            case 'mylist':
                // You can implement a My List section or modal
                showNotification('My List feature coming soon!');
                break;
            case 'browse':
                scrollToSection('Action Movies', 3);
                break;
            default:
                window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToSection = (sectionTitle, fallbackIndex = 0) => {
        // Try to find section by title first
        const rows = document.querySelectorAll('.row');
        let targetRow = null;
        
        rows.forEach(row => {
            const title = row.querySelector('h2');
            if (title && title.textContent.includes(sectionTitle)) {
                targetRow = row;
            }
        });
        
        // Fallback to index if title not found
        if (!targetRow && rows[fallbackIndex]) {
            targetRow = rows[fallbackIndex];
        }
        
        if (targetRow) {
            const headerHeight = 80;
            const targetPosition = targetRow.offsetTop - headerHeight;
            window.scrollTo({ 
                top: targetPosition, 
                behavior: 'smooth' 
            });
        }
    };

    const showNotification = (message) => {
        // Simple notification - you can enhance this with a proper notification system
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
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    };

    const handleSearch = (searchTerm) => {
        console.log('Searching for:', searchTerm);
        if (searchTerm.trim()) {
            showNotification(`Searching for: ${searchTerm}`);
            // Here you can implement actual search functionality
            // Filter movies, show search results, etc.
        }
    };

    return (
        <div className={`${Classes.header_outer_container} ${scrolled ? Classes.scrolled : ''}`}>
            <div className={Classes.header_container}>
                <div className={Classes.header_left}>
                    <ul>
                        <li onClick={() => handleNavClick('home')}>
                            <img src={NetflixLogo} alt="Netflix Logo" />
                        </li>
                        <div className={Classes.nav_items}>
                            <li 
                                className={activeSection === 'home' ? Classes.active : ''}
                                onClick={() => handleNavClick('home')}
                            >
                                Home
                            </li>
                            <li 
                                className={activeSection === 'tvshows' ? Classes.active : ''}
                                onClick={() => handleNavClick('tvshows')}
                            >
                                TV Shows
                            </li>
                            <li 
                                className={activeSection === 'movies' ? Classes.active : ''}
                                onClick={() => handleNavClick('movies')}
                            >
                                Movies
                            </li>
                            <li 
                                className={activeSection === 'latest' ? Classes.active : ''}
                                onClick={() => handleNavClick('latest')}
                            >
                                Latest
                            </li>
                            <li 
                                className={activeSection === 'mylist' ? Classes.active : ''}
                                onClick={() => handleNavClick('mylist')}
                            >
                                My List
                            </li>
                            <li 
                                className={activeSection === 'browse' ? Classes.active : ''}
                                onClick={() => handleNavClick('browse')}
                            >
                                Browse
                            </li>
                        </div>
                    </ul>
                    
                    {/* Mobile menu toggle */}
                    <button 
                        className={`${Classes.mobile_menu_toggle} ${mobileMenuOpen ? Classes.menu_open : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
                
                <div className={Classes.header_right}>
                    <ul>
                        <li><Search onSearch={handleSearch} /></li>
                        <li><Notifications /></li>
                        <li><UserProfile /></li>
                    </ul>
                </div>
            </div>
            
            {/* Mobile navigation dropdown */}
            <div className={`${Classes.mobile_nav} ${mobileMenuOpen ? Classes.active : ''}`}>
                <ul>
                    <li onClick={() => handleNavClick('home')}>Home</li>
                    <li onClick={() => handleNavClick('tvshows')}>TV Shows</li>
                    <li onClick={() => handleNavClick('movies')}>Movies</li>
                    <li onClick={() => handleNavClick('latest')}>Latest</li>
                    <li onClick={() => handleNavClick('mylist')}>My List</li>
                    <li onClick={() => handleNavClick('browse')}>Browse by Languages</li>
                </ul>
            </div>
        </div>
    )
}

export default Header
