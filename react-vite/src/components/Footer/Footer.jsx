import React from 'react';
import footerStyles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <p>&copy; {new Date().getFullYear()} Guide Finder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;