import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Subskill.css';

const Subskill = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, subSkills } = skill;

  return (
    <li
      className={`skill-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{name}</div>
      {isHovered && subSkills && (
        <div className="subskills-bubble">
          {subSkills.map((subSkill) => (
            <span key={uuidv4()} className="subskill">
              {subSkill}
            </span>
          ))}
        </div>
      )}
    </li>
  );
};

export default Subskill;
