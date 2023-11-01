import React, {useState, useRef, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { InputText } from 'primereact/inputtext';
import ThoughtFeed from '../components/ThoughtFeed';
import Auth from '../utils/auth';
import img from '/no-image.jpg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyATd-cXIDX-3YQV-rZU4XTAuu1hYUExl60',
  authDomain: 'nightcap-24dad.firebaseapp.com',
  projectId: 'nightcap-24dad',
  storageBucket: 'nightcap-24dad.appspot.com',
  messagingSenderId: '490604626131',
  appId: '1:490604626131:web:61c02ae99f289711fe9426',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const storageRef = storage.ref();


const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  const [image, setimage] = useState("");
  const [src, setsrc] = useState(false);
  const [profile, setProfile] = useState([]);
  
  const profilePic = profile.map((item) => item.image);

  const saveImage = () => {
    setProfile([...profile, { IMAGE: image }]);
    
    if (image) {
      const imageRef = storageRef.child(`images/${Auth.getProfile().data.username}_profile.jpg`);
      // Upload the image to Firebase Storage.
      imageRef.put(image)
        .then((snapshot) => {
          console.log('Image uploaded to Firebase Storage');
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setsrc(downloadURL);
            // store image in local storage
            localStorage.setItem('profileImage', downloadURL);
          });
        })
        .catch((error) => {
          console.error('Error uploading image to Firebase Storage:', error);
        });
    }
  }

  useEffect(() => {
    // Retrieve the image URL from localStorage
    const storedImageURL = localStorage.getItem('profileImage');
    
    if (storedImageURL) {
      setsrc(storedImageURL);
    }
  }, []);

  return (
    <main>
      <h2>Hey, <span>{Auth.getProfile().data.username}</span>!</h2>
      <div className='profile_img text-center p-4'>
        <div className='flex flex-column justify-content-center align-items-center'>
          <img
            style={{
              width:'200px',
              height:'200px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid blue',
            }}
            // onClick={() => {<InputText/>}}
            src={src || img}
            alt="Profile Picture" 
          />

          <InputText 
            type="file"
            accept="/image/"
            onChange= {(event)=>{
              const file = event.target.files[0];
              if(file && file.type.substring(0,5)==="image"){
                setimage(file);
              } else{
                setimage(null);
              }
            }} />
          <button onClick={saveImage}>Save</button>
        </div>
      </div>
        
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
    </main>
  );
};

export default Home;