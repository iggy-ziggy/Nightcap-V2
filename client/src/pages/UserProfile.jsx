import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
import { Navbar } from "../components";
import { styles } from "../styles";
import { useParams } from "react-router-dom";
import { QUERY_THOUGHTS } from "../utils/queries";
import User from "../components/User";
// import { QUERY_USER_THOUGHTS } from "../utils/queries";
const userParams() = {
    const userId = useParams().userId;
};

const UserProfile = (userId) => {
  const { loading, data, userId  } = useQuery(QUERY_THOUGHTS);
  // const { loading, data } = useQuery(QUERY_USER_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main className='relative z-0 bg-primary'>
      <div className='bg-sunset-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <User />
      </div>
      <div id="thought-list" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <h3 className={`${styles.sectionHeadText} py-20`}>Reviews</h3>
        <p className={`${styles.sectionSubText} text-white-100`}>Leave a comment</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Thoughts" />
        )}
      </div>
    </main>
  );
};

export default UserProfile;