import React, {useState, useRef} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import Avatar from 'react-avatar-edit';
import ThoughtFeed from '../components/ThoughtFeed';
import Auth from '../utils/auth';
import img from '/profilePicture.png'


const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
  const [image, setimage] = useState("");
  const [imagecrop, setimagecrop] = useState(false);
  const [src, setsrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pview,setpview] = useState(false);
  
  const profileFinal = profile.map((item) => item.pview);

  const onClose = () => {
    setpview(null);
  }

  const onCrop = (view) => {
    setpview(view);
  }

  const saveCropImage = () => {
    setProfile([...profile, { pview }]);
    setimagecrop(false);
  }

  return (
    <main>
      <h2>Hey, <span>{Auth.getProfile().data.username}</span>!</h2>
      {/* <ProfilePicture /> */}
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
            onClick={() => setimagecrop(true)}
            src={profileFinal.length ? profileFinal : img}
            alt="User profile picture" 
          />

          <Dialog 
            visible={imagecrop} 
            header={() => (
              <p htmlFor="" className="text-2xl font-semibold textColor">
              Update Profile
              </p>
            )}
            onHide={() => setimagecrop(false)}>
              <div className='confirmation-content flex flex-column align-items-center'>
                <Avatar
                  width={500}
                  height={500}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={src}
                  shadingColor={'#474649'}
                  backgroundColor={'#474649'}
                  />
        
              <div className='flex flex-column align-items-center mt-5 w-12'>
                <div className='flex flex-justify-content-around w-12 mt-4'>
                  <Button
                    onClick={saveCropImage}
                    label="save"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </div>
          </Dialog>

          <InputText 
            type="file"
            accept="image/"
            style={{ display: "none"}}
            onChange= {(event)=>{
              const file = event.target.files[0];
              if(file && file.type.substring(0,5)==="image"){
                setimage(file);
              } else{
                setimage(null);
              }
            }} />
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
