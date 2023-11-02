import { Link } from 'react-router-dom';
import { useAnimate, stagger, motion } from 'framer-motion';
import { QUERY_THOUGHTS } from '../../utils/queries';
import { styles } from '../../styles';
import { SectionWrapper } from '../../hoc';
import { textVariant, fadeIn } from '../../utils/motion';

const ThoughtList = ({ thoughts }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="mt-12 flex-col flex gap-10 flex-[0.75] bg-black-100 p-8 rounded-2xl w-full hover:shadow-card">
            
            <h4 className={styles.heroSubText}>
              {thought.thoughtTitle} at {thought.thoughtPlace}
            </h4>

            <h5 className={styles.heroSubText}>
              {thought.thoughtAuthor} 
              <span className={styles.sectionSubText}>
                {' ' + 'on' + ' ' + thought.createdAt}
              </span>
            </h5>
            <img 
              className="drink-image" 
              src={thought.thoughtImage} 
              style= {{width:'50%', height:'auto', margin: '0 auto'}}
              alt="Drink Photo"
            />
            <div className="text-white font-medium mb-4">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className='bg-tertiary py-3 px-8 outline-none w-fit text-secondary font-bold shadow-md shadow-primary rounded-xl hover:text-white'
              to={`/thoughts/${thought._id}`}
            >
              Comment
            </Link>
          </div>
        ))}
    </div>
  );
}


export default ThoughtList;
