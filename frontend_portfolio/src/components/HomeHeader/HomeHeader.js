import React from 'react';
import { header } from '../../portfolio'; // Assuming this is required for consistency
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import './HomeHeader.css';

const HomeHeader = () => {
  const { homepage, title } = header; // Assuming you want to maintain the title and homepage link

  return (
    <header className="home-header center">
      <h3>
        {homepage ? (
          <a href={homepage} className='link'>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <HomeNavbar />
    </header>
  );
};

export default HomeHeader;
