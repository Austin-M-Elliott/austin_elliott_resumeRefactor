import React, { useEffect, useState } from 'react';
import compassImage from '../../assets/images/CompassRose.svg'; // Ensure this path is correct
import arrowImage from '../../assets/images/CompassArrow.svg'; // Ensure this path is correct
import './Compass.css';

const Compass = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      const rotationDegree = scrollPercentage * 360; // 0 degrees at top, 360 degrees at bottom
      setRotation(rotationDegree);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the position of the arrow
  const radius = 60; // Radius of the path
  const x = 50 + radius * Math.cos((rotation - 90) * (Math.PI / 180)); // Adjusted for -90 degrees to start at the top
  const y = 50 + radius * Math.sin((rotation - 90) * (Math.PI / 180));

  return (
    <div className="compass">
      <img src={compassImage} alt="Compass" className="compass-image" />
      <img 
        src={arrowImage} 
        alt="Arrow" 
        className="compass-arrow" 
        style={{ left: `${x}%`, top: `${y}%` }}
      />
    </div>
  );
};

export default Compass;
