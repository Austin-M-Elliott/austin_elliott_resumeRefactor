import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className='footer'>
      <div className='clock'>
        <p>{currentTime}</p>
      </div>
    </footer>
  );
}

export default Footer;
