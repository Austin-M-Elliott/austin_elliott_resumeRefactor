import uniqid from 'uniqid'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'

const projects = [
  {
    id: uniqid(),
    name: 'Aces Up',
    description: 'Card Game Simulation.',
    internalLink: '/acesUp',
    stack: ['Python', 'React', 'FastAPI', 'Chart.js'],
    sourceCode: 'https://github.com/Austin-M-Elliott/timezone-frontend',
    livePreview: '',
  },
  
]

const Projects = () => {
  if (!projects.length) return null

  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>

      <div className='projects__grid'>
        {projects.map((project) => (
          <ProjectContainer key={uniqid()} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
