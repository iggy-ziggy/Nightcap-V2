import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import Navbar from '../components/Navbar';
import SideNav from '../components/SideNav';
import { styles } from '../styles';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import Auth from '../utils/auth';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main className='z-0 bg-primary'>
      <Navbar />
      <div className={`${styles.paddingX} relative absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
        <SideNav />
        <div className='flex flex-col justify-center items-center'>
          {/* <SearchBar /> */}
          <ThoughtList thoughts={thoughts} title="Thoughts" />
        </div>
      </div>
    </main>
  );
};

export default Home;
