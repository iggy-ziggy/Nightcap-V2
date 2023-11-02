// export default function Profile() {
//     return (
//       <div className="about-content">
//         <img
//           className="about-image"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnwAwRQEwRvQYCfXAgvnKUKjQ1KJKlNY2Yw&usqp=CAU"
//           style={{ width: 300, height: 300, borderRadius: 150 }}
//         ></img>
//         <div className="about-text">
//           <p className="about-p1">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias pariatur
//             a ea quis maxime ex eligendi libero, velit amet consequuntur cumque
//             doloremque, autem, tenetur laborum maiores reiciendis? Enim vitae qui
//             aperiam possimus consectetur dolorem, et ut quo odit voluptatum error
//             laborum id. Iste porro sint sequi voluptates hic corporis ut.
//           </p>
//           <p className="about-p2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit in
//             iure eveniet enim libero perferendis incidunt nemo magnam, ipsam atque
//             sequi necessitatibus consectetur omnis adipisci pariatur unde illum
//             ratione porro.
//           </p>
//         </div>
//       </div>
//     );
//   }

import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
import { Navbar } from "../components";
import { styles } from "../styles";

import { QUERY_THOUGHTS } from "../utils/queries";
import User from "../components/User";
// import { QUERY_USER_THOUGHTS } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
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

export default Profile;
