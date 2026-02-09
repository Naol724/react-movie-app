import React from 'react';
import Classes from'./Footer.module.css';

import FacebookOutlined from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <div className={Classes.footer_outer_container}>
      <div className={Classes.footer_inner_container}>

        {/* Social Icons */}
        <div className={Classes.footer_icons}>
          <FacebookOutlined />
          <InstagramIcon />
          <YouTubeIcon />
        </div>

        {/* Footer Links */}
        <div className={Classes.footer_data}>
          <div>
            <ul>
              <li>Audio Description</li>
              <li>Investor Relations</li>
              <li>Legal Notice</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>Help Center</li>
              <li>Jobs</li>
              <li>Cookie Preferences</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>Gift Card</li>
              <li>Terms of Use</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          <div>
            <ul>
              <li>Media Center</li>
              <li>Privacy</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        {/* Service Code */}
        <div className={Classes.service_code}>
          <p>Service Code</p>
        </div>

        {/* Copyright */}
        <div className={Classes.copy_write}>
          &copy; 1997–2024 Netflix, Inc.
        </div>

      </div>
    </div>
  );
};

export default Footer;
