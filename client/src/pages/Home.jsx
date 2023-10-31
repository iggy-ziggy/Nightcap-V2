import { useQuery } from '@apollo/client';
import ThoughtFeed from '../components/ThoughtFeed';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtFeed
              thoughts={thoughts}
              title="What Others are Drinking:"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
