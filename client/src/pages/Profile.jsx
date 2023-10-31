// import { useQuery } from "@apollo/client";

// import ThoughtList from "../components/ThoughtList";
// import ThoughtForm from "../components/ThoughtForm";

// // import { QUERY_THOUGHTS } from "../utils/queries";
// // import { QUERY_USER_THOUGHTS } from "../utils/queries";

// const Profile = () => {
//   // const { loading, data } = useQuery(QUERY_THOUGHTS);
//   const { loading, data } = useQuery(QUERY_USER_THOUGHTS);
//   console.log(data);
//   const thoughts = data?.thoughts || [];

//   return (
//     <main>
//       <div className="flex-row justify-center">
//         <div>
//           <img
//             className="profile-image "
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnwAwRQEwRvQYCfXAgvnKUKjQ1KJKlNY2Yw&usqp=CAU"
//             style={{ width: 300, height: 300, borderRadius: 150, margin: 20 }}
//           ></img>
//         </div>
//         <div
//           className="col-12 col-md-10 mb-3 p-3"
//           style={{ border: "1px dotted #1a1a1a" }}
//         >
//           <ThoughtForm />
//         </div>
//         <div className="col-12 col-md-8 mb-3">
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <ThoughtList thoughts={thoughts} title="Reviews" />
//           )}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Profile;
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
