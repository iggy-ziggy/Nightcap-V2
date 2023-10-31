import { Link } from 'react-router-dom';
import { useAnimate, stagger, motion } from 'framer-motion';

import { styles } from '../../styles';
import { SectionWrapper } from '../../hoc';
import { textVariant, fadeIn } from '../../utils/motion';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div id="thought-list" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <h3 className={`${styles.sectionHeadText} py-20`}>Reviews</h3>
      <p className={`${styles.sectionSubText} text-white-100`}>Leave a comment</p>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="mt-12 flex-col flex gap-10 flex-[0.75] bg-black-100 p-8 rounded-2xl w-full hover:shadow-card">
            <h4 className={styles.heroSubText}>
              {thought.thoughtAuthor} <br />
              <span className={styles.sectionSubText}>
                {thought.createdAt}
              </span>
            </h4>
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
