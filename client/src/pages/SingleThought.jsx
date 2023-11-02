// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Navbar from '../components/Navbar';
import { styles } from '../styles';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';
import { SideNav } from '../components';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='z-0 bg-primary'>
      <Navbar />
      <div className={`${styles.paddingX} bg-primary h-screen relative inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
        <SideNav />
        <div className={`${styles.paddingX} max-w-7xl mx-auto relative z-0`}>
          <div className="mt-12 flex-col flex gap-10 flex-[0.75] bg-black-100 p-8 rounded-2xl w-full">
            <h4 className={styles.heroSubText}>
              {thought.thoughtAuthor} <br />
              <span className={styles.sectionSubText}>
                created this review: {thought.createdAt}
              </span>
            </h4>
            <div className="text-white font-medium mb-4">
              <p>{thought.thoughtText}</p>
            </div>
          </div>
          <div className='w-full flex-col flex flex-[0.75] green-pink-gradient p-[1px] rounded-[20px]'>
            <CommentForm thoughtId={thought._id} />
          </div>
          <div>
            <CommentList comments={thought.comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
