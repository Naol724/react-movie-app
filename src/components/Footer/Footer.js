import React, { useState } from 'react';
import Classes from './Footer.module.css';
import FacebookOutlined from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    'English',
    'Español',
    'Français',
    'Deutsch',
    '日本語',
    '한국어',
    '中文',
    'Português',
    'Italiano',
    'हिन्दी'
  ];

  const handleLinkClick = (linkType) => {
    // Add functionality for footer links
    console.log(`Clicked on: ${linkType}`);
    
    const linkActions = {
      'audio-description': () => showNotification('Opening Audio Description settings...'),
      'help-center': () => showNotification('Redirecting to Help Center...'),
      'gift-cards': () => showNotification('Opening Gift Cards page...'),
      'media-center': () => showNotification('Opening Media Center...'),
      'investor-relations': () => showNotification('Opening Investor Relations...'),
      'jobs': () => showNotification('Opening Netflix Careers...'),
      'terms-of-use': () => showNotification('Opening Terms of Use...'),
      'privacy': () => showNotification('Opening Privacy Policy...'),
      'legal-notices': () => showNotification('Opening Legal Notices...'),
      'cookie-preferences': () => showNotification('Opening Cookie Preferences...'),
      'corporate-information': () => showNotification('Opening Corporate Information...'),
      'contact-us': () => showNotification('Opening Contact Us...'),
      'account': () => showNotification('Opening Account settings...'),
      'redeem-gift-cards': () => showNotification('Opening Gift Card redemption...'),
      'buy-gift-cards': () => showNotification('Opening Gift Card purchase...'),
      'ways-to-watch': () => showNotification('Opening Ways to Watch...'),
      'service-code': () => showNotification('Service Code: NF-US-1234567890')
    };

    if (linkActions[linkType]) {
      linkActions[linkType]();
    }
  };

  const handleSocialClick = (platform) => {
    // Add functionality for social media links
    const socialLinks = {
      facebook: 'https://facebook.com/netflix',
      instagram: 'https://instagram.com/netflix',
      youtube: 'https://youtube.com/netflix',
      twitter: 'https://twitter.com/netflix'
    };
    
    if (socialLinks[platform]) {
      showNotification(`Opening Netflix ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`);
      // In a real app, you would open the link
      // window.open(socialLinks[platform], '_blank', 'noopener,noreferrer');
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
    showNotification(`Language changed to ${language}`);
  };

  const handleCallSupport = () => {
    showNotification('Netflix Support: 1-866-579-7172');
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

  return (
    <div className={Classes.footer_outer_container}>
      <div className={Classes.footer_inner_container}>
        {/* Contact Section */}
        <div className={Classes.footer_contact}>
          <p>Questions? Call us</p>
          <div className={Classes.phone_number} onClick={handleCallSupport}>
            <PhoneIcon />
            <span>1-866-579-7172</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className={Classes.footer_icons}>
          <div className="social-icon" onClick={() => handleSocialClick('facebook')}>
            <FacebookOutlined />
          </div>
          <div className="social-icon" onClick={() => handleSocialClick('instagram')}>
            <InstagramIcon />
          </div>
          <div className="social-icon" onClick={() => handleSocialClick('youtube')}>
            <YouTubeIcon />
          </div>
          <div className="social-icon" onClick={() => handleSocialClick('twitter')}>
            <TwitterIcon />
          </div>
        </div>

        {/* Footer Links */}
        <div className={Classes.footer_data}>
          <div>
            <ul>
              <li onClick={() => handleLinkClick('audio-description')}>Audio Description</li>
              <li onClick={() => handleLinkClick('help-center')}>Help Center</li>
              <li onClick={() => handleLinkClick('gift-cards')}>Gift Cards</li>
              <li onClick={() => handleLinkClick('media-center')}>Media Center</li>
            </ul>
          </div>

          <div>
            <ul>
              <li onClick={() => handleLinkClick('investor-relations')}>Investor Relations</li>
              <li onClick={() => handleLinkClick('jobs')}>Jobs</li>
              <li onClick={() => handleLinkClick('terms-of-use')}>Terms of Use</li>
              <li onClick={() => handleLinkClick('privacy')}>Privacy</li>
            </ul>
          </div>

          <div>
            <ul>
              <li onClick={() => handleLinkClick('legal-notices')}>Legal Notices</li>
              <li onClick={() => handleLinkClick('cookie-preferences')}>Cookie Preferences</li>
              <li onClick={() => handleLinkClick('corporate-information')}>Corporate Information</li>
              <li onClick={() => handleLinkClick('contact-us')}>Contact Us</li>
            </ul>
          </div>

          <div>
            <ul>
              <li onClick={() => handleLinkClick('account')}>Account</li>
              <li onClick={() => handleLinkClick('redeem-gift-cards')}>Redeem Gift Cards</li>
              <li onClick={() => handleLinkClick('buy-gift-cards')}>Buy Gift Cards</li>
              <li onClick={() => handleLinkClick('ways-to-watch')}>Ways to Watch</li>
            </ul>
          </div>
        </div>

        {/* Language Selector */}
        <div className={Classes.language_selector}>
          <div 
            className={Classes.language_dropdown}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <LanguageIcon />
            <span>{selectedLanguage}</span>
            <div className={`${Classes.dropdown_arrow} ${showLanguageDropdown ? Classes.open : ''}`}>
              ▼
            </div>
          </div>
          
          {showLanguageDropdown && (
            <div className={Classes.language_options}>
              {languages.map((language) => (
                <div
                  key={language}
                  className={`${Classes.language_option} ${selectedLanguage === language ? Classes.selected : ''}`}
                  onClick={() => handleLanguageChange(language)}
                >
                  {language}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Code */}
        <div className={Classes.service_code} onClick={() => handleLinkClick('service-code')}>
          Service Code
        </div>

        {/* Copyright */}
        <div className={Classes.copyright}>
          © 1997-2024 Netflix, Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
