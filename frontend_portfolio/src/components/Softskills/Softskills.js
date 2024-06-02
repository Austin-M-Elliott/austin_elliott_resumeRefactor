import uniqid from 'uniqid';
import './Softskills.css';
import { softskills } from '../../portfolio';

const Softskills = () => {
  if (!softskills.length) return null;

  return (
    <section className='section softskills' id='softskills'>
      <h2 className='section__title'>PERSONAL SKILLS</h2>
      <ul className='softskills__list'>
        {softskills.map((softskill) => (
          <li key={uniqid()} className='softskills__list-item'>
            {softskill.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Softskills;