import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import { Navbar } from "../components";
import { styles } from "../styles";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import User from "../components/User";
// import Auth from '../utils/auth';
// import img from '/no-image.jpg';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';

// // Initialize firebase for image storage
// const firebaseConfig = {
//   apiKey: 'AIzaSyATd-cXIDX-3YQV-rZU4XTAuu1hYUExl60',
//   authDomain: 'nightcap-24dad.firebaseapp.com',
//   projectId: 'nightcap-24dad',
//   storageBucket: 'nightcap-24dad.appspot.com',
//   messagingSenderId: '490604626131',
//   appId: '1:490604626131:web:61c02ae99f289711fe9426',
// };

// firebase.initializeApp(firebaseConfig);

// const storage = firebase.storage();
// const storageRef = storage.ref();



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
