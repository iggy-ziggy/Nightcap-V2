import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ProfilePicture from '../components/ProfilePicture';
import ThoughtFeed from '../components/ThoughtFeed';
import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  const user = Auth.getProfile().data;
  console.log(user);

  return (
    
    <main>
      <h2>Hey, <span>{Auth.getProfile().data.username}</span>!</h2>
      <ProfilePicture />
      <div className="flex-row justify-center">
        
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtFeed
              thoughts={thoughts}
              title="See What Others are Drinking:"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
