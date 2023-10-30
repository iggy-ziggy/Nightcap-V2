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

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";
// import { QUERY_USER_THOUGHTS } from "../utils/queries";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const { loading, data } = useQuery(QUERY_USER_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div>
          <img
            className="profile-image "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnwAwRQEwRvQYCfXAgvnKUKjQ1KJKlNY2Yw&usqp=CAU"
            style={{ width: 300, height: 300, borderRadius: 150, margin: 20 }}
          ></img>
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Thoughts" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
