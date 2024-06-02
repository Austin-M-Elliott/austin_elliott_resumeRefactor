import React from 'react';
import './AboutMe.css';
import uniqid from 'uniqid';
import { aboutme } from '../../portfolio';

const AboutMe = () => {
  if (!aboutme.description) return null;

  return (
    <section className='section about-me' id='about-me'>
      <h2 className='section__title'>ABOUT ME</h2>
      <div className='about-me__content'>
        <img src={aboutme.picture} alt='' className='about-me__image' />
        <div className='about-me__text'>
          <p className='about-me__description'>{aboutme.description}</p>
          {aboutme.hobbies && (
            <ul className='about-me__hobbies'>
              {aboutme.hobbies.map((hobby) => (
                <li key={uniqid()} className='about-me__hobby-item'>
                  {hobby.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
