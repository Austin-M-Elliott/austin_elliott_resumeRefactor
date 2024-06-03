import React from 'react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LaunchIcon from '@material-ui/icons/Launch';
import './ProjectContainer.css';

const ProjectContainer = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (project.internalLink) {
      navigate(project.internalLink);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  return (
    <div
      className='project'
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <h3>{project.name}</h3>
      <p className='project__description'>{project.description}</p>
      {project.stack && (
        <ul className='project__stack'>
          {project.stack.map((item) => (
            <li key={item} className='project__stack-item'>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className='project__links'>
        {project.sourceCode && (
          <a
            href={project.sourceCode}
            aria-label='source code'
            className='link link--icon'
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon />
          </a>
        )}
        {project.livePreview && (
          <a
            href={project.livePreview}
            aria-label='live preview'
            className='link link--icon'
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => e.stopPropagation()}
          >
            <LaunchIcon />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
