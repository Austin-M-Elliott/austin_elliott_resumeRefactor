import React, { useState } from 'react'; // Import useState here
import uniqid from 'uniqid';
import { skills } from '../../portfolio';
import './Skills.css';
import Subskill from './Subskill';

const Skills = () => {
  if (!skills.length) return null;

  return (
    <section className='section skills' id='skills'>
      <h2 className='section__title'>TECHNICAL SKILLS</h2>
      <div className='skills-container'> {/* Add a container for better control */}
        <ul className='skills-list'>
          {skills.map((skill) => (
            <Skill key={uniqid()} skill={skill} />
          ))}
        </ul>
      </div>
    </section>
  );
};

const Skill = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false); // useState is used here
  const { name, subSkills } = skill;

  return (
    <li
      className={`skill-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{name}</div>
      <div className="subskills-bubble">
        {subSkills.map((subSkill) => (
          <span key={uniqid()} className="subskill">
            {subSkill}
          </span>
        ))}
      </div>
    </li>
  );
};

export default Skills;
